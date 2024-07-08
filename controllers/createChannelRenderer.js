const createChannelRenderer = async (req, res) => {
  try {
    res.render("createChannel");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = createChannelRenderer;
