const { slackApp } = require(".");

/* Search messages globally */
const handleSlackOauthRedirect = async (req, res) => {
  try {
    const { code } = req.query;

    const result = await slackApp.client.openid.connect.token({
      client_id: "658222360132.7302583507348",
      code,
      redirect_uri:
        "https://winrate-slack-demo.onrender.com/slack-oauth-redirect",
    });
    return res.status(200).json({
      message: "Successfully handled oauth...",
      data: result,
    });
  } catch (error) {
    console.log("searchMessages  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = handleSlackOauthRedirect;
