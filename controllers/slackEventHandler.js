const { slackApp } = require(".");
const webhookLogs = require("../database/schema/webhookLogs");

const slackEventHandler = async (req, res) => {
  try {
    const { type, challenge, event } = req.body;
    console.log("slackEventHandler  type:", type);
    /* Handle event of url verification */
    if (type === "url_verification") {
      return res.send(challenge);
    }

    console.log("slackEventHandler  event.type:", event.type);
    /* Handle message event */
    if (type === "event_callback" && event.type === "message") {
      console.log("slackEventHandler  event:", event);
      const log = await new webhookLogs({ event }).save(); // Save event log in datanase
      console.log("slackEventHandler  log:", log);
    }

    if (type === "event_callback" && event.type === "app_home_opened") {
      await renderAppHome(event.user);
      console.log("Done");
    }
    return res.status(200).json({
      message: "Event handled successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = slackEventHandler;

const renderAppHome = async (user_id) => {
  try {
    return await slackApp.client.views.publish({
      user_id,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":rocket: _Streamline Your Sales Journey with *Winrate*_ :trophy:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "📬 Your Notifications",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Deal Update*\n*Jack* has updated the deal status of *Lenovo* to *Won*.",
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: ":clock4: Today at 4:00 PM",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":file_folder: *Library*\nNew document attached to the *Dominos* deal.",
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: ":clock330: Today at 3:30 PM",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Deal Update*\n*Mark* has updated the deal status of *Dell* to *Lost*.",
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: ":clock230: Today at 2:30 PM",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "📊 Deal Rooms",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Click here to create new deal",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Create Deal",
                emoji: true,
              },
              value: "create-deal-action-value",
              action_id: "create-deal-action-id",
              style: "primary",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Won",
                  emoji: true,
                },
                value: "won-filter",
                action_id: "won-filter-action",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Lost",
                  emoji: true,
                },
                value: "lost-filter",
                action_id: "lost-filter-action",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "In Progress",
                  emoji: true,
                },
                value: "inprogress-filter",
                action_id: "inprogress-filter-action",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Lenovo Deal*\n*Amount:* :moneybag: $50,000\n*Status:* :white_check_mark: Won",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "View",
                emoji: true,
              },
              value: "view_lenovo_deal",
              action_id: "view_lenovo_deal",
              style: "primary",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Dominos Deal*\n*Amount:* :moneybag: $30,000\n*Status:* :hourglass_flowing_sand: In Progress",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "View",
                emoji: true,
              },
              value: "view_lenovo_deal",
              action_id: "view_lenovo_deal",
              style: "primary",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Dell Deal*\n*Amount:* :moneybag: $75,000\n*Status:* :x: Lost",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "View",
                emoji: true,
              },
              value: "view_lenovo_deal",
              action_id: "view_lenovo_deal",
              style: "primary",
            },
          },
          {
            type: "divider",
          },
        ],
      },
    });
  } catch (error) {
    console.log("renderAppHome  error:", error);
  }
};
