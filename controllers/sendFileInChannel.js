const slackApp = require(".").slackApp;
const axios = require("axios");
const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");
const oAuth2Client = require("./googleAuth");

const sendFileInChannel = async (req, res) => {
  try {
    const { channel, fileId, filename } = req.body;

    const mimeType = "application/pdf";

    // await downloadFile(url, tempFilePath);
    const result = await downloadFile(fileId, filename, mimeType);

    // console.log(`Uploading file to Slack channel: ${channel}`);
    // const result = await uploadFileToSlack(
    //   channel,
    //   tempFilePath,
    //   filename,
    //   "John doe shared file."
    // );

    res.status(200).json({
      message: "Message sent successfully.",
      result,
    });
  } catch (error) {
    console.error(`Error:::::::::: ${error}`);
    res.status(400).json({
      message: "Something went wrong!, " + error.message,
    });
  }
};

// Function to upload the downloaded file to Slack
async function uploadFileToSlack(channel, filePath, fileName, fileComment) {
  try {
    const result = await slackApp.client.files.uploadV2({
      // token: process.env.SLACK_BOT_TOKEN,
      channels: channel,
      initial_comment: fileComment,
      file: fs.createReadStream(filePath),
      filename: fileName,
      title: fileName,
    });
    console.log("uploadFileToSlack  result:", result);
    console.log(`File uploaded: ${result.file.id}`);
    return result;
  } catch (error) {
    console.error(`Error uploading file: ${error}`);
  } finally {
    // Clean up the local file after uploading
    console.log("Removing file from temp!");
    fs.unlinkSync(filePath);
  }
}

async function downloadFile(fileId, fileName, mimeType) {
  console.log(
    "downloadFile  fileId, fileName, mimeType:",
    fileId,
    fileName,
    mimeType
  );
  // const writer = fs.createWriteStream(outputLocationPath);
  // const response = await axios({
  //   url: fileUrl,
  //   method: "GET",
  //   responseType: "stream",
  // });
  // response.data.pipe(writer);

  // return new Promise((resolve, reject) => {
  //   writer.on("finish", resolve);
  //   writer.on("error", reject);
  // });
  try {
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const sanitizedFileName = fileName
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase(); // Sanitize filename
    const filePath = path.join(
      __dirname,
      "../public",
      `${sanitizedFileName}.pdf`
    ); // Save as PDF

    const response = await drive.files.export(
      { fileId: fileId, mimeType: mimeType },
      { responseType: "stream" }
    );

    console.log("Response::::::::", response);

    return new Promise((resolve, reject) => {
      const dest = fs.createWriteStream(filePath);
      response.data
        .on("end", () => {
          console.log(`Downloaded ${fileName} as ${sanitizedFileName}.pdf`);
          resolve(filePath);
        })
        .on("data", (chunk) => {
          console.log("~~~~~~~", chunk);
        })
        .on("error", (err) => {
          console.error("Error downloading file:::::::", err);
          reject(err);
        })
        .pipe(dest);
    });
  } catch (error) {
    console.error("Error exporting Google Doc:::::::", error);
    return null;
  }
}

module.exports = sendFileInChannel;
