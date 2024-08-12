const slackApp = require(".").slackApp;

/**
 * @description Create channel and invite external channel with
 * @param channel string
 * @param user string
 */
const joinChannel = async (req, res) => {
  try {
    const { user } = req.body;
    const { channel } = req.params;
    console.log("joinChannel  user:", user)

    /* Invite internal users to channel */
    const invitation = await slackApp.client.conversations.invite({
      users: user,
      channel,
    });

    res.status(200).json({
      message: "Invitation sent successfully.",
      invitation,
    });
  } catch (error) {
    console.log("externalInvite  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = joinChannel;
