import { signin, signup, isUser } from "../controllers/auth.controller";
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { Verify } from "../middleware/verify";

// INIT
const router = express.Router();


router.use(function(req:Request, res:Response, next:NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    Verify.checkUsernameAndEmail,
    Verify.checkRolesExisted
  ],
  signup
);

router.post("/signin", signin);

router.post("/isUser", isUser);

export default router;