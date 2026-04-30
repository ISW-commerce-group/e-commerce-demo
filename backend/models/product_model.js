const db = require('../db');

class ProductModel {

    static baseQuery() {
        return db('productos').select(
            'id',
            'nombre',
            'descripcion',
            'precio',
            'categoria_id',
            'stock'
        );
    }

    static async getAllProducts() {
        return this.baseQuery();
    }

    static async getProductById(id) {
        return this.baseQuery().where({ id }).first();
    }

    static async getProductByName(name) {
        return this.baseQuery().where({ nombre }).first();
    }

    static async getProductsByCategory(categoryId) {
        return this.baseQuery().where({ categoria_id: categoryId });
    }

    static validateProduct(product, isUpdate = false) {
        if (!isUpdate) {
            if (!product.nombre) throw new Error('Name is required');
            if (product.precio == null) throw new Error('Price is required');
        }

        if (product.precio !== undefined && product.precio < 0) {
            throw new Error('Price cannot be negative');
        }

        if (product.stock !== undefined && product.stock < 0) {
            throw new Error('Stock cannot be negative');
        }
    }

    static async createProduct(product) {
        this.validateProduct(product);

        const [id] = await db('productos').insert({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            categoria_id: product.categoria_id,
            stock: product.stock
        });

        return this.getProductById(id);
    }

    static async updateProduct(id, product) {
        this.validateProduct(product, true);

        const updateData = {};

        if (product.nombre !== undefined) updateData.nombre = product.nombre;
        if (product.descripcion !== undefined) updateData.descripcion = product.descripcion;
        if (product.precio !== undefined) updateData.precio = product.precio;
        if (product.categoria_id !== undefined) updateData.categoria_id = product.categoria_id;
        if (product.stock !== undefined) updateData.stock = product.stock;

        const affectedRows = await db('productos')
            .where({ id })
            .update(updateData);

        if (!affectedRows) {
            throw new Error('Product not found');
        }

        return this.getProductById(id);
    }

    static async deleteProduct(id) {
        const affectedRows = await db('productos')
            .where({ id })
            .del();

        if (!affectedRows) {
            throw new Error('Product not found');
        }

        return true;
    }
}

module.exports = ProductModel;