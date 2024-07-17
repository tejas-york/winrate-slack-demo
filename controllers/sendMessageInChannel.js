const slackApp = require(".").slackApp;
const webClient = require(".").webClient;

const sendMessageInChannel = async (req, res) => {
  try {
    const { channel, blocks, urls, ...rest } = req.body;

    /* Logic to add urls in the canvas if received in the payload */
    if (urls && urls.length) {
      /* Get Channel Info */
      const channelInfo = await slackApp.client.conversations.info({
        channel,
        include_locale: true,
        include_num_members: true,
      });
      /* Extract canvas ID */
      const canvas_id = channelInfo.channel.properties.canvas.file_id;
      /* Get Canvas Info */
      const canvasInfo = await webClient.canvases.sections.lookup({
        canvas_id,
        criteria: {
          contains_text: "Notes",
          section_types: ["any_header"],
        },
      });
      /* Extract Secton ID */
      const section_id = canvasInfo.sections[0].id;
      if (urls.length) {
        let markdown = "";
        urls.forEach((v) => {
          markdown += `\n- [${v.name}](${v.url})\n`;
        });

        /* Edit canvas template to attach links of documents */
        const canvasResult = await webClient.canvases.edit({
          // canvas_id: "F07AYRRUE1M",
          canvas_id,
          changes: [
            {
              operation: "insert_before",
              document_content: {
                type: "markdown",
                // markdown: "- [Document 1](https://www.google.com)",
                markdown,
              },
              // section_id: "temp:C:FfE6c659e274a46428ea2c6192e3",
              section_id,
            },
          ],
        });
      }
    }

    /* Post message in channel with the document link */
    const result = await slackApp.client.chat.postMessage({
      channel,
      blocks,
      ...rest
    });
    res.status(200).json({
      message: "Message sent successfully.",
      result,
    });
  } catch (error) {
    console.log("error:::::", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = sendMessageInChannel;
