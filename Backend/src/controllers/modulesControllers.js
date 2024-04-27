// Imports Modulos generales
import { getModuleController } from "./Modules/getModuleController.js";
import { searchModulesController } from "./Modules/searchModulesController.js";

// Imports visitas
import { closeVisitController } from "./Modules/Visits/closeVisitController.js";
import { deleteVisitController } from "./Modules/Visits/deleteVisitController.js";
import { feedbackVisitController } from "./Modules/Visits/feedbackVisitController.js";
import { getUserVisitsController } from "./Modules/Visits/getUserVisitsController.js";
import { newVisitController } from "./Modules/Visits/newVisitController.js";
import { updateVisitController } from "./Modules/Visits/updateVisitController.js";

// Imports ventas
import { insertSalesController } from "./Modules/sales/insertSalesController.js";

// Imports Albarán
import { createDeliveryNoteController } from "./Modules/deliveryNote/createDeliveryNoteController.js";
import { closeDeliveryNoteController } from "./Modules/deliveryNote/closeDeliveryNoteController.js";


// Exportar todos los controladores
export{
    getModuleController,
    searchModulesController,

    closeVisitController,
    deleteVisitController,
    feedbackVisitController,
    getUserVisitsController,
    newVisitController,
    updateVisitController,

    insertSalesController,
    
    createDeliveryNoteController,
    closeDeliveryNoteController
}