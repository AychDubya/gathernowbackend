const bcrypt = require("bcrypt");

const session = require("express-session");

module.exports = function(sequelize,DataTypes){
    var events = sequelize.define('events',{
        time:DataTypes.INTEGER,
        event_category:DataTypes.STRING,
        event_name:DataTypes.STRING,
        event_location:DataTypes.STRING,
        meeting_spot:DataTypes.STRING,
        num_of_attendees:DataTypes.INTEGER,
        min_age:DataTypes.INTEGER,
        additional_info:DataTypes.STRING
    }
    );
    events.associate = function(models){
    };
    return events;
}