import { Request, Response, NextFunction } from 'express';

  // get profile
export const UserProfile = (req:Request, res:Response) => {

  console.log("USERPROFILE");
  // console.log();


  res.status(200).send("User Profile");
};

  // set profile
  // change password
  // change email
  // delete account
  // message user
  // check messages
  // check sent messages
  // set private
  // set nsfw
export const userBoard = (req:Request, res:Response) => {
  res.status(200).send("User Content.");
};
  
  // list moderators
  // add moderators
  // remove moderators
  // unban users
export const adminBoard = (req:Request, res:Response) => {
  res.status(200).send("Admin Content.");
};
  
export const moderatorBoard = (req:Request, res:Response) => {
  // list users
  // ban users
  res.status(200).send("Moderator Content.");
};