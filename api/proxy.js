export default async function handler(req, res) {
  // CORS設定（GitHub Pagesから呼べるようにする）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // あなたのGASのexec URL（そのまま貼る）
  const GAS_URL = "https://script.google.com/macros/s/AKfycby9b-uIzlMtxz8bWaotOf5GFS1XU0elV5VduveGVpmXdc0WF3CUqbg1vzHX2RPgFJBV2Q/exec";

  try {
    const body = req.body;
    const lineUserId = body.line_user_id;

    if (!lineUserId) {
      return res.status(400).json({ ok: false, error: "line_user_id missing" });
    }

    // GASへフォーム形式で送信（安定）
    const form = new URLSearchParams({
      line_user_id: lineUserId
    });

    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form.toString()
    });

    const text = await gasRes.text();

    return res.status(200).send(text);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
}
