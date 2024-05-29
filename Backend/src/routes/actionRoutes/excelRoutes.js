import express from 'express';
import { exportDataToExcelController } from '../../controllers/actionControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';

export const excelRouter = express.Router();

excelRouter.post('/excel/export', authenticateUser, exportDataToExcelController);