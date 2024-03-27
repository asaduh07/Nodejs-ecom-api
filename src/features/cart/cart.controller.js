import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async add(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
      await this.cartRepository.add(productId, userId, quantity);
      res.status(201).send("Cart is Updated");

    } catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }

  }
  async get(req, res,next) {
    try{
      const userId = req.userId;
      const items = await this.cartRepository.get(userId);
      console.log(items);
      return res.status(200).send(items);

    }catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }
  }
  async delete(req, res) {
    const userId = req.userId;
    const cartItemId = req.params.id;
    const isDeleted = await this.cartRepository.delete(cartItemId, userId)
    if (!isDeleted) {
      return res.status(404).send("Item not found");
    } else {
      res.status(200).send("Cart item is removed")
    }
  }
}