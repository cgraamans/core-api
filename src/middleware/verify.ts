import { Request, Response, NextFunction } from 'express';
import {databaseModel} from "../models";

const ROLES = databaseModel.ROLES;
const User = databaseModel.user;

const checkUsernameAndEmail = async (req:Request, res:Response, next:NextFunction) => {

    if(!req.body.username || !req.body.email || !req.body.password) {
        res.status(401).send({message: "You must fill out the complete form."})
    }

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {
        return res.status(409).send({
            message: "Failed! Username is already in use!"
        });
    }
   
    const email = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (email) {
        return res.status(409).send({
            error: "Email is already in use"
        });
    }

    if(req.body.username.length > 255) {
        return res.status(409).send({
            error: "Username is too long"
        });
    }


    if(req.body.email.length > 255) {
        return res.status(409).send({
            error: "Email is too long"
        });
    }

    if(req.body.password.length > 255) {
        return res.status(409).send({
            error: "Password is too long"
        });
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        return res.status(409).send({
            error: "Not a valid email address"
        });
    }

    next();
  
};

const checkRolesExisted = (req:Request, res:Response, next:NextFunction) => {

    if (req.body.roles) {

        for (let i = 0; i < req.body.roles.length; i++) {

            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    error: "Role does not exist = " + req.body.roles[i]
                });
                return;
            }

        }

    }
  
    next();

};

export const Verify = {
    checkUsernameAndEmail: checkUsernameAndEmail,
    checkRolesExisted: checkRolesExisted
};