const { slackUserApp, slackApp } = require(".");

/* List all channels user has access to */
const listAllChannels = async (req, res) => {
  try {
    const { limit, ...rest } = req.query;
    const channelInfo = await slackUserApp.client.users.conversations({
      limit,
      ...rest,
    });
    return res.status(200).json({
      message: "List feched successfully.",
      channelInfo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = listAllChannels;
