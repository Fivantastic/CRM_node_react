import express from 'express';
import { excelRouter } from './actionRoutes/excelRoutes.js';

export const actionRoutes = express.Router();

actionRoutes.use(excelRouter);