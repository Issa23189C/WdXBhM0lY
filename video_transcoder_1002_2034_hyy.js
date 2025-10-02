// 代码生成时间: 2025-10-02 20:34:41
// video_transcoder.js
// This module provides functionality for video transcoding using Next.js framework.

const { VideoTranscoderService } = require('./video_transcoder_service'); // Importing the service module
const { errorHandler } = require('./error_handler'); // Importing the error handling module

const videoTranscoder = async (req, res) => {
    // Extract video file information from the request
    const { videoId } = req.body;
    
    try {
        // Validate the videoId
        if (!videoId) {
            throw new Error('Video ID is required for transcoding.');
        }
        
        // Call the transcodeVideo method from the VideoTranscoderService
        const transcodedVideo = await VideoTranscoderService.transcodeVideo(videoId);
        
        // Return the transcoded video data
        res.status(200).json({
            message: 'Video transcoded successfully.',
            video: transcodedVideo
        });
    } catch (error) {
        // Handle any errors that occur during the transcoding process
        errorHandler(error, res);
    }
};

// Export the videoTranscoder function to be used by Next.js routes or other modules
module.exports = {
    videoTranscoder
};
