const { slackApp } = require(".");

const test = async (req, res) => {
  try {
    const data = await slackApp.client.auth.test();
    res.json({
      message: "Test success!",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = test;
