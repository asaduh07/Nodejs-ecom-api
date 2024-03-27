import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, desc, price, imageUrl,  sizes,category,id) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.sizes = sizes;
    this._id = id;

  }
  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      
      return (product.price >= minPrice && product.price <= maxPrice && product.category == category);
    });
    return result;
  }


  static get(id) {
    const product = products.find(p => p.id == id);
    return product;
  }
  static GetAll() {
    return products;
  }
  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }
  static rateProduct(userId, productId, rating) {
    //1.validate userand product
    const user = UserModel.getAll().find(u => u.id == userId);
    if (!user) {
      //user defined errors
      throw new ApplicationError('User not found', 404);
    }

    //validate product
    const product = products.find(p => p.id == productId)
    if (!product) {
      throw new ApplicationError('Product not found',400);
      
    }
    

      //2. check if there are any ratings(ratings array), if not add ratings array
      if (!product.ratings) {
        product.ratings = [];
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      } else {
        //3.check if this user has already given rating to this product
        const existingRatingIndex = product.ratings.findIndex(r => r.userId == userId);
        if (existingRatingIndex >= 0) {
          product.ratings[existingRatingIndex] = {
            userId: userId,
            rating: rating,
          };
        } else {
          //4.if no existing rating, then add new rating
          product.ratings.push({
            userId: userId,
            rating: rating,
          });
        }
      }
      
         
      
  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'category 1',
    []
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'category 2',
    ['M', 'S']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'category 3',
    ['M', 'S', 'L']
  ),
]