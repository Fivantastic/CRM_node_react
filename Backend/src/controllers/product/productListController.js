import { selectProductListModel } from "../../models/products/selectProductListModel.js";


export const productListController = async (req, res, next) => {
    try {
      const listProducts = await selectProductListModel();
  
      res.status(200).send({
        status: 'ok',
        data: listProducts,
      });
    } catch (error) {
      next(error);
    }
  };
  