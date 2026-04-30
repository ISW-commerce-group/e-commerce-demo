const db = require('../db');

class ProductModel {

    static baseQuery() {
        return db('products').select(
            'id',
            'name',
            'description',
            'price',
            'category_id',
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
        return this.baseQuery().where({ name }).first();
    }

    static async getProductsByCategory(categoryId) {
        return this.baseQuery().where({ category_id: categoryId });
    }

    static validateProduct(product, isUpdate = false) {
        if (!isUpdate) {
            if (!product.name) throw new Error('Name is required');
            if (product.price == null) throw new Error('Price is required');
        }

        if (product.price !== undefined && product.price < 0) {
            throw new Error('Price cannot be negative');
        }

        if (product.stock !== undefined && product.stock < 0) {
            throw new Error('Stock cannot be negative');
        }
    }

    static async createProduct(product) {
        this.validateProduct(product);

        const [id] = await db('products').insert({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product.category_id,
            stock: product.stock
        });

        return this.getProductById(id);
    }

    static async updateProduct(id, product) {
        this.validateProduct(product, true);

        const updateData = {};

        if (product.name !== undefined) updateData.name = product.name;
        if (product.description !== undefined) updateData.description = product.description;
        if (product.price !== undefined) updateData.price = product.price;
        if (product.category_id !== undefined) updateData.category_id = product.category_id;
        if (product.stock !== undefined) updateData.stock = product.stock;

        const affectedRows = await db('products')
            .where({ id })
            .update(updateData);

        if (!affectedRows) {
            throw new Error('Product not found');
        }

        return this.getProductById(id);
    }

    static async deleteProduct(id) {
        const affectedRows = await db('products')
            .where({ id })
            .del();

        if (!affectedRows) {
            throw new Error('Product not found');
        }

        return true;
    }
}

module.exports = ProductModel;