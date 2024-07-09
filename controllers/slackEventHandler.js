const webhookLogs = require("../database/schema/webhookLogs");

const slackEventHandler = async (req, res) => {
  try {
    const { type, challenge, event } = req.body;
    console.log("slackEventHandler  type:", type);
    /* Handle event of url verification */
    if (type === "url_verification") {
      return res.send(challenge);
    }

    console.log("slackEventHandler  event.type:", event.type);
    /* Handle message event */
    if (type === "event_callback" && event.type === "message") {
      await new webhookLogs({ event }).save(); // Save event log in datanase
    }

    return res.status(200).json({
      message: "Event handled successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = slackEventHandler;
