const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");

const downloadVideo = async (req, res) => {
  const videoUrl = req.body.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "You must provide a YouTube URL" });
  }

  try {
    const ytDlpPath = "/opt/homebrew/bin/yt-dlp"; // Ensure yt-dlp is correctly installed
    const outputFilePath = path.join(os.tmpdir(), `video_${Date.now()}.mp4`);
    const command = `${ytDlpPath} -o "${outputFilePath}" -f mp4 ${videoUrl}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`yt-dlp error: ${stderr}`);
        return res.status(500).json({ error: "Failed to download the video." });
      }

      res.download(outputFilePath, "video.mp4", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ error: "Error sending video file." });
        }

        // Clean up temporary file after download
        fs.unlink(outputFilePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      });
    });
  } catch (error) {
    console.error("Error downloading video:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Unexpected error during download." });
    }
  }
};

module.exports = { downloadVideo };
