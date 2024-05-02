import { getDBPool } from "../../db/getPool.js";

export const deleteProductModel = async(id_product) =>{
    const pool = await getDBPool();
    const [result] = await pool.query(
        `DELETE FROM Products
        WHERE id_product = ?;
        `,[id_product]
    );
    
    if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el producto.');
    error.code = 'DELETE_PRODUCTS_ERROR';
    throw error;
    }

    return { message: 'Producto eliminado correctamente' };
}