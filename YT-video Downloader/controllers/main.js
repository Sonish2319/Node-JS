// // const ytdl = require("ytdl-core");

// // const downloadVideo = async (req,res) =>{
// //     const videoUrl = req.bodu.url;
// //     console.log(videoUrl);

// //     if(!videoUrl || !ytdl.validateURL(videoUrl)){
// //         return res.status(400).json({error:"Invalid Youtube URL"});
// //     }

// //     try{

// //         const videoInfo = await ytdl.getInfo(videoUrl);
    
// //         const videoTitle = videoInfo.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
// //         console.log(videoTitle);
    
// //         const format = ytdl.chooseFormat(videoInfo.formats, {quality:"highest"});

// //         res.setHeader("Content-Disposition", `attachment; filename="${videoTitle}.mp4"`);

// //         ytdl(videoUrl,{format}).pipe(res);

// //     }catch(err){
// //         console.error(err);
// //         res.status(500).json({error:"Failed to download video"});
// //     }
// // };

// // module.exports = {downloadVideo};

// const ytdl = require('ytdl-core');

// const downloadVideo = async (req, res) => {
//     const videoURL = req.query.url; // Get the YouTube URL from the query parameter
//     console.log(videoURL);

//     // Validate the YouTube URL
//     if (!ytdl.validateURL(videoURL)) {
//         return res.status(400).send('Invalid YouTube URL');
//     }

//     try {
//         // Get video info
//         const info = await ytdl.getInfo(videoURL);

//         // Choose the highest quality format
//         const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

//         // Set headers for file download
//         res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

//         // Stream the video to the client
//         ytdl(videoURL, { format: format }).pipe(res);
//     } catch (error) {
//         console.error('Error downloading video:', error);
//         res.status(500).send('Error downloading the video');
//     }
// };

// module.exports = { downloadVideo };

// controllers/main.js

// const youtubedl = require('youtube-dl-exec');  // Import youtube-dl-exec

// const downloadVideo = async (req, res) => {
//     const videoUrl = req.query.url; // Retrieve the video URL from the query string

//     console.log("Received URL:", videoUrl);

//     if (!videoUrl) {
//         return res.status(400).json({ error: "You must provide a YouTube URL" });
//     }

//     try {
//         // Run youtube-dl-exec to download the video
//         const output = await youtubedl(videoUrl, {
//             output: '%(title)s.%(ext)s', // Set the output file name format
//             format: 'mp4',               // Specify the format as mp4
//             quiet: true,                 // Suppress unnecessary logs
//         });

//         // Send the file to the client
//         res.setHeader('Content-Type', 'video/mp4');
//         res.setHeader('Content-Disposition', `attachment; filename="${output}"`);

//         // Pipe the file content to the response
//         res.send(output);
//     } catch (error) {
//         console.error("Error downloading video:", error);
//         res.status(500).json({ error: "Failed to download the video" });
//     }
// };

// module.exports = { downloadVideo };


// controllers/main.js

const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const os = require('os');
const tempFilePath = path.join(os.tmpdir(), 'video.mp4'); // Temp file path

const downloadVideo = async (req, res) => {
    const videoUrl = req.query.url; // Retrieve the video URL from the query string

    console.log("Received URL:", videoUrl);

    if (!videoUrl) {
        return res.status(400).json({ error: "You must provide a YouTube URL" });
    }

    try {
        // Download the video to a temporary file
        await youtubedl(videoUrl, {
            output: tempFilePath,      // Save the file to temp path
            format: 'mp4',             // Specify the format as mp4
            quiet: true,               // Suppress unnecessary logs
        });

        // Send the file to the client
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');

        // Stream the file to the client
        const fileStream = fs.createReadStream(tempFilePath);
        fileStream.pipe(res);

        // Cleanup: Delete the temporary file after download is completed
        fileStream.on('end', () => {
            fs.unlinkSync(tempFilePath); // Remove the temporary file
        });

    } catch (error) {
        console.error("Error downloading video:", error);
        res.status(500).json({ error: "Failed to download the video" });
    }
};

module.exports = { downloadVideo };
