const { slackUserApp, slackApp } = require(".");

/* List all users available in the current workspace */
const listAllUsers = async (req, res) => {
  try {
    const { limit, ...rest } = req.query;
    const data = await slackApp.client.users.list({
      limit,
      ...rest,
    });
    data.members = data.members.filter((v) => !v.is_bot);

    return res.status(200).json({
      message: "List feched successfully.",
      data,
    });
  } catch (error) {
    console.log("listAllUsers  error:", error.data);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = listAllUsers;
