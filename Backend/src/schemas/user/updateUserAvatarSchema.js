import joi from 'joi';
import { imgSchema } from '../error/imgSchema.js';

export const updateUserAvatarSchema = joi.object({
  avatar: imgSchema.required(),
});
