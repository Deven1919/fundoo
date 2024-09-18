import { createClient } from 'redis';
import { NextFunction, request, Request, response, Response } from 'express';

let client;

class RedisNote {
  constructor() {
    this.connection();
  }

  private async connection() {
    client = createClient();
    client.on('error', () => {
      return console.log('Error occur during redis connection');
    });

    await client.connect(6379).then(() => {
      return console.log('Redis sever connected');
    });
  }

  // public get = async (req?: Request, res?: Response, next?: NextFunction) => {
  //   const key = res.locals.key;
  //   try {
  //     const data = await client.get(key);
  //     console.log('Data returned from Redis');
  //     return res.status(HttpStatus.OK).json({
  //       code: HttpStatus.OK,
  //       data,
  //       message: 'Note Retrieved Successfully'
  //     });
  //   } catch (err) {
  //     console.error('Redis error:', err);
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Internal Server Error'
  //     });
  //   }
  // }
  // public getValue = async (value) => {
  //   try {
  //     const data = await client.get(value);
  //     return data;
  //   } catch (err) {
  //     console.log('Redis error:', err);
  //     throw err;
  //   }
  // };

  public set = async (key, value) => {
    try {
      const data = await client.set(key, value, { EX: 300 });
      console.log('Data added to redis cache');
      return data;
    } catch (err) {
      console.error('Redis error:', err);
      throw new Error('Failed to set data in Redis');
    }
  };

  public cacheMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cacheData = await client.get(process.env.TOKEN);
      if (cacheData) {
        console.log('Redis cache hit');
        return res.json(JSON.parse(cacheData));
      }
      console.log('Redis cache going to hit  ');
      next();
    } catch (error) {
      console.error(error);
      next();
    }
  };
}

export default RedisNote;
