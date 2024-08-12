const slackApp = require(".").slackApp;

/**
 * @description Create channel and invite external channel with
 * @param channel string
 * @param user string
 */
const uploadCommand = async (req, res) => {
  const { text, user_name } = req.body;

  // You can perform any action here
  const responseText = `Hello ${user_name}, you used the command with text: "${text}"`;

  // Respond back to Slack
  res.send({
    response_type: "in_channel", // or 'ephemeral' for private messages
    text: responseText,
  });
};

module.exports = uploadCommand;
