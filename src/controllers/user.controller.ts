import { Request, Response, NextFunction } from 'express';

  // get profile
export const getUser = (req:Request, res:Response) => {
  console.log("USERPROFILE");
  res.status(200).send("User Profile");
};

export const setProfile = (req:Request, res:Response) => {
  res.status(200).send("User Content.");
};
  
export const setPassword = (req:Request, res:Response) => {
  res.status(200).send("Admin Content.");
};
  
export const setEmail = (req:Request, res:Response) => {
  res.status(200).send("Moderator Content.");
};

export const setNSFW = (req:Request, res:Response) => {
  res.status(200).send("Moderator Content.");
};

export const setPrivate = (req:Request, res:Response) => {
  res.status(200).send("Moderator Content.");
};

export const deleteUser = (req:Request, res:Response) => {
  res.status(200).send("Moderator Content.");
};
