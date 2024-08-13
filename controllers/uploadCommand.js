const { webClient } = require(".");

const slackApp = require(".").slackApp;

/**
 * @description Create channel and invite external channel with
 * @param channel string
 * @param user string
 */
const uploadCommand = async (req, res) => {
  try {
    // You can perform any action here
    const { payload } = req.body;
    const { trigger_id, user_id, channel_id } = JSON.parse(payload);
    // Open a dialog to ask for file upload (if necessary)
    await webClient.chat.postEphemeral({
      trigger_id: trigger_id,
      user: user_id,
      channel: channel_id,
      view: {
        type: "modal",
        callback_id: "file_upload_modal",
        title: {
          type: "plain_text",
          text: "Upload File",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Please upload your file.",
            },
          },
        ],
      },
    });

    res.send();
  } catch (error) {
    res.send({
      response_type: "in_channel", // or 'ephemeral' for private messages
      text: error.message || "Something went wrong!",
    });
  }
};

module.exports = uploadCommand;
