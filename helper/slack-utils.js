// Render app home view
const getAppHomeView = (
  sort,
  opp_filter,
  deal_status_filter,
  team_filter,
  user_filter,
  last_activity,
  opp_type,
  forecast_category
) => {
  let initial_sort_option = {};
  let initial_filter_option = {};
  let initial_team_filter_option = {};
  let initial_last_activity_option = {};
  let initial_opp_type_option = {};
  let initial_forecast_category_option = {};
  const date_range = [];
  if (sort) {
    initial_sort_option = {
      initial_option: sort,
    };
  }
  if (opp_filter) {
    initial_filter_option = {
      initial_option: opp_filter,
    };
  }
  if (team_filter) {
    initial_team_filter_option = {
      initial_option: team_filter,
    };
  }
  if (last_activity) {
    initial_last_activity_option = {
      initial_option: last_activity,
    };
  }
  if (opp_type) {
    initial_opp_type_option = {
      initial_option: opp_type,
    };
  }
  if (forecast_category) {
    initial_forecast_category_option = {
      initial_option: forecast_category,
    };
  }
  if (last_activity && last_activity.value === "range") {
    date_range.push(...date_range_filters);
  }
  return {
    type: "home",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Welcome!* :wave:",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Create a new deal room",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Create Deal Room",
            emoji: true,
          },
          value: "create-deal-value",
          action_id: "create-deal",
          style: "primary",
        },
      },
      {
        type: "divider",
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Channels",
          emoji: true,
        },
      },
      {
        type: "divider",
      },

      // Sort Start
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "Sort Column By:",
            emoji: true,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select sort column",
              emoji: true,
            },
            ...initial_sort_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Channel name",
                  emoji: true,
                },
                value: "channel",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Deal Value",
                  emoji: true,
                },
                value: "deal_value",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Close Date",
                  emoji: true,
                },
                value: "close_date",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Last Activity",
                  emoji: true,
                },
                value: "last_activity",
              },
            ],
            action_id: "sort-action",
          },
        ],
      },
      // Sort end
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "Filter By:",
            emoji: true,
          },
        ],
      },
      // Filters start
      {
        type: "actions",
        elements: [
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Opportunity type",
              emoji: true,
            },
            ...initial_opp_type_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "All",
                  emoji: true,
                },
                value: "All",
              },
              {
                text: {
                  type: "plain_text",
                  text: "New business",
                  emoji: true,
                },
                value: "New business",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Renewal",
                  emoji: true,
                },
                value: "Renewal",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Upsell",
                  emoji: true,
                },
                value: "Upsell",
              },
            ],
            action_id: "filter-action-opp-type",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Opportunity stage",
              emoji: true,
            },
            ...initial_filter_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "All",
                  emoji: true,
                },
                value: "all",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Discovery call",
                  emoji: true,
                },
                value: "Discovery call",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Demo Scheduled",
                  emoji: true,
                },
                value: "Demo Scheduled",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Proof of concept",
                  emoji: true,
                },
                value: "Proof of concept",
              },
              {
                text: {
                  type: "plain_text",
                  text: "IT/Legal",
                  emoji: true,
                },
                value: "IT/Legal",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Out for signature",
                  emoji: true,
                },
                value: "Out for signature",
              },
            ],
            action_id: "filter-action-opp-stage",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Forecast categories",
              emoji: true,
            },
            ...initial_forecast_category_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Bouncing ball",
                  emoji: true,
                },
                value: "Bouncing ball",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Upside",
                  emoji: true,
                },
                value: "Upside",
              },
              {
                text: {
                  type: "plain_text",
                  text: "High potential",
                  emoji: true,
                },
                value: "High potential",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Commit",
                  emoji: true,
                },
                value: "Commit",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Fulfillment",
                  emoji: true,
                },
                value: "Fulfillment",
              },
            ],
            action_id: "filter-forcast-categories",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Team",
              emoji: true,
            },
            ...initial_team_filter_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "My Team",
                  emoji: true,
                },
                value: "my_team",
              },
              {
                text: {
                  type: "plain_text",
                  text: "All Teams",
                  emoji: true,
                },
                value: "all_teams",
              },
            ],
            action_id: "filter-action-team",
          },
          ...getUsers(team_filter),
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Last Activity",
              emoji: true,
            },
            ...initial_last_activity_option,
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Recently",
                  emoji: true,
                },
                value: "recently",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Yesterday",
                  emoji: true,
                },
                value: "yesterday",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Within a week",
                  emoji: true,
                },
                value: "within_week",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Within a month",
                  emoji: true,
                },
                value: "within_month",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Range",
                  emoji: true,
                },
                value: "range",
              },
            ],
            action_id: "filter-action-last-activity",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Forecast Close Date",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Tomorrow",
                  emoji: true,
                },
                value: "Tomorrow",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Within a week",
                  emoji: true,
                },
                value: "within_week",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Within a month",
                  emoji: true,
                },
                value: "within_month",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Range",
                  emoji: true,
                },
                value: "range",
              },
            ],
            action_id: "filter-action-close-date",
          },
          // {
          //   type: "datepicker",
          //   placeholder: {
          //     type: "plain_text",
          //     text: "Select close date",
          //     emoji: true,
          //   },
          //   action_id: "close-date",
          // },
        ],
      },
      ...date_range,
      // Filters End
      ...getDeals(
        sort,
        opp_filter,
        deal_status_filter,
        user_filter,
        opp_type,
        forecast_category
      ),
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Previous Page",
              emoji: true,
            },
            value: "previous",
            action_id: "previous",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next Page",
              emoji: true,
            },
            value: "next",
            action_id: "next",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Items per page",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "5",
                  emoji: true,
                },
                value: "5",
              },
              {
                text: {
                  type: "plain_text",
                  text: "10",
                  emoji: true,
                },
                value: "10",
              },
              {
                text: {
                  type: "plain_text",
                  text: "20",
                  emoji: true,
                },
                value: "20",
              },
              // {
              //   text: {
              //     type: "plain_text",
              //     text: "50",
              //     emoji: true,
              //   },
              //   value: "50",
              // },
            ],
            action_id: "actionId-3",
          },
        ],
      },
      {
        type: "divider",
      },

      /*       {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*#winrate-demo-channel-internal* - John Doe - Prospecting - Hot",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "C079G4507PW",
          action_id: "join-channel",
          style: "primary",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*#winrate-demo-external* - Adam Smith - Qualification - Cold",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "C07GX8YMKEY",
          action_id: "join-channel",
          style: "primary",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*#dominos-deal-with-canvas-won* - Martin Lopez - Negotiation - Nutural",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "C07CRLE9TC5",
          action_id: "join-channel",
          style: "primary",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*#dell-deal-intarnal* - Jack Doe - Negotiation - Nutural",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "C07JYDLAATX",
          action_id: "join-channel",
          style: "primary",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*#dell-deal-shared* - Jack Doe - Negotiation - Hot",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Join",
            emoji: true,
          },
          value: "C07H20L2ERZ",
          action_id: "join-channel",
          style: "primary",
        },
      }, */
    ],
  };
};

