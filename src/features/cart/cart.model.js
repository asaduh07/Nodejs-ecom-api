
//productid,userid,quantity,
export default class CartModel{
    constructor(productId,userId,quantity,id){
        this.productId=productId;
        this.userId=userId;
        this.quantity=quantity;
        this._id=id;
    }

    // static add(productId,userId,quantity){
    //     const cartItem=new CartModel(productId,userId,quantity)
    //     cartItem.id=cartItems.length+1;
    //     console.log(cartItem);
    //     cartItems.push(cartItem);
    //     return cartItem;
    // }
    static get(userId){
        return cartItems.filter(i=>i.userId==userId);
    }
    static delete(cartItemId,userId){
        const cartItemIndex=cartItems.findIndex(i=>i.id==cartItemId && i.userId==userId);
        if(cartItemIndex==-1){
            return "Item not found"
        }else{
           cartItems.splice(cartItemIndex,1);
        }

    }

}

var cartItems=[
    new CartModel(1,2,1,1),
    new CartModel(1,1,2,2)
]