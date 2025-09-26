import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const signupValidation = (req:Request, res:Response, next: NextFunction)=>{
   const schema = Joi.object({
    name:Joi.string().min(3).max(100).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(3).max(100).required(),
   })
   const {error}= schema.validate(req.body);
   if(error){
    return res.status(400)
   }
   next();
};
const loginValidation = (req:Request, res:Response, next: NextFunction)=>{
   const schema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(3).max(100).required(),
   })
   const {error}= schema.validate(req.body);
   if(error){
    return res.status(400)
    .json({ message: "Bad request", error });
   }
   next();
}
export default {loginValidation, signupValidation}