import {Sequelize, DataTypes} from "sequelize";
import {App} from "../../types/index";

export const roleModel = (sequelize:Sequelize) => {
  const Role = sequelize.define<App.Role>("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });

  return Role;
};