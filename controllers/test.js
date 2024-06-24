const test = async (req, res) => {
  try {
    res.json({
      message: "Test success!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = test;
