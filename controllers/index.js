const Slack = require("@slack/bolt");
require("dotenv").config();

const slackApp = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

module.exports = slackApp;
