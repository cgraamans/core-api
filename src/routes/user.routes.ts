import { Auth } from "../middleware/auth";
import { Request, Response, NextFunction } from 'express';
import { userBoard, moderatorBoard, adminBoard, UserProfile } from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get("", UserProfile);

router.post(
    "/email",
    [Auth.verifyToken],
    userBoard
  );

router.post(
    "/password",
    [Auth.verifyToken],
    moderatorBoard
  );

router.get(
    "/admin",
    [Auth.verifyToken, Auth.isAdmin],
    adminBoard
  );

export default router;