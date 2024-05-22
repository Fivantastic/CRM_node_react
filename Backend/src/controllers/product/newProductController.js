import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { newProductSchema } from "../../schemas/product/newProductSchema.js";
import { insertProductService } from "../../services/product/insertProductService.js"

export const newProductController = async (req, res, next) => {
    try {
        // Obtenemos el cuerpo de los productos
        const { name, description, price, stock, active } = req.body;

        //validamos el body
        await validateSchemaUtil(newProductSchema, req.body);

        // Insertamos el producto en la base de datos
        await insertProductService(name, description, price, stock, active);
        
        // Respuesta al Admin
        res.status(201).send({
            status: 'ok',
            message: 'El Producto ha sido creado.',
        });
    } catch (error) { 
        console.log(error.code);
        console.log(error.message);
        next(error);
    }
};