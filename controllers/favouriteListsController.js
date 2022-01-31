const FavouriteListDB = require('../models/FavouriteList')
const VideoDB = require('../models/Video')
const { Op } = require("sequelize");
const sequelize = require("../sequelize");

module.exports.selectAllLists = async (req, res, next) => {
    try {
        const lists = await FavouriteListDB.findAll({
            order: [
                ['ListID', 'DESC']
            ]
        });

        return res.status(200).json(lists);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.selectAllListsASC = async (req, res, next) => {
    try {
        const lists = await FavouriteListDB.findAll({
            order: [
                ['ListID', 'ASC']
            ]
        });

        return res.status(200).json(lists);
    } catch (err) {
        return res.status(500).json(err);
    }
};


module.exports.insertList = async (req, res) => {
    try {
        await FavouriteListDB.create(req.body);
        return res.status(201).json({ message: "Successfully created list." })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

module.exports.updateList = async (req, res) => {
    try {
        const { Description, Date } = req.body;
        await FavouriteListDB.update({
            Description: Description,
            Date: Date
        }, {
            where: {
                ListID: `${req.params.id}`
            }
        })
        return res.status(200).json({ message: "Successfully updated list." })
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.deleteList = async (req, res) => {
    try {
        await VideoDB.destroy({ where: { ListID: `${req.params.id}` } })
        await FavouriteListDB.destroy({ where: { ListID: `${req.params.id}` } })
        return res.status(201).json({ message: "Successfully deleted list with associated videos." })
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.selectFromFirstXListsInDate = async (req, res) => {
    try {
        const lists = await FavouriteListDB.findAll(
            {
                where: {
                    ListID: { [Op.lt]: `${req.params.maxID}` },
                    Date: `${req.params.date}`
                }
            }
        );

        return res.status(200).json(lists);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.selectAllListsWithPagination = async (req, res) => {
    try {
        const lists = await FavouriteListDB.findAll();
        if (lists) {
            const pageCount = lists.length / 10 + 1;
            const requestedPage = req.params.pageNo;
            if (requestedPage > pageCount) {
                return res.status(404).json({ message: "Page does not exist." })
            }
            return res.status(200).json(lists.slice(page * 10 - 10, page * 10));
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports.import = async (req, res) => {
    try {
        const json = req.body;

        for (let i = 0; i < json.length; i++) {
            var list = json[i];
            var tempList = await FavouriteListDB.create({
                Description: list["Description"],
                Date: list["Date"]
            })
            var listContent = list["List"]
            for (let j = 0; j < listContent.length; j++) {
                var video = listContent[j];
                var tempVideo = await VideoDB.create({
                    ListID: tempList.ListID,
                    Description: video["Description"],
                    Title: video["Title"],
                    URL: video["URL"]
                })
            }
        }
        return res.status(200).json({ message: "Import successful" })
    } catch (err) {
        return res.status(500).json(err)
    }
}