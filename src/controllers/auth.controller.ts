import { databaseModel } from "../models";
import {authConfig} from "../config/auth.config";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Sequelize from "sequelize";

import { Request, Response, NextFunction } from 'express';

export const signup = async (req:Request, res:Response) => {

  // Save User to Database
  const user = await databaseModel.user.create({
    username: req.body.username,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password, 8)
  }).catch(e=>console.log(e));

  if(!user) return;

  await user.setRoles([1]).then(() => {
    res.send({ message: "User was registered successfully!" });
  });

};

export const signin = async (req:Request, res:Response) => {

  if(!req.body.username || !req.body.password) {
    res.status(401).send({error: "You must fill out the complete form."})
  }

  const user = await databaseModel.user.findOne({
    where: {
      username: req.body.username
    }
  }).catch(e=>console.log(e));

  if(!user) return res.status(401).send({
    error: "Invalid username or password"
  });

  const passwordIsValid = bcryptjs.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      error: "Invalid username or password"
    });
  }

  const token = jsonwebtoken.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400 // 24 hours
  });

  const authorities:string[] = [];

  const roles = await user.getRoles();
  if(!roles || roles.length < 1) return res.status(500).send({ error: "Error retrieving roles" });

  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }
  
  return res.status(200).send({
    username: user.username,
    roles: authorities,
    accessToken: token
  });

};

export const isUser = async (req:Request, res:Response) => {

  const user = await databaseModel.user.findOne({
    where: {
        username: req.body.username
    }
  });

  if (user) {
    return res.status(200).send({
        message: true
    });
  }

  return res.status(200).send({
    message:false
  });

};