const date_range_filters = [
  {
    type: "context",
    elements: [
      {
        type: "plain_text",
        text: "Select Date Range:",
        emoji: true,
      },
    ],
  },
  {
    type: "actions",
    elements: [
      {
        type: "datepicker",
        placeholder: {
          type: "plain_text",
          text: "From date",
          emoji: true,
        },
        action_id: "from-date",
      },
      {
        type: "datepicker",
        placeholder: {
          type: "plain_text",
          text: "To date",
          emoji: true,
        },
        action_id: "to-date",
      },
    ],
  },
];

const getDeals = (
  sort,
  opp_filter,
  deal_status_filter,
  user_filter,
  opp_type,
  forecast_category
) => {
  // let channels = [
  //   {
  //     channel_name: "winrate-demo-channel-internal",
  //     sales_rep: "John Doe",
  //     opp_stage: "Prospecting",
  //     status: "Hot",
  //     channel_id: "C079G4507PW",
  //     last_activity: "2024-09-04T11:59:00.000Z"
  //  close_date: "2024-09-04T11:59:00.000Z"
  //   },
  //   {
  //     channel_name: "winrate-demo-external",
  //     sales_rep: "Adam Smith",
  //     opp_stage: "Qualification",
  //     status: "Cold",
  //     channel_id: "C07GX8YMKEY",
  //     last_activity: "2024-08-01T01:20:00.000Z"
  //  close_date: "2024-08-01T01:20:00.000Z"
  //   },
  //   {
  //     channel_name: "dominos-deal-with-canvas-won",
  //     sales_rep: "Martin Lopez",
  //     opp_stage: "Negotiation",
  //     status: "Cold",
  //     channel_id: "C07CRLE9TC5",
  //     last_activity: "2024-08-27T22:37:00.000Z"
  //  close_date: "2024-08-27T22:37:00.000Z"
  //   },
  //   {
  //     channel_name: "dell-deal-intarnal",
  //     sales_rep: "Jack Doe",
  //     opp_stage: "Negotiation",
  //     status: "Hot",
  //     channel_id: "C07JYDLAATX",
  //     last_activity: "2024-09-02T12:18:00.000Z"
  //  close_date: "2024-09-02T12:18:00.000Z"
  //   },
  //   {
  //     channel_name: "dell-deal-shared",
  //     sales_rep: "Jack Doe",
  //     opp_stage: "Negotiation",
  //     status: "Hot",
  //     channel_id: "C07H20L2ERZ",
  //     last_activity: "2024-09-01T15:01:05.231Z"
  //  close_date: "2024-09-01T15:01:05.231Z"
  //   },
  // ];

  let channels = [
    {
      channel_name: "Dell Upsell",
      sales_rep: "John Doe",
      opp_stage: "Discovery Call",
      opportunity_type: "Upsell",
      forcast_category: "Bouncing ball",
      channel_id: "C079G4507PW",
      last_activity: "2024-09-04T11:59:00.000Z",
      close_date: "2024-09-05T11:59:00.000Z",
      deal_value: "$50,000",
      deal_link: "https://www.dell.com",
      logo: "https://logo.clearbit.com/dell.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
      opp_id: "8371738",
    },
    {
      channel_name: "York New Sale",
      sales_rep: "Adam Smith",
      opp_stage: "Demo Scheduled",
      opportunity_type: "New business",
      forcast_category: "Bouncing ball",
      channel_id: "C07GX8YMKEY",
      last_activity: "2024-08-01T01:20:00.000Z",
      close_date: "2024-08-02T01:20:00.000Z",
      deal_value: "$70,000",
      deal_link: "https://www.york.ie",
      logo: "https://logo.clearbit.com/york.ie",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
      opp_id: "8371737",
    },
    {
      channel_name: "Winrate Renewal",
      sales_rep: "Martin Lopez",
      opp_stage: "Discovery call",
      opportunity_type: "Renewal",
      forcast_category: "Upside",
      channel_id: "C07CRLE9TC5",
      last_activity: "2024-08-27T22:37:00.000Z",
      close_date: "2024-08-28T22:37:00.000Z",
      deal_value: "$900,000",
      deal_link: "https://www.winrate.com",
      logo: "https://logo.clearbit.com/winrate.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
      opp_id: "2381738",
    },
    {
      channel_name: "Alfa 2024",
      sales_rep: "Jack Doe",
      opp_stage: "Demo Scheduled",
      opportunity_type: "New business",
      forcast_category: "High potential",
      channel_id: "C07JYDLAATX",
      last_activity: "2024-09-02T12:18:00.000Z",
      close_date: "2024-09-03T12:18:00.000Z",
      deal_value: "$100,000",
      deal_link: "https://www.alfa.com",
      logo: "https://logo.clearbit.com/alfa.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
      opp_id: "7755738",
    },
    {
      channel_name: "Puma Monthly",
      sales_rep: "Jack Doe",
      opp_stage: "Proof of concept",
      opportunity_type: "Renewal",
      forcast_category: "High potential",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-02T15:01:05.231Z",
      close_date: "2024-09-03T15:01:05.231Z",
      deal_value: "$50,000",
      deal_link: "https://www.puma.com",
      logo: "https://logo.clearbit.com/puma.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
      opp_id: "4466553",
    },
    {
      channel_name: "Lenovo Upsell",
      sales_rep: "Martin Lopez",
      opp_stage: "Proof of concept",
      opportunity_type: "Upsell",
      forcast_category: "Commit",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-04T15:01:05.231Z",
      close_date: "2024-09-05T15:01:05.231Z",
      deal_value: "$30,000",
      deal_link: "https://www.lenovo.com",
      logo: "https://logo.clearbit.com/lenovo.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
      opp_id: "3747582",
    },
    {
      channel_name: "Dominos Renewal",
      sales_rep: "William Brown",
      opp_stage: "IT/Legal",
      opportunity_type: "Renewal",
      forcast_category: "Fulfillment",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-09T15:01:05.231Z",
      close_date: "2024-09-10T15:01:05.231Z",
      deal_value: "$50,000",
      deal_link: "https://www.dominos.com",
      logo: "https://logo.clearbit.com/dominos.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_4.png",
      opp_id: "7472374",
    },
    {
      channel_name: "Apple Renewal",
      sales_rep: "Jack Doe",
      opp_stage: "IT/Legal",
      opportunity_type: "Renewal",
      forcast_category: "Fulfillment",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
      close_date: "2024-09-01T15:01:05.231Z",
      deal_value: "$500,000",
      deal_link: "https://www.apple.com",
      logo: "https://logo.clearbit.com/apple.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
      opp_id: "7755555",
    },
    {
      channel_name: "Samsung 2024",
      sales_rep: "Mark Jones",
      opp_stage: "Out for signature",
      opportunity_type: "New business",
      forcast_category: "Fulfillment",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
      close_date: "2024-09-01T15:01:05.231Z",
      deal_value: "$540,000",
      deal_link: "https://www.samsung.com",
      logo: "https://logo.clearbit.com/samsung.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
      opp_id: "76537775",
    },
    {
      channel_name: "Oppo 2024",
      sales_rep: "Mark Jones",
      opp_stage: "Out for signature",
      opportunity_type: "Upsell",
      forcast_category: "Fulfillment",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
      close_date: "2024-09-01T15:01:05.231Z",
      deal_value: "$110,000",
      deal_link: "https://www.oppo.com",
      logo: "https://logo.clearbit.com/oppo.com",
      user_profile:
        "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
      opp_id: "3333534",
    },
  ];

  if (opp_filter && opp_filter.value != "all") {
    channels = channels.filter((v) => v.opp_stage === opp_filter.value);
  }
  if (deal_status_filter && deal_status_filter.value != "all") {
    channels = channels.filter(
      (v) => v.status.toLowerCase() === deal_status_filter.value
    );
  }
  if (user_filter && user_filter.value != "all") {
    channels = channels.filter((v) => v.sales_rep === user_filter.value);
  }
  if (opp_type && opp_type.value != "all") {
    channels = channels.filter((v) => v.opportunity_type === opp_type.value);
  }
  if (forecast_category && forecast_category.value != "all") {
    channels = channels.filter(
      (v) => v.forcast_category === forecast_category.value
    );
  }
  const column = sort ? sort.value : "channel_name"; // Set default sorting
  channels.sort((a, b) => {
    let a_value = a[column];
    let b_value = b[column];
    if (column === "last_activity" || column === "close_date") {
      a_value = new Date(a_value);
      b_value = new Date(b_value);
    }
    return a_value > b_value ? 1 : b_value > a_value ? -1 : 0;
  });

  let status = {
    Hot: ":fire:",
    Cold: ":snowflake:",
  };
  const dealsOld = channels.map((v) => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<https://google.com|${v.channel_name}>* - ${v.sales_rep} - ${
          v.opp_stage
        } - ${v.deal_value} - ${v.forcast_category} - ${new Date(
          v.last_activity
        ).toLocaleDateString()} - ${new Date(
          v.last_activity
        ).toLocaleDateString()} ${new Date(
          v.last_activity
        ).toLocaleTimeString()}`,
      },
      accessory: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select Action",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "Edit opportunity",
              emoji: true,
            },
            value: "edit",
          },
          {
            text: {
              type: "plain_text",
              text: "Join",
              emoji: true,
            },
            value: "join",
          },
          {
            text: {
              type: "plain_text",
              text: "Launch External",
              emoji: true,
            },
            value: "launch",
          },
          {
            text: {
              type: "plain_text",
              text: "Generate AI Summary",
              emoji: true,
            },
            value: "ai-summary",
          },
        ],
        action_id: "dealroom-action",
      },
    };
  });
  const deals = [];
  channels.map((v) => {
    deals.push(
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Opportunity Owner",
          },
          {
            type: "image",
            image_url: v.user_profile,
            alt_text: v.sales_rep,
          },
          {
            type: "mrkdwn",
            text: `*${v.sales_rep}*`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<${v.deal_link}|${v.channel_name}>*`,
        },
        fields: [
          {
            type: "mrkdwn",
            text: `*Opportunity Stage:*\n${v.opp_stage}`,
          },
          {
            type: "mrkdwn",
            text: `*Opportunity Value:*\n${v.deal_value}`,
          },
          {
            type: "mrkdwn",
            text: `*Forecast Category:*\n${v.forcast_category}`,
          },
          {
            type: "mrkdwn",
            text: `*Forecast Close Date:*\n${new Date(
              v.last_activity
            ).toLocaleDateString()}`,
          },
          {
            type: "mrkdwn",
            text: `*Opportunity Type:*\n${v.opportunity_type}`,
          },
          {
            type: "mrkdwn",
            text: `*Last Activity:*\n${new Date(
              v.last_activity
            ).toLocaleDateString()} - ${new Date(
              v.last_activity
            ).toLocaleTimeString()}`,
          },
          {
            type: "mrkdwn",
            text: `*Opportunity ID:*\n${v.opp_id}`,
          },
        ],
        accessory: {
          type: "image",
          image_url: v.logo,
          alt_text: "credit card",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Join",
              emoji: true,
            },
            style: "primary",
            value: "join",
            action_id: "join",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View AI Summary",
              emoji: true,
            },
            value: "AI Summary",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Edit Opportunity",
              emoji: true,
            },
            value: "edit",
            action_id: "edit",
          },
        ],
      }
    );
  });
  return deals;
};

