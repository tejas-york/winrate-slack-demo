const slackApp = require(".");

const createChannel = async (req, res) => {
  try {
    const { name, usersToInvite, isPrivate } = req.body;

    /* Create Channel with name and description */
    const conversation = await slackApp.client.conversations.create({
      name: name, // New channel name
      is_private: isPrivate, // Define if it is public or private
    });

    /* Get All Users from this workspace */
    const users = await slackApp.client.users.list();

    /* Filter users that need to invite in channel */
    const filteredUsers = users.members.filter((user) =>
      usersToInvite.includes(user.profile.email)
    );

    /* Invite users to channel */
    await slackApp.client.conversations.invite({
      users: filteredUsers.map((user) => user.id).join(","), // Pass user ids comma saperated
      channel: conversation.channel.id, // Pass channel id
    });

    res.status(200).json({
      message: "Channel created successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = createChannel;
