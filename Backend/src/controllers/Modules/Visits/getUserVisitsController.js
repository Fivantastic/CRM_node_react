import { selectUserVisitsByIdModel } from "../../../models/Modules/visits/selectUserVisitsByIdModel.js";

export const getUserVisitsController = async (req, res, next) => {
    try {
        //obtenemos el id_user del token
        const userId = req.user.id_user;

        const userVisits = await selectUserVisitsByIdModel(userId);

        res.status(200).send({
            status: 'ok',
            data: userVisits,
        });
    } catch (error) {
        next(error);
    }
}