const getUsers = (team_filter) => {
  let users = [
    {
      text: {
        type: "plain_text",
        text: "Jack Doe",
        emoji: true,
      },
      value: "Jack Doe",
    },
    {
      text: {
        type: "plain_text",
        text: "Martin Lopez",
        emoji: true,
      },
      value: "Martin Lopez",
    },
    {
      text: {
        type: "plain_text",
        text: "William Brown",
        emoji: true,
      },
      value: "William Brown",
    },
    {
      text: {
        type: "plain_text",
        text: "Mark Jones",
        emoji: true,
      },
      value: "Mark Jones",
    },
    {
      text: {
        type: "plain_text",
        text: "Adam Smith",
        emoji: true,
      },
      value: "Adam Smith",
    },
    {
      text: {
        type: "plain_text",
        text: "Kevin Hert",
        emoji: true,
      },
      value: "Kevin Hert",
    },
  ];
  if (team_filter && team_filter.value !== "all_teams") {
    users = users.slice(0, 4);
  }

  let userDropdown = [
    {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Sales Rep",
        emoji: true,
      },
      options: users,
      action_id: "filter-action-user",
    },
  ];
  return userDropdown;
};

const errorView = () => {
  return {
    title: {
      type: "plain_text",
      text: "Error",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Close",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Oops!* Something went wrong",
        },
      },
    ],
  };
};
const successView = (message) => {
  return {
    title: {
      type: "plain_text",
      text: "Success",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Close",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: message || "Sussessfully completed the process!",
        },
      },
    ],
  };
};

const editDealBlocks = () => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Edit Opportunity",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Save",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
          placeholder: {
            type: "plain_text",
            text: "Enter Amount",
            emoji: true,
          },
        },
        label: {
          type: "plain_text",
          text: "Deal Size",
          emoji: true,
        },
      },
      {
        type: "input",
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an item",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Prospecting",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Negotiation",
                emoji: true,
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "Qualification",
                emoji: true,
              },
              value: "value-2",
            },
            {
              text: {
                type: "plain_text",
                text: "Won",
                emoji: true,
              },
              value: "value-3",
            },
            {
              text: {
                type: "plain_text",
                text: "Lost",
                emoji: true,
              },
              value: "value-4",
            },
          ],
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Opportunity Stage",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Pick a close date*",
        },
        accessory: {
          type: "datepicker",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "datepicker-action",
        },
      },
    ],
  };
};
/* Decode JWT payload */
const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  const payload = JSON.parse(jsonPayload);
  return payload;
};

module.exports = {
  getAppHomeView,
  errorView,
  successView,
  editDealBlocks,
  parseJwt,
};
