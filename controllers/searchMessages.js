const { slackUserApp, slackApp } = require(".");

/* Search messages globally */
const searchMessages = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("searchMessages  req.query:", req.query);
    const data = await slackUserApp.client.search.messages({
      query,
    });

    return res.status(200).json({
      message: "List feched successfully.",
      data: data.messages,
    });
  } catch (error) {
    console.log("searchMessages  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = searchMessages;
