import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { newProductSchema } from "../../schemas/newProductSchema.js";
import { insertProductService } from "../../services/insertProductService.js"

export const newProductControllers = async (req, res, next) => {
    try {
        // Obtenemos el cuerpo de los productos
        const { name, description, price, stock, product_status } = req.body;

        //validamos el body
        await validateSchemaUtil(newProductSchema, req.body);

        // Insertamos el producto en la base de datos
        await insertProductService(name, description, price, stock, product_status);
        
        // Respuesta al Admin
        res.status(201).send({
            status: 'ok',
            message: 'The product has been added correctly'
        });
    } catch (error) {
        next(error);
    }
};