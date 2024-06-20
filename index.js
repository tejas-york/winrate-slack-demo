const Slack = require("@slack/bolt");
require("dotenv").config();
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const slackApp = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Create Channel with name and description */
slackApp.client.conversations
  .create({
    name: "test-channel-5",
    description: "Test Channel",
  })
  .then(async (conversation) => {
    /* Get All Users */
    const users = await slackApp.client.users.list();

    /* Filter users that need to invite in channel */
    const filteredUsers = users.members.filter(
      (user) => user.profile.email === "tejassoni@york.ie"
    );

    /* Invite users to channel */
    await slackApp.client.conversations.invite({
      users: filteredUsers.map((user) => user.id).join(","), // Pass user ids comma saperated
      channel: conversation.channel.id, // Pass channel id
    });
  })
  .catch((err) => {
    console.log("err:", err);
  });

