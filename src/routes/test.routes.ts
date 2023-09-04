import { Auth } from "../middleware/auth";
import { Request, Response, NextFunction } from 'express';
import { userBoard, moderatorBoard, adminBoard, allAccess } from "../controllers/test.controller";
import express from "express";

const router = express.Router();

router.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get("/all", allAccess);

router.get(
    "/user",
    [Auth.verifyToken],
    userBoard
  );

router.get(
    "/mod",
    [Auth.verifyToken, Auth.isModerator],
    moderatorBoard 
  );

router.get(
    "/admin",
    [Auth.verifyToken, Auth.isAdmin],
    adminBoard
  );

export default router;