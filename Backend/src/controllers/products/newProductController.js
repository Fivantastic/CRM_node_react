import { validateSchemaUtil } from "../../utils/validateSchemaUtil";
import { newProductSchema } from "../../schemas/newProductSchema";

export const newProductControllers = async (req, res, next) => {
    try {
        // Obtenemos el cuerpo de los productos
        const { name, description, price, stock, product_status, role, creation_at, update_at } = req.body;

        //validamos el body
        await validateSchemaUtil(newProductSchema, req.body);

        // Insertamos el producto en la base de datos
        await insertProductService(name, description, price, stock, product_status, role, creation_at, update_at);
        
        // Respuesta al Admin
        res.status(201).send({
            status: 'ok',
            message: 'The product has been added correctly'
        });
    } catch (error) {
        next(error);
    }
};