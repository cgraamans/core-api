import { Auth } from "../middleware/auth";
import { Request, Response, NextFunction } from 'express';
import { setProfile, setPassword, setEmail, getUser } from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get(
  "",
  [Auth.verifyToken],
  getUser
);

router.post(
  "/email",
  [Auth.verifyToken],
  setEmail
);

router.post(
  "/password",
  [Auth.verifyToken],
  setPassword
);

router.post(
  "/profile",
  [Auth.verifyToken],
  setProfile
);

export default router;