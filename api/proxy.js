export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycby9b-uIzlMtxz8bWaotOf5GFS1XU0elV5VduveGVpmXdc0WF3CUqbg1vzHX2RPgFJBV2Q/exec";

  try {

    const body = req.body;
    console.log("BODY:", body);

    // 🔥 LIFFから直接送られてくる値
    const userId = body?.line_user_id;

    if (!userId) {
      return res.status(400).send("no userId");
    }

    const form = new URLSearchParams({
      line_user_id: userId
    });

    const gasResponse = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form.toString()
    });

    const text = await gasResponse.text();
    console.log("GAS:", text);

    return res.status(200).send(text);

  } catch (error) {
    console.error(error);
    return res.status(500).send("ERROR");
  }
}
