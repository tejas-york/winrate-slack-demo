const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSummary = async (req, res) => {
  try {
    const prompt = `
    Analyze the following chat and provide:
    1. Brief summary.
    2. Sentiment (positive, neutral, or negative).
    3. Indication of how the deal is going (e.g., progressing well, at risk, or stalled).

    Chat:
    ${req.body.chat}
  `;
    console.time("time")
    console.timeLog("time")
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-3.5-turbo
      messages: [{ role: "assistant", content: prompt }],
      max_tokens: 300,
    });
    console.log("generateSummary  response:", response);
    console.timeEnd("time")

    const data = response.data;
    res.status(200).json({
      message: "Success!",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = generateSummary;
