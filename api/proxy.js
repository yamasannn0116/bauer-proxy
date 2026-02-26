export default async function handler(req, res) {
  console.log("HIT /api/proxy");

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const gasUrl = process.env.GAS_URL;
  console.log("GAS_URL:", gasUrl);

  try {
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("GAS RESPONSE:", text);

  } catch (err) {
    console.error("GAS Forward Error:", err);
  }

  return res.status(200).send("OK");
}
