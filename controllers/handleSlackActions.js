const { webClient } = require(".");
const {
  getAppHomeView,
  errorView,
  successView,
  editDealBlocks,
} = require("../helper/slack-utils");

const slackApp = require(".").slackApp;

/**
 * @description This api will handle the actions performed by users in slack like button click in app home.
 * @returns The output to the user in slack
 */
const handleSlackActions = async (req, res) => {
  const { payload } = req.body;
  const { trigger_id, actions, user } = JSON.parse(payload);
  try {
    // You can perform any action here
    // Open a dialog to ask for file upload (if necessary)
    if (actions.length) {
      const action_id = actions[0].action_id;
      console.log("handleSlackActions  action_id:", action_id);
      if (action_id === "create-deal") {
        await webClient.views.open({
          trigger_id: trigger_id,
          view: createDealBlocks(),
        });
      } else if (action_id === "create-deal") {
        await webClient.views.open({
          trigger_id: trigger_id,
          view: createDealBlocks(),
        });
      } else if (action_id === "sort-action") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(selected_option),
        });
      } else if (action_id === "filter-action-opp-stage") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(null, selected_option),
        });
      } else if (action_id === "filter-action-deal-status") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(null, null, selected_option),
        });
      } else if (action_id === "filter-action-team") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(null, null, null, selected_option),
        });
      } else if (action_id === "filter-action-user") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(null, null, null, null, selected_option),
        });
      } else if (action_id === "filter-action-opp-type") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(
            null,
            null,
            null,
            null,
            null,
            null,
            selected_option
          ),
        });
      } else if (
        action_id === "filter-action-last-activity" ||
        action_id === "filter-action-close-date"
      ) {
        console.log("handleSlackActions  action_id:", action_id);
        const selected_option = actions[0].selected_option;
        const view = getAppHomeView(
          null,
          null,
          null,
          null,
          null,
          selected_option
        );
        await slackApp.client.views.publish({
          user_id: user.id,
          view,
        });
      } else if (action_id === "join-channel") {
        const channel_id = actions[0].value;
        await slackApp.client.conversations.invite({
          users: user.id,
          channel: channel_id,
        });
        await webClient.views.open({
          trigger_id: trigger_id,
          view: successView("Successfully joined the channel!"),
        });
      } else if (action_id === "edit") {
        console.log("handleSlackActions  action_id:", action_id);
        const selected_option = actions[0].selected_option;
        // if (selected_option.value === "edit") {
        await webClient.views.open({
          trigger_id: trigger_id,
          view: editDealBlocks(
            null,
            null,
            null,
            null,
            null,
            null,
            selected_option
          ),
        });
        // }
      } else if (action_id === "filter-forcast-categories") {
        const selected_option = actions[0].selected_option;
        await slackApp.client.views.publish({
          user_id: user.id,
          view: getAppHomeView(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            selected_option
          ),
        });
      }
    }

    res.send();
  } catch (error) {
    console.log("handleSlackActions  error:", error);
    await webClient.views.open({
      trigger_id: trigger_id,
      view: errorView(),
    });
  }
};

module.exports = handleSlackActions;

// Return block ui for create deal
const createDealBlocks = () => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Create deal room",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Select channel type",
        },
        accessory: {
          type: "radio_buttons",
          options: [
            {
              text: {
                type: "plain_text",
                text: "*External*",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "*Internal*",
                emoji: true,
              },
              value: "value-1",
            },
          ],
          action_id: "radio_buttons-action",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Map opportunity",
        },
        accessory: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Select options",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "*Dell Inc*",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "*Apple*",
                emoji: true,
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "*Dominos*",
                emoji: true,
              },
              value: "value-2",
            },
          ],
          action_id: "multi_static_select-action",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Add members",
        },
        accessory: {
          type: "multi_users_select",
          placeholder: {
            type: "plain_text",
            text: "Select conversations",
            emoji: true,
          },
          action_id: "multi_users_select-action",
        },
      },
    ],
  };
};

// Return block ui for view deal
const viewDealBlocks = () => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "My App",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
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
  };
};
