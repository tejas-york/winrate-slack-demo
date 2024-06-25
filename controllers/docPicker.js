const docPicker = async (req, res) => {
  try {
    res.render('docPicker');
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

module.exports = docPicker;
