import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: number };

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
       req.userId = user.dataValues.id;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized', details: (error as Error).message });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export default authMiddleware;
