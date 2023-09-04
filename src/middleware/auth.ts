import jsonwebtoken from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { databaseModel } from "../models";
import { Request, Response, NextFunction } from 'express';

interface AppRequest extends Request {
    userId:string;
}

const verifyToken = (req:AppRequest, res:Response, next:NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token || Array.isArray(token)) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jsonwebtoken.verify(token, authConfig.secret, (err, decoded:jsonwebtoken.JwtPayload) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;
    next();

  });
};

const isAdmin = (req:AppRequest, res:Response, next:NextFunction) => {
  databaseModel.user.findByPk(req.userId).then(user => {

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isModerator = async (req:AppRequest, res:Response, next:NextFunction) => {

  const user = await databaseModel.user.findByPk(req.userId);

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });

};

const isModeratorOrAdmin = (req:AppRequest, res:Response, next:NextFunction) => {

  databaseModel.user.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

export const Auth = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};