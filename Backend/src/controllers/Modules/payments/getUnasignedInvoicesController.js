import { getUnasignedInvoicesModel } from "../../../models/Modules/payments/getUnasignedInvoicesModel.js";


export const getUnasignedInvoicesController = async (req, res, next) => {
    try {
        const result = await getUnasignedInvoicesModel();

        res.status(200).send({
            status: 'ok',
            data: result,
          });
    } catch (error) {
        next(error);
    }
}