const db = require('../db');

class ProductModel {
    static async getAllProducts() {
        return db('products').select('*');
    }

    static async getProductById(id) {
        return db('products').where({ id }).select('*').first();
    }

    static async getProductByName(name) {
        return db('products').where({ name }).select('*').first();
    }

    static async getProductByCategory(categoryId) {
        return db('products').where({ category_id: categoryId }).select('*');
    }

    static async createProduct(product) {
        return db('products').insert({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category_id,
            stock: product.stock
        });
        return this.findById(id);
    }

    static async updateProduct(id, product) {
        const updateData = {};
        if (product.name !== undefined) updateData.name = product.name;
        if (product.description !== undefined) updateData.description = product.description;
        if (product.price !== undefined) updateData.price = product.price;
        if (product.category_id !== undefined) updateData.category = product.category_id;
        if (product.stock !== undefined) updateData.stock = product.stock;
        
        const affectedRows = await db('products').where({ id }).update(updateData);
        if (affectedRows === 0) {
            throw new Error('Product not found');
        }
        return this.getProductById(id);
        return affectedRows > 0;
    }

    static async deleteProduct(id) {
        const affectedRows = await db('products').where({ id }).del();
        return affectedRows > 0;
    }

}

module.exports = ProductModel;