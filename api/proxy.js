export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const gasUrl = process.env.GAS_URL;

  if (!gasUrl) {
    console.error("GAS_URL not set");
    return res.status(200).send("OK");
  }

  // ★ 即200返す（最重要）
  res.status(200).send("OK");

  // ★ 非同期でGASへ転送（awaitしない）
  fetch(gasUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  }).catch(err => {
    console.error("GAS Forward Error:", err);
  });
}
