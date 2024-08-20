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
            type: "header",
            text: {
              type: "plain_text",
              text: "Deal Overview",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":trophy: *Lenovo Deal*",
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
                text: "*Amount:* \n:moneybag: *$50,000*",
              },
              {
                type: "mrkdwn",
                text: "*Status:* \n:white_check_mark: *Won*",
              },
            ],
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: "*Deal Owner:* \n:bust_in_silhouette: *Mark Doe*",
              },
              {
                type: "mrkdwn",
                text: "*Members Involved:* \n:family: *5*",
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
              text: "Deal Members",
              emoji: true,
            },
          },
          {
            type: "section",
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
              alt_text: "John Smith",
            },
            text: {
              type: "mrkdwn",
              text: "*John Smith*\n:email: john.smith@example.com",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Profile",
                  emoji: true,
                },
                url: "https://york-ie.slack.com/team/U0712DF0ZUK",
                value: "view_profile_john_smith",
                action_id: "button_view_profile_john_smith",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
              alt_text: "Jane Doe",
            },
            text: {
              type: "mrkdwn",
              text: "*Jane Doe*\n:email: jane.doe@example.com",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Profile",
                  emoji: true,
                },
                url: "https://york-ie.slack.com/team/U0712DF0ZUK",
                value: "view_profile_jane_doe",
                action_id: "button_view_profile_jane_doe",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
              alt_text: "Emily Johnson",
            },
            text: {
              type: "mrkdwn",
              text: "*Emily Johnson*\n:email: emily.johnson@example.com",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Profile",
                  emoji: true,
                },
                url: "https://york-ie.slack.com/team/U0712DF0ZUK",
                value: "view_profile_emily_johnson",
                action_id: "button_view_profile_emily_johnson",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/profile_4.png",
              alt_text: "Michael Brown",
            },
            text: {
              type: "mrkdwn",
              text: "*Michael Brown*\n:email: michael.brown@example.com",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Profile",
                  emoji: true,
                },
                url: "https://york-ie.slack.com/team/U0712DF0ZUK",
                value: "view_profile_michael_brown",
                action_id: "button_view_profile_michael_brown",
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
              alt_text: "Sarah Wilson",
            },
            text: {
              type: "mrkdwn",
              text: "*Sarah Wilson*\n:email: sarah.wilson@example.com",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Profile",
                  emoji: true,
                },
                value: "view_profile_sarah_wilson",
                url: "https://york-ie.slack.com/team/U0712DF0ZUK",
                action_id: "button_view_profile_sarah_wilson",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.log("renderAppHome  error:", error);
  }
};
