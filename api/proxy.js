export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const gasUrl = process.env.GAS_URL;

    if (!gasUrl) {
      return res.status(500).send("GAS_URL not set");
    }

    // ★ ここを追加（デバッグ用ログ）
    console.log("FULL BODY:", JSON.stringify(req.body, null, 2));

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    return res.status(200).send(text);

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(400).send("Proxy Error");
  }
}
