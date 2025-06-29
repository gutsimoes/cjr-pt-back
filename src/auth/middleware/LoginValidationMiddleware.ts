import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { LoginRequestBody } from '../dto/LoginRequestBody.dto';
  import { validate } from 'class-validator';
  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
  
      const loginRequestBody = new LoginRequestBody();
      loginRequestBody.email = body.email;
      loginRequestBody.senha = body.senha;
  
      const validations = await validate(loginRequestBody);
  
        if (validations.length) {
    throw new BadRequestException(
        validations.reduce((acc, curr) => {
        return [...acc, ...Object.values(curr.constraints || {})];
        }, []),
    );
    }

  
      next();
    }
  }