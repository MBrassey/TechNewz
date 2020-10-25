const { Model, DataTypes, Sequelize, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const bcyrpt = require("bcrypt");
//create our User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcyrpt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration...User.init() ...
//method initializes the models data and configuration passing...
// in two objects as arguments 1. define columns and data type for column 2. accepts configures certain options for the table
User.init(
  {
    //TABLE COLUMN DEFINITIONS GO HERE
    //define an id column
    id: {
      //use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,

      // defaultValue: 1,
      //this is the eqivalent to SQLs NOT NULL option
      allowNull: false,
      //instruct that htis is the PRimary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email values in this table
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    //define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password must be at least four characters long
        len: [4],
      },
    },
  },

  {
    hooks: {
      //set up beforeCreate lifecyle "hook" functionaility
      async beforeCreate(newUserData) {
        newUserData.password = await bcyrpt.hash(newUserData.password, 10);
        return newUserData;
      },
      //set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcyrpt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // pass in our imported sequelize connection (the direct connection to our database )
    sequelize,
    //don't automatically create createdAT/updatedAT timestamp fields
    timestamps: false,
    //dont pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camel - Casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //make it so our model name stays lowercase in the database

    modelName: "user",
  }
);

module.exports = User;
