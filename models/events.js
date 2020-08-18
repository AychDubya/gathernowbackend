const bcrypt = require("bcrypt");

const session = require("express-session");

module.exports = function(sequelize,DataTypes){
    var events = sequelize.define('events',{
        event_name:DataTypes.STRING,
        event_location:DataTypes.STRING,
        time:DataTypes.INTEGER,
        meeting_spot:DataTypes.STRING,
        event_category:DataTypes.STRING,
        num_of_attendees:DataTypes.INTEGER
    }
    );
    events.associate = function(models){
    };
    return events;
}