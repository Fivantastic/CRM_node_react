// Imports usuarios
import { changePasswordController } from './users/changePasswordController.js';
import { forgotPasswordController } from './users/forgotPasswordController.js';
import { loginUserController } from './users/loginUserControllers.js';
import { logoutUserController } from './users/logoutUserController.js';
import { newUserController } from './users/newUserController.js';
import { resetPasswordController } from './users/resetPasswordController.js';
import { toggleActiveStatusController } from './users/toggleActiveStatusController.js';
import { updateUserController } from './users/updateUserController.js';
import { validateUserController } from './users/validateUserControllers.js';
import { renewTokenController } from './users/renewTokenController.js';
import { deleteUserController } from './users/deleteUserController.js';
import { getUserListController } from './users/getUserListController.js';
import { getUserSearchController } from './users/getUserSearchController.js';
import { getProfileUserController } from './users/getProfileUserController.js';

// Imports Productos
import { deleteProductController } from './product/deleteProductController.js';
import { getProductController } from './product/getProductController.js';
import { newProductController } from './product/newProductController.js';
import { productListController } from './product/productListController.js';
import { updateProductController } from './product/updateProductController.js';
import { selectSaleProductController } from './product/selectSaleProductController.js';
import { toggleActiveProductStatusController } from './product/toggleActiveProductStatusController.js';

// Imports Customers
import { getCustomerListController } from './customer/getCustomerController.js';
import { newCustomerController } from './customer/newCustomerController.js';
import { updateCustomerController } from './customer/updateCustomerController.js';
import { deleteCustomerController } from './customer/deleteCustomerController.js';
import { getCustomerSearchController } from './customer/getCustomerSearchController.js';
import {toggleActiveCustomerStatusController } from './customer/toggleActiveCustomerStatusController.js';

export {
  changePasswordController,
  forgotPasswordController,
  loginUserController,
  logoutUserController,
  newUserController,
  resetPasswordController,
  toggleActiveStatusController,
  updateUserController,
  validateUserController,
  renewTokenController,
  deleteUserController,
  getUserListController,
  getUserSearchController,
  getProfileUserController,

  deleteProductController,
  getProductController,
  newProductController,
  productListController,
  updateProductController,
  selectSaleProductController,
  toggleActiveProductStatusController,
  
  getCustomerListController,
  newCustomerController,
  updateCustomerController,
  deleteCustomerController,
  getCustomerSearchController,
  toggleActiveCustomerStatusController
};
