const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");

require("dotenv").config();

const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const slackUserApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_USER_TOKEN,
});
const slackEnterpriseUserApp = new App({
  signingSecret: process.env.SLACK_ENTERPRISE_SIGNING_SECRET,
  token: process.env.SLACK_ENTERPRISE_USER_TOKEN,
});

const slackEnterpriseApp = new App({
  signingSecret: process.env.SLACK_ENTERPRISE_SIGNING_SECRET,
  token: process.env.SLACK_ENTERPRISE_BOT_TOKEN,
});

const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

module.exports = { slackApp, webClient, slackUserApp, slackEnterpriseApp, slackEnterpriseUserApp };
// module.exports = webClient;
