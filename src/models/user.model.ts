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
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  return User;
};