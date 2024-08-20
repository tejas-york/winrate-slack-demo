const { slackApp } = require(".");

const renameChannel = async (req, res) => {
  try {
    const { name, topic, purpose } = req.body;
    const { channel } = req.params;
    const channelInfo = await slackApp.client.conversations.rename({
      channel,
      name,
    });
    if (topic) {
      await slackApp.client.conversations.setTopic({
        channel: channel,
        topic,
      });
    }
    if (purpose) {
      await slackApp.client.conversations.setPurpose({
        channel: channel,
        purpose,
      });
    }
    return res.status(200).json({
      message: "Channel renamed successfully",
      channelInfo,
    });
  } catch (error) {
    console.log("renameChannel  error:", error.data)
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = renameChannel;
