// Imports usuarios
import { changePasswordController } from "./users/changePasswordController.js";
import { forgotPasswordController } from "./users/forgotPasswordController.js";
import { loginUserController } from "./users/loginUserControllers.js"
import { logoutUserController } from "./users/logoutUserController.js";
import { newUserController } from "./users/newUserController.js";
import { resetPasswordController } from "./users/resetPasswordController.js";
import { toggleActiveStatusController } from "./users/toggleActiveStatusController.js";
import { updateUserController } from "./users/updateUserController.js";
import { validateUserController } from "./users/validateUserControllers.js";
import { renewTokenController } from "./users/renewTokenController.js";
import { deleteUserController } from "./users/deleteUserController.js";

// Imports Productos
import { deleteProductController } from "./product/deleteProductController.js";
import { getProductController } from "./product/getProductController.js";
import { newProductController } from "./product/newProductController.js";
import { productListController } from "./product/productListController.js";
import { updateProductController } from "./product/updateProductController.js";
import { selectSaleProductController } from "./product/selectSaleProductController.js";

// Imports Customers
import { getCustomerListController } from "./customer/getCustomerController.js";
import { newCustomerController } from "./customer/newCustomerController.js";
import { updateCustomerController } from "./customer/updateCustomerController.js";

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

    deleteProductController,
    getProductController,
    newProductController,
    productListController,
    updateProductController,
    selectSaleProductController,
    
    getCustomerListController,
    newCustomerController,
    updateCustomerController
}




