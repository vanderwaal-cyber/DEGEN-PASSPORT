export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { stats } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 120,
        messages: [{
          role: "user",
          content: `You are a savage but funny crypto roast bot. Roast this wallet in ONE punchy sentence (15-25 words max). Be brutally honest, crypto-native, and hilarious. No hashtags, no emojis, no quotes. Just the roast.

Wallet stats:
- Transactions: ${stats.txCount}
- Portfolio value: $${Math.round(stats.totalValue).toLocaleString()}
- Chains visited: ${stats.chainsVisited.join(", ") || "none"}
- Rank: ${stats.rank}
- Biggest W: $${Math.round(stats.biggestW).toLocaleString()}
- Biggest L: $${Math.round(stats.biggestL).toLocaleString()}`
        }]
      })
    });

    const data = await response.json();
    return res.status(200).json({ roast: data?.content?.[0]?.text?.trim() || null });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
