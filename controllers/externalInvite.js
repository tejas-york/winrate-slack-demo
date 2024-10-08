const slackApp = require(".").slackApp;
const { webClient } = require(".");

/**
 * @description Create channel and invite external channel with
 * @param emails array
 * @param name string
 * @param isPrivate boolean
 * @param markdown string
 */
const externalInvite = async (req, res) => {
  try {
    const { emails, name, isPrivate, markdown } = req.body;

    if (!emails.length) {
      throw { message: "Please provide at least one email!" };
    }

    /* Get All Users from this workspace */
    const users = await slackApp.client.users.list();
    /* Filter users that need to invite in channel and in the same workspace */
    const internalUsers = users.members.filter(
      (user) => emails.includes(user.profile.email) && user.profile.email
    );

    /* Filter users that need to invite in channel and not in the same workspace */
    const internalEmails = internalUsers.map((v) => v.profile.email);
    const externalUserEmails = emails.filter(
      (email) => !internalEmails.includes(email)
    );

    /* Create Channel with name */
    const conversation = await slackApp.client.conversations.create({
      name: name, // New channel name
      is_private: isPrivate, // Define if it is public or private
    });

    /* Invite internal users to channel */
    await slackApp.client.conversations.invite({
      users: internalUsers.map((user) => user.id).join(","), // Pass user ids comma saperated
      channel: conversation.channel.id, // Pass channel id
    });

    /* Invite external users to the channel */
    for (let i = 0; i < externalUserEmails.length; i++) {
      const email = externalUserEmails[i];
      const externalInvite = await slackApp.client.conversations.inviteShared({
        emails: [email],
        channel: conversation.channel.id,
      });
      console.log("externalInvite  externalInvite:", externalInvite)
    }
    if (markdown) {
      const canvas = await webClient.conversations.canvases.create({
        channel_id: conversation.channel.id,
        document_content: {
          markdown,
          type: "markdown",
        },
      });
      console.log("externalInvite  canvas:", canvas);
    }
    res.status(200).json({
      message: "Invitation sent successfully.",
      conversation,
    });
  } catch (error) {
    console.log("externalInvite  error:", error)
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = externalInvite;
