const webClient = require(".").webClient;

const createCanvas = async (req, res) => {
  try {
    const { channel_id, markdown } = req.body;

    /* Create canvas for a specific channel */
    const conversation = await webClient.conversations.canvases.create({
      channel_id,
      document_content: {
        type: "markdown",
        markdown,
      },
    });

    res.status(200).json({
      message: "Canvas created successfully.",
      conversation,
    });
  } catch (error) {
    console.log("createCanvas  error:", error);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = createCanvas;
