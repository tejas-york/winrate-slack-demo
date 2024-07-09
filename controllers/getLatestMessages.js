const webhookLogs = require("../database/schema/webhookLogs");

const getLatestMessages = async (req, res) => {
  try {
    let logs = await webhookLogs.find({
      "event.type": "message",
    });

    // Regular expression to match the link and title
    const regex = /<([^|>]+)(?:\|([^>]+))?>/;
    const links = logs.map((log) => {
      // Execute the regex on the markdown string
      let message = ''
      if(log.event.subtype === 'message_deleted') {
        message = log.event.previous_message.text
      } else {
        message = log.event.text
      }
      let match = message.match(regex)
      if (match) {
        const url = match[1];
        const title = match[2];
        return { url, title, user: log.event.user, subtype: log.event.subtype };
      } else {
        return {
          url: message,
          user: log.event.user,
          subtype: log.event.subtype,
        };
      }
    });
    res.status(200).json({
      message: "Messages Fetched Successfully",
      data: links,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = getLatestMessages;
