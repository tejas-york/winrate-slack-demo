const { webClient } = require(".");

const slackApp = require(".").slackApp;

/**
 * @description Create channel and invite external channel with
 * @param channel string
 * @param user string
 */
const handleSlackActions = async (req, res) => {
  try {
    // You can perform any action here
    const { payload } = req.body;
    console.log("handleSlackActions  payload:", payload);
    const { trigger_id } = JSON.parse(payload);
    console.log("handleSlackActions  trigger_id:", trigger_id);
    // Open a dialog to ask for file upload (if necessary)
    await webClient.views.open({
      trigger_id: trigger_id,
      view: {
        type: "modal",
        callback_id: "view_lenovo_deal",
        title: {
          type: "plain_text",
          text: "Lenovo Deal",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Here are the details of the Lenovo Deal.",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: "*Amount:*\n$50,000",
              },
              {
                type: "mrkdwn",
                text: "*Status:*\nWon",
              },
            ],
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

module.exports = handleSlackActions;
