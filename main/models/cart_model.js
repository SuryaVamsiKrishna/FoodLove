import mongoose from 'mongoose';
const CartSchema = mongoose.Schema({
    user_det:{
        type: String,
        default: 0,
    },
    items : [{
        product:{
            name: String,
            description: String,
            price: {
                type: Number,
                default: 0
            },
            imageUrl: String,
            category: String,
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],

});


CartSchema.methods.TotalPrice = function () {
    var sum = 0;
    for (var i=0; i<this.items.length;i++){
        sum = sum + this.items[i].product.price*this.items[i].quantity;
    }
    return sum;
}

CartSchema.methods.Quantity = function () {
    var sum = 0;
    for (var i=0; i<this.items.length;i++){
        sum = sum + this.items[i].quantity;
    }
    return sum;
}

CartSchema.methods.itemPrice = function (p_name) {
    var price = 0;
    var idx,flag =0;
    for (var i=0; i<this.items.length;i++){
        if(this.items[i].product.name == p_name){
            flag = 1;
            idx = i;
            break;
        }
    }
    if (flag==0){
        console.log("No product with that name");
    }
    else{
        price = this.items[idx].product.price*this.items[idx].quantity;
    }
    return price;
}
const Cart = mongoose.model('Cart', CartSchema);


export default Cart;
