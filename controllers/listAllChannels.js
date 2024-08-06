const { slackApp, slackUserApp } = require(".");

/* List all channels user has access to */
const listAllChannels = async (req, res) => {
  try {
    const { limit, ...rest } = req.query;
    let channelInfo = {
      channels: [],
    };
    if (limit) {
      channelInfo = await slackUserApp.client.conversations.list({
        limit,
        ...rest,
      });
    } else {
      /* Get all channels if limit is not provided */
      let cursor = {};
      while (true) {
        const channelResponse = await slackUserApp.client.conversations.list({
          limit,
          ...cursor,
          ...rest,
        });
        channelInfo.channels.push(...channelResponse.channels);
        cursor.cursor = channelResponse.response_metadata.next_cursor;
        if (!cursor.cursor) {
          break;
        }
      }
    }
    channelInfo.channels.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (b < a) {
        return 1;
      }
      return 0;
    });
    return res.status(200).json({
      message: "List feched successfully.",
      channelInfo: {
        ...channelInfo,
        totalItems: channelInfo.channels.length,
      },
    });
  } catch (error) {
    console.log("listAllChannels  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = listAllChannels;
