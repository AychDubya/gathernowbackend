module.exports = function (sequelize, DataTypes) {
    var chat = sequelize.define('chat', {

        user1: DataTypes.INTEGER,
        user2: DataTypes.INTEGER,
        timeCreated: DataTypes.INTEGER,
        lastAccessed: DataTypes.INTEGER,
    }
    );

    return chat;
}