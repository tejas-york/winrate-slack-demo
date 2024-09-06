const { slackApp, slackUserApp, slackEnterpriseApp, slackEnterpriseUserApp } = require(".");

/* Search messages globally */
const handleSlackOauthRedirect = async (req, res) => {
  try {
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_ENTERPRISE_CLIENT_ID:",
      process.env.SLACK_ENTERPRISE_CLIENT_ID
    );
    console.log(
      "handleSlackOauthRedirect  process.env.SLACK_ENTERPRISE_CLIENT_SECRET:",
      process.env.SLACK_ENTERPRISE_CLIENT_SECRET
    );
    const { code } = req.query;
    if (req.query.code) {
      const oauthV2 = await slackEnterpriseUserApp.client.oauth.v2.access({
        client_id: process.env.SLACK_ENTERPRISE_CLIENT_ID,
        client_secret: process.env.SLACK_ENTERPRISE_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/api/handle-slack-oauth-redirect",
        code,
      });
      console.log("handleSlackOauthRedirect  oauthV2:", oauthV2);
      const users = oauthV2.authed_user.id;
      console.log("handleSlackOauthRedirect  users:", users);
      const invite = await slackEnterpriseUserApp.client.admin.conversations.invite({
        channel_id: "C07JDCDDADP",
        user_ids: users,
      });
      console.log("handleSlackOauthRedirect  invite:", invite);
      return res.redirect(
        `https://slack.com/app_redirect?team=T07HMMLNJUT&channel=C07JDCDDADP`
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
