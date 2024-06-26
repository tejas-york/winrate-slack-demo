const slackApp = require(".");

const sendMessageInChannel = async (req, res) => {
  try {
    const { channel, blocks } = req.body;

    const result = await slackApp.client.chat.postMessage({
      channel,
      blocks,
    });

    res.status(200).json({
      message: "Message sent successfully.",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = sendMessageInChannel;
