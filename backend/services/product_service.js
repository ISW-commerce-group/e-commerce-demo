const ProductModel = require('../models/product.model');

class ProductService {

    static async getAllProducts() {
        return ProductModel.getAllProducts();
    }

    static async getProductById(id) {
        const product = await ProductModel.getProductById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    static async createProduct(data) {
        // regla de negocio
        if (data.stock === 0) {
            throw new Error('Cannot create product with zero stock');
        }

        return ProductModel.createProduct(data);
    }

    static async updateProduct(id, data) {
        const existing = await ProductModel.getProductById(id);

        if (!existing) {
            throw new Error('Product not found');
        }

        if (data.price && data.price < 1) {
            throw new Error('Price must be greater than 0');
        }

        return ProductModel.updateProduct(id, data);
    }

    static async deleteProduct(id) {
        const existing = await ProductModel.getProductById(id);

        if (!existing) {
            throw new Error('Product not found');
        }

        return ProductModel.deleteProduct(id);
    }

    static async reduceStock(productId, quantity) {
        const product = await ProductModel.getProductById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        return ProductModel.updateProduct(productId, {
            stock: product.stock - quantity
        });
    }
}

module.exports = ProductService;