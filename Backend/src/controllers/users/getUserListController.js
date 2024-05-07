import { getUserListModal } from "../../models/user/getUserListModal.js";


export const getUserListController = async (req, res, next) => {
    try {
        const usersList = await getUserListModal();

        res.status(200).send({
            status: 'ok',
            data: usersList,
        });
    } catch (error) {
        next(error);
    }
}