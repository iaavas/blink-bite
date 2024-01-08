import prisma from '../prisma/prisma-client';
import profileMapper from '../utils/profile.utils';
import HttpException from '../models/http-exception.model';
import { findUserIdByUsername } from './auth.service';

export const getProfile = async (usernamePayload: string, usernameAuth: string) => {

  
  const profile = await prisma.user.findUnique({
    where: {
      username: usernamePayload,
    },
    
  });

  if (!profile) {
    throw new HttpException(404, {});
  }

  return profileMapper(profile, usernameAuth);
};


