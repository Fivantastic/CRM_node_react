import { selectUserSearchModel } from "../../models/user/selectUserSearchModel.js";


export const getUserSearchService = async (search) => {
    // Buscamos en la base de datos el usuario.

    console.log(search);
    const user = await selectUserSearchModel(search);

    return user;
}