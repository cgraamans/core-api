import Sequelize from "sequelize";

import {databaseConfig} from "../config/db.config";
import { roleModel } from "./role.model";
import { userModel } from "./user.model";
import {App} from "../../types/index";

const sequelize = new Sequelize.Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: "postgres",
    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle
    }
  }
);

export const databaseModel:App.databaseModel = {
  sequelize:sequelize,
  user:userModel(sequelize),
  role:roleModel(sequelize),
  ROLES:["user", "admin", "moderator"]
};

databaseModel.role.belongsToMany(databaseModel.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
  as:"users"
});
databaseModel.user.belongsToMany(databaseModel.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  as:"roles"
});