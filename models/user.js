module.exports = function(sequelize,DataTypes){
    var users = sequelize.define('users',{
        first_name:DataTypes.STRING,
        last_name:DataTypes.STRING,
        age:DataTypes.INTEGER,
        email:DataTypes.STRING,
        phoneNumber:DataTypes.INTEGER 

    });
    users.associate = function(models){

    }
    return users;
}