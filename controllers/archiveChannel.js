const { slackUserApp, slackApp } = require(".");

const archiveChannel = async (req, res) => {
  try {
    const { channel } = req.params;
    const channelInfo = await slackUserApp.client.conversations.archive({
      channel,
    });
    return res.status(200).json({
      message: "Channel archived successfully.",
      channelInfo,
    });
  } catch (error) {
    console.log("archiveChannel  error:", error.data)
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = archiveChannel;
