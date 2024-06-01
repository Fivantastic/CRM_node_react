import { selectUserSearchModel } from "../../models/user/selectUserSearchModel.js";

export const getUserSearchService = async (search) => {
    try {
        // Buscamos en la base de datos el usuario.
        const user = await selectUserSearchModel(search);
    
        return user;
        
    } catch (error) {
        throw {
            statusCode: 500,
            code: 'GET_USER_LIST_SERVICE_ERROR',
            message: 'Error al obtener la lista de busquedas de usuarios desde el servicio',
          };
    }
}