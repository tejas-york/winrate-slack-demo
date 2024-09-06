const { slackApp } = require(".");
const webhookLogs = require("../database/schema/webhookLogs");
const { getAppHomeView } = require("../helper/slack-utils");

const slackEventHandler = async (req, res) => {
  try {
    const { type, challenge, event } = req.body;
    console.log("DATE----", new Date().toLocaleTimeString());

    console.log("slackEventHandler  type:", type);
    /* Handle event of url verification */
    if (type === "url_verification") {
      return res.send(challenge);
    }
    console.log("slackEventHandler  event.type:", event.type);

    /* Handle message event */
    // if (type === "event_callback" && event.type === "message") {
    //   // const log = await new webhookLogs({ event }).save(); // Save event log in datanase
    //   console.log("slackEventHandler  event:", event);
    //   const log = await saveLogsInDatabase(event);
    // }

    // Handle event when someone opens the app home
    if (type === "event_callback" && event.type === "app_home_opened") {
      const view = getAppHomeView()
      console.log("slackEventHandler  view:", JSON.stringify(view))
      await slackApp.client.views.publish({
        user_id: event.user,
        view,
      });
    }

    return res.status(200).json({
      message: "Event handled successfully",
    });
  } catch (error) {
    console.log("slackEventHandler  error:", error)
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = slackEventHandler;

// Save message logs in database
const saveLogsInDatabase = (event) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const log = await new webhookLogs({ event }).save(); // Save event log in datanase
        resolve(log);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};


