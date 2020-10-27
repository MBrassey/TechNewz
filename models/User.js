const { Model, DataTypes, Sequelize, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const bcyrpt = require("bcrypt");

// Create User Model
class User extends Model {
  // Setup method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcyrpt.compareSync(loginPw, this.password);
  }
}

// Define table columns and configuration...User.init() ...
// Method initializes the models data and configuration passing...
// In two objects as arguments 1. define columns and data type for column 2. accepts configures certain options for the table
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // Define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,

      // defaultValue: 1,
      // Eqivalent to SQLs NOT NULL option
      allowNull: false,
      //instruct that htis is the PRimary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    // Define Username Column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define Email Column
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
    // Define Password Column
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
      // Set up beforeCreate lifecyle "hook" functionaility
      async beforeCreate(newUserData) {
        newUserData.password = await bcyrpt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcyrpt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // Pass in our imported sequelize connection (the direct connection to our database )
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
