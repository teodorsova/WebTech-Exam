const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize")

const Video = sequelize.define("Videos", {
    VideoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    ListID: {
        type: DataTypes.INTEGER,
        references: { model: 'FavouriteLists', key: 'ListID'},
        allowNull: true
    },

    Description: {
        type: DataTypes.STRING,
        validate: {
            len:[5,255]
        },
        allowNull: false
    },

    Title: {
        type: DataTypes.STRING,
        validate: {
            len:[5,255]
        },
        allowNull: false
    },

    URL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }

})

module.exports = Video;