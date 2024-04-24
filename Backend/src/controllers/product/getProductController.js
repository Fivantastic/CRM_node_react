import { selectProductById } from "../../models/products/selectProductById.js";

export const getProductController = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await selectProductById(productId);

        res.status(200).send({
            status: 'ok',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};