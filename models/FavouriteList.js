const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize")

const FavouriteList = sequelize.define("FavouriteLists", {
    ListID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    Description: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 255]
        },
        allowNull: false
    },

    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})

module.exports = FavouriteList;