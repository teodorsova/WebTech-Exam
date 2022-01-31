const FavouriteListDB = require('../models/FavouriteList')
const VideoDB = require('../models/Video')
const { Op } = require("sequelize");
const sequelize = require("../sequelize");

module.exports.selectAllVideos = async (req, res) => {
    try {
        const videos = await VideoDB.findAll();
        return res.status(200).json(videos);
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.selectVideosByList = async (req, res) => {
    try {
        const videos = await VideoDB.findAll({ where: { ListID: `${req.params.listID}` } });
        if (videos) {
            return res.status(200).json(videos);
        } else {
            return res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.insertVideoInList = async (req, res) => {
    try {
        const { Description, Title, URL } = req.body;
        const list = await FavouriteListDB.findByPk(req.params.listID);
        if (list) {
            await VideoDB.create({
                ListID: `${req.params.listID}`,
                Description: Description,
                Title: Title,
                URL: URL
            });
            return res.status(201).json({ message: "Successfully created video." })
        } else {
            return res.status(404).json({ message: "Cannot add video. List does not exist." })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.updateVideoInList = async (req, res) => {
    try {
        const { ListID, Description, Title, URL } = req.body; //ListID in req.body represents the new listid (in case where the user wants to move a video form a list to another)
        const list = await FavouriteListDB.findByPk(req.params.listID);
        if (list) {
            await VideoDB.update({
                ListID: ListID,
                Description: Description,
                Title: Title,
                URL: URL,
                date_updated: new Date()
            }, {
                where: {
                    VideoID: `${req.params.videoID}`
                }
            })
            return res.status(200).json({message : "Successfully updated video."})
        } else {
            return res.status(404).json({ message: "Cannot update video. Either list or video does not exist." })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.deleteVideoFromList = async (req, res) => {
    try {
        const list = await FavouriteListDB.findByPk(req.params.listID);
        if (list) {
            await VideoDB.destroy({
                where: {
                    VideoID: `${req.params.videoID}`
                }
            })
            return res.status(200).json({message : "Successfully deleted video."})
        } else {
            return res.status(404).json({ message: "Cannot delete video. Either list or video does not exist." })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}
