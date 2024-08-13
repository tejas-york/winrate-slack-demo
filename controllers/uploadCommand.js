const { webClient } = require(".");

const slackApp = require(".").slackApp;

/**
 * @description Create channel and invite external channel with
 * @param channel string
 * @param user string
 */
const uploadCommand = async (req, res) => {
  // You can perform any action here
  const { trigger_id } = req.body;
  try {
    // Open a dialog to ask for file upload (if necessary)
    await webClient.chat.postEphemeral({
      trigger_id: trigger_id,
      view: {
        "type": "modal",
        "callback_id": "file_upload_modal",
        "title": {
          "type": "plain_text",
          "text": "Upload File"
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Please upload your file."
            }
          }
        ]
      }
    });

    res.send();
  // Respond back to Slack
  res.send({
    response_type: "in_channel", // or 'ephemeral' for private messages
    text: responseText,
  });
};

module.exports = uploadCommand;
