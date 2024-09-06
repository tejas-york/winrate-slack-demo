// Render app home view
const getAppHomeView = (
  sort,
  opp_filter,
  deal_status_filter,
  team_filter,
  user_filter,
  last_activity
) => {
  console.log("last_activity:", last_activity)
  let initial_sort_option = {};
  let initial_filter_option = {};
  let initial_deal_status_filter_option = {};
  let initial_team_filter_option = {};
  let initial_last_activity_option = {};
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
  if (deal_status_filter) {
    initial_deal_status_filter_option = {
      initial_option: deal_status_filter,
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

      // {
      //   type: "section",
      //   text: {
      //     type: "mrkdwn",
      //     text: "*Sort by : *",
      //   },
      //   accessory: {
      //     type: "static_select",
      //     placeholder: {
      //       type: "plain_text",
      //       text: "Select a sort column",
      //       emoji: true,
      //     },
      //     ...initial_sort_option,
      //     options: [
      //       {
      //         text: {
      //           type: "plain_text",
      //           text: "Sales Rep",
      //           emoji: true,
      //         },
      //         value: "sales_rep",
      //       },
      //       {
      //         text: {
      //           type: "plain_text",
      //           text: "Channel Name",
      //           emoji: true,
      //         },
      //         value: "channel_name",
      //       },
      //       {
      //         text: {
      //           type: "plain_text",
      //           text: "Oppertunity Stage",
      //           emoji: true,
      //         },
      //         value: "opp_stage",
      //       },
      //       {
      //         text: {
      //           type: "plain_text",
      //           text: "Status",
      //           emoji: true,
      //         },
      //         value: "status",
      //       },
      //     ],
      //     action_id: "sort-action",
      //   },
      // },

      // Sort Start
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "Sort By:",
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
                  text: "Sales Rep",
                  emoji: true,
                },
                value: "sales_rep",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Channel Name",
                  emoji: true,
                },
                value: "channel_name",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Oppertunity Stage",
                  emoji: true,
                },
                value: "opp_stage",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Status",
                  emoji: true,
                },
                value: "status",
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
                  text: "Negotiation",
                  emoji: true,
                },
                value: "negotiation",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Prospecting",
                  emoji: true,
                },
                value: "prospecting",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Qualification",
                  emoji: true,
                },
                value: "qualification",
              },
            ],
            action_id: "filter-action-opp-stage",
          },
          {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Deal status",
              emoji: true,
            },
            ...initial_deal_status_filter_option,
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
                  text: "Hot",
                  emoji: true,
                },
                value: "hot",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Cold",
                  emoji: true,
                },
                value: "cold",
              },
            ],
            action_id: "filter-action-deal-status",
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
        ],
      },
      ...date_range,
      // Filters End
      ...getDeals(sort, opp_filter, deal_status_filter, user_filter),
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
              {
                text: {
                  type: "plain_text",
                  text: "50",
                  emoji: true,
                },
                value: "50",
              },
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

