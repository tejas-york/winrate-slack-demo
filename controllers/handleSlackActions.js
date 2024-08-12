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
    console.log("uploadCommand  req.body:", req.body);
    const { trigger_id, actions } = req.body;
    console.log("handleSlackActions  actions:", actions)
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
