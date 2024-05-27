import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";


export const getProfileUserController = async (req, res, next) => {
    try {
        const id_user = req.user.id_user;
        const user = await selectUserByIdModel(id_user);

        res.status(200).send({
            status: 'ok',
            data: user
        });
    } catch (error) {
        next(error);
    }
}
