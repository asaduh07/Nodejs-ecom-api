import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);

        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }

    }
    async addProduct(req, res) {
        try {
            const { name, desc, price, categories, sizes } = req.body;
            const newProduct = new ProductModel(
                name,
                desc,
                parseFloat(price),
                req?.file?.filename,
                sizes?.split(','),
                categories
            )
            const result = await this.productRepository.add(newProduct);
            res.status(201).send(result);

        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }


    }
   async rateProduct(req, res, next) {
        console.log(req.query);
        try {

            const userId = req.userId;
            const productId = req.body.productId;
            const rating = req.body.rating;
           await this.productRepository.rate(userId, productId, rating);
            return res.status(200).send("Rating has been added");

        } catch (err) {
            console.log("Passing error to middleware");
            next(err);
        }

    };

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send("product not found")
            } else {
                return res.status(200).send(product);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }


    }
    async filterProducts(req, res) {
        try {
            const minPrice = req.query.minPrice;
            // const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(
                minPrice, category);

            res.status(200).send(result);

        }catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }

    }

    async averagePrice(req,res,next){
        try{
           const result= await this.productRepository.averagePricePerCategory();
           res.status(200).send(result);


        }catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }


};
