import {Sequelize, Model, InferAttributes, InferCreationAttributes,CreationOptional,DataTypes,ModelStatic,HasManyGetAssociationsMixin,HasManySetAssociationsMixin} from "sequelize";

export namespace App {

    export interface Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
        id:number;
        name:string;
    }

    export interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        id?:number;
        username: string;
        email:string;
        password:string;
        private:boolean;
        nsfw:boolean;
        profile:string;
        getRoles?:HasManyGetAssociationsMixin<Role>;
        setRoles:HasManySetAssociationsMixin<Role, number>;
      } 

    export interface databaseModel {
        sequelize:Sequelize,
        user:ModelStatic<User>,
        role:ModelStatic<Role>,
        ROLES?:string[]
    }

}
