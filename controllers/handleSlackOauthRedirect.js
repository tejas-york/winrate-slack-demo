const {
  slackUserApp,
} = require(".");
const { parseJwt } = require("../helper/slack-utils");

/* Search messages globally */
const handleSlackOauthRedirect = async (req, res) => {
  try {
    const client_id = process.env.SLACK_CLIENT_ID,
      client_secret = process.env.SLACK_CLIENT_SECRET;
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_CLIENT_ID:",
      process.env.SLACK_CLIENT_ID
    );
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_CLIENT_SECRET:",
      process.env.SLACK_CLIENT_SECRET
    );
    const { code } = req.query;
    if (req.query.code) {
      const openid = await slackUserApp.client.openid.connect.token({
        code,
        client_id,
        client_secret,
        redirect_uri: "http://localhost:3000/api/handle-slack-oauth-redirect",
      });
      const decoded = parseJwt(openid.id_token);

      res.status(200).json({ openid, decoded });
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
