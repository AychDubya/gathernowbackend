const bcrypt = require("bcrypt");


module.exports = function(sequelize,DataTypes){
    var users = sequelize.define('users',{
        first_name:DataTypes.STRING,
        last_name:DataTypes.STRING,
        age:DataTypes.INTEGER,
        email:{
            type:DataTypes.STRING,
            unique: true,
        },
        phoneNumber:DataTypes.INTEGER, 
        password:DataTypes.STRING
    

    });

    users.associate = function(models){

    };
    users.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null,
            console.log("user.password: ", user.password) 
        );
    });
    return users;
}