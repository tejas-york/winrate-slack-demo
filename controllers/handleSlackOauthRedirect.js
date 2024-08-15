const { slackApp } = require(".");

/* Search messages globally */
const handleSlackOauthRedirect = async (req, res) => {
  try {
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_CLIENT_ID:",
      process.env.SLACK_CLIENT_ID
    );
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_CLIENT_SECRET:",
      process.env.SLACK_CLIENT_SECRET
    );
    if (req.query.code) {
      const result = await slackApp.client.openid.connect.token({
        client_id: process.env.SLACK_CLIENT_ID,
        code: req.query.code,
        redirect_uri:
          "https://winrate-slack-demo.onrender.com/api/handle-slack-oauth-redirect",
        client_secret: process.env.SLACK_CLIENT_SECRET,
        grant_type: "authorization_code",
      });
      const userInfo = await slackApp.client.openid.connect.userInfo({
        token: result.access_token,
      });
      return res.status(200).json({
        message: "Successfully handled oauth...",
        data: userInfo,
      });
    } else {
      return res.status(200).json({
        message: "Successfully handled oauth...",
        data: req.query,
      });
    }
  } catch (error) {
    console.log("searchMessages  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = handleSlackOauthRedirect;
