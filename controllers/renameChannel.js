const { slackApp } = require(".");

const renameChannel = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("renameChannel  name:", name)
    const { channel } = req.params;
    const channelInfo = await slackApp.client.conversations.rename({
      channel,
      name,
    });
    return res.status(200).json({
      message: "Channel renamed successfully",
      channelInfo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = renameChannel;
