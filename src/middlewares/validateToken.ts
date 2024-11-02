import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../helpers';

export const validateToken = async (req:Request, res:Response, next:NextFunction) => {
const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: 'No given token' });
  jwt.verify(token, 'secret',(err, decoded) => {
    if(err) return res.status(403).json({ message: 'Invalid Token' });
    req.body.user= Number(decoded);
    next();
  });
};