const getDeals = (sort, opp_filter, deal_status_filter, user_filter) => {
  // let channels = [
  //   {
  //     channel_name: "winrate-demo-channel-internal",
  //     sales_rep: "John Doe",
  //     opp_stage: "Prospecting",
  //     status: "Hot",
  //     channel_id: "C079G4507PW",
  //     last_activity: "2024-09-04T11:59:00.000Z"
  //   },
  //   {
  //     channel_name: "winrate-demo-external",
  //     sales_rep: "Adam Smith",
  //     opp_stage: "Qualification",
  //     status: "Cold",
  //     channel_id: "C07GX8YMKEY",
  //     last_activity: "2024-08-01T01:20:00.000Z"
  //   },
  //   {
  //     channel_name: "dominos-deal-with-canvas-won",
  //     sales_rep: "Martin Lopez",
  //     opp_stage: "Negotiation",
  //     status: "Cold",
  //     channel_id: "C07CRLE9TC5",
  //     last_activity: "2024-08-27T22:37:00.000Z"
  //   },
  //   {
  //     channel_name: "dell-deal-intarnal",
  //     sales_rep: "Jack Doe",
  //     opp_stage: "Negotiation",
  //     status: "Hot",
  //     channel_id: "C07JYDLAATX",
  //     last_activity: "2024-09-02T12:18:00.000Z"
  //   },
  //   {
  //     channel_name: "dell-deal-shared",
  //     sales_rep: "Jack Doe",
  //     opp_stage: "Negotiation",
  //     status: "Hot",
  //     channel_id: "C07H20L2ERZ",
  //     last_activity: "2024-09-01T15:01:05.231Z"
  //   },
  // ];

  let channels = [
    {
      channel_name: "channel-1",
      sales_rep: "John Doe",
      opp_stage: "Prospecting",
      status: "Hot",
      channel_id: "C079G4507PW",
      last_activity: "2024-09-04T11:59:00.000Z",
    },
    {
      channel_name: "channel-2",
      sales_rep: "Adam Smith",
      opp_stage: "Qualification",
      status: "Cold",
      channel_id: "C07GX8YMKEY",
      last_activity: "2024-08-01T01:20:00.000Z",
    },
    {
      channel_name: "channel-3",
      sales_rep: "Martin Lopez",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07CRLE9TC5",
      last_activity: "2024-08-27T22:37:00.000Z",
    },
    {
      channel_name: "channel-4",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07JYDLAATX",
      last_activity: "2024-09-02T12:18:00.000Z",
    },
    {
      channel_name: "channel-5",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },

    {
      channel_name: "channel-6",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-7",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-8",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-9",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-10",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-11",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-12",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-13",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-14",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-15",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-16",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-17",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-18",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-19",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-20",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-21",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-22",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-23",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-24",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-25",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-26",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-27",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-28",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-29",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-30",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-31",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-32",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-33",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-34",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-35",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-36",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-37",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-38",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-39",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-40",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-41",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-42",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-43",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-44",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-45",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-46",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-47",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-48",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-49",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-50",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-51",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-52",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-53",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-54",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-55",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-56",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-57",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-58",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-59",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-60",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-61",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-62",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-63",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-64",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Cold",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
    {
      channel_name: "channel-65",
      sales_rep: "Jack Doe",
      opp_stage: "Negotiation",
      status: "Hot",
      channel_id: "C07H20L2ERZ",
      last_activity: "2024-09-01T15:01:05.231Z",
    },
  ];

  if (opp_filter && opp_filter.value != "all") {
    channels = channels.filter(
      (v) => v.opp_stage.toLowerCase() === opp_filter.value
    );
  }
  if (deal_status_filter && deal_status_filter.value != "all") {
    channels = channels.filter(
      (v) => v.status.toLowerCase() === deal_status_filter.value
    );
  }
  if (user_filter && user_filter.value != "all") {
    channels = channels.filter((v) => v.sales_rep === user_filter.value);
  }
  const column = sort ? sort.value : "channel_name"; // Set default sorting
  channels.sort((a, b) =>
    a[column] > b[column] ? 1 : b[column] > a[column] ? -1 : 0
  );

  let status = {
    Hot: ":fire:",
    Cold: ":snowflake:",
  };
  const deals = channels.map((v) => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*#${v.channel_name}* - ${v.sales_rep} - <https://google.com|Deal Link> - ${v.opp_stage} - ${
          status[v.status]
        } - ${new Date(v.last_activity).toLocaleDateString()} ${new Date(
          v.last_activity
        ).toLocaleTimeString()}`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Join",
          emoji: true,
        },
        value: v.channel_id,
        action_id: "join-channel",
        style: "primary",
      },
    };
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
        text: "Johnn Doe",
        emoji: true,
      },
      value: "Johnn Doe",
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
        text: "User",
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

module.exports = { getAppHomeView, errorView, successView };
