import {Sequelize,DataTypes} from "sequelize";
import {App} from "../../types/index";

export const userModel = (sequelize:Sequelize) => {
  const User = sequelize.define<App.User>("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    nsfw: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    profile: {
      type: DataTypes.TEXT
    }
  });

  return User;
};