
module.exports = function (sequelize, DataTypes) {


    var message = sequelize.define('message', {

        chatid: DataTypes.INTEGER,
        sender: DataTypes.INTEGER,
        receiver: DataTypes.INTEGER,
        message: DataTypes.STRING,
    }
    );

    return message;
}