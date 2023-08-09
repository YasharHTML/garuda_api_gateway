import { NextFunction, Request, Response } from "express";
export type Handler = (request: Request, response: Response) => void; 
export type Middleware = (request: Request, response: Response, next: NextFunction) => void; 