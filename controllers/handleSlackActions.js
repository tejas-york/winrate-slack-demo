const { webClient } = require(".");

const slackApp = require(".").slackApp;

/**
 * @description This api will handle the actions performed by users in slack like button click in app home.
 * @returns The output to the user in slack
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
          text: "Winrate",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Close",
          emoji: true,
        },
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
                  text: "Message",
                  emoji: true,
                },
                value: "message_john_smith",
                action_id: "button_message_john_smith",
                style: "primary",
              },
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
                  text: "Message",
                  emoji: true,
                },
                value: "message_jane_doe",
                action_id: "button_message_jane_doe",
                style: "primary",
              },
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
                  text: "Message",
                  emoji: true,
                },
                value: "message_emily_johnson",
                action_id: "button_message_emily_johnson",
                style: "primary",
              },
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
                  text: "Message",
                  emoji: true,
                },
                value: "message_michael_brown",
                action_id: "button_message_michael_brown",
                style: "primary",
              },
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
                  text: "Message",
                  emoji: true,
                },
                value: "message_sarah_wilson",
                action_id: "button_message_sarah_wilson",
                style: "primary",
              },
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

    res.send();
  } catch (error) {
    res.send({
      response_type: "in_channel", // or 'ephemeral' for private messages
      text: error.message || "Something went wrong!",
    });
  }
};

module.exports = handleSlackActions;
