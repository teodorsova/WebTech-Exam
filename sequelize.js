const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://gyizqstfajudoe:417b5ed2160d420bcaeb0ee1f8312fedb8f4ea7d7094e98ad564ec4ddb77adae@ec2-54-76-249-45.eu-west-1.compute.amazonaws.com:5432/dbd530nmsmgh8t',
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    })

sequelize.sync().then(function () {}).then(
    console.log("DB synchronised.")
);
module.exports = sequelize;