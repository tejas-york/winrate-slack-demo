const mongoose = require("mongoose");

const webhookLogsSchema = new mongoose.Schema({
  event: Object,
}, {
  timestamps: true
});

const webhookLogs = mongoose.model("webhook-logs", webhookLogsSchema);

module.exports = webhookLogs;
