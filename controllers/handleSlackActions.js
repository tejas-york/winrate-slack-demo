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
    if (payload.actions[0].action_id === "create-deal-action-id") {
      await webClient.views.open({
        trigger_id: trigger_id,
        view: createDealBlocks(),
      });
    } else {
      await webClient.views.open({
        trigger_id: trigger_id,
        view: viewDealBlocks(),
      });
    }

    res.send();
  } catch (error) {
    res.send({
      response_type: "in_channel", // or 'ephemeral' for private messages
      text: error.message || "Something went wrong!",
    });
  }
};

module.exports = handleSlackActions;

// Return block ui for create deal
const createDealBlocks = () => {
  return {
    type: "modal",
    callback_id: "deal_creation_modal",
    title: {
      type: "plain_text",
      text: "Create New Deal",
    },
    submit: {
      type: "plain_text",
      text: "Submit",
    },
    close: {
      type: "plain_text",
      text: "Cancel",
    },
    blocks: [
      {
        type: "input",
        block_id: "deal_name_block",
        element: {
          type: "plain_text_input",
          action_id: "deal_name_input",
          placeholder: {
            type: "plain_text",
            text: "Enter deal name",
          },
        },
        label: {
          type: "plain_text",
          text: "Deal Name",
        },
      },
      {
        type: "input",
        block_id: "deal_amount_block",
        element: {
          type: "plain_text_input",
          action_id: "deal_amount_input",
          placeholder: {
            type: "plain_text",
            text: "Enter deal amount",
          },
        },
        label: {
          type: "plain_text",
          text: "Deal Amount",
        },
      },
      {
        type: "input",
        block_id: "deal_members_block",
        element: {
          type: "multi_users_select",
          action_id: "deal_members_select",
          placeholder: {
            type: "plain_text",
            text: "Select deal members",
          },
        },
        label: {
          type: "plain_text",
          text: "Deal Members",
        },
      },
      {
        type: "input",
        block_id: "launch_external_block",
        element: {
          type: "checkboxes",
          action_id: "launch_external_checkbox",
          options: [
            {
              text: {
                type: "plain_text",
                text: "Launch External",
              },
              value: "launch_external",
            },
          ],
        },
        label: {
          type: "plain_text",
          text: "Options",
        },
        optional: true,
      },
      {
        type: "input",
        block_id: "opportunity_stage_block",
        element: {
          type: "static_select",
          action_id: "opportunity_stage_select",
          placeholder: {
            type: "plain_text",
            text: "Choose opportunity stage",
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Prospecting",
              },
              value: "prospecting",
            },
            {
              text: {
                type: "plain_text",
                text: "Negotiation",
              },
              value: "negotiation",
            },
            {
              text: {
                type: "plain_text",
                text: "Closed",
              },
              value: "closed",
            },
          ],
        },
        label: {
          type: "plain_text",
          text: "Opportunity Stage",
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
