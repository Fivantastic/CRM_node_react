import { insertOrUpdateVisitModel } from "../models/ModulesService/visits/insertOrUpdateVisitModel.js";


export const updateVisitService = async (userId, visitId, id_customer, visit_date, observations) => {
    await insertOrUpdateVisitModel(visitId, userId, id_customer, visit_date, observations);



}