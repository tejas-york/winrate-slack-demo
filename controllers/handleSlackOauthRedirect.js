const { slackApp, slackUserApp } = require(".");
const { decode } = require("jsonwebtoken");

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
      const decoded = decode(result.id_token);
      console.log("handleSlackOauthRedirect  decoded:", decoded);
      return res.redirect(
        `https://slack.com/app_redirect?team=${decoded["https://slack.com/team_id"]}&channel=C07EKUU9THB`
      );
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
