const ProductService = require('../services/product_service');

class ProductController {

    static async get_all(req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    static async get_by_id(req, res, next) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const updatedProduct = await ProductService.updateProduct(
                req.params.id,
                req.body
            );
            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.json({ message: 'Product deleted' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;