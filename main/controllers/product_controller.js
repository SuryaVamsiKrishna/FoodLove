import Product from '../models/product_model.js';
import Cart from '../models/Cart_model.js';
import { json } from 'express';

export const getProducts = async(req, res) => {
    console.log('request received')
    try{
        const products = await Product.find({});
        //console.log(products);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getProductById = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log("Prod-Details"+product);
        res.json(product);
    }
    catch(error){
        console.log(error);
    }
};

export const addCart = async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        //console.log(req.body.name);
        var cart = await Cart.findOne({user_det: req.body.name});
        
        //cart = JSON.parse(JSON.stringify(cart));
        if (cart){
            //console.log(cart.length);
            //console.log(cart.items);
            //console.log(req.body.quantity);
            var flag = 0;
            var idx = 0;
            const item = { "product": product, "quantity": req.body.quantity}
            for( var i=0;i<cart.items.length;i++){
                if(cart.items[i].product.name == product.name){
                    flag = 1;
                    idx = i;
                }
            }
            if (flag == 1){
                cart.items[idx].quantity = cart.items[idx].quantity+req.body.quantity;
            }
            else{
                cart.items.push(item);
            }
            
            cart.save();
        } 
        else{
            cart = await Cart.create({user_det: req.body.name,items:[]});
            const item = { "product": product, "quantity": req.body.quantity}
            cart['items'].push(item);
            //console.log("no cart"+ cart);
            cart.save();
        }
        //const cart = new Cart ({
            //items: arr,
        //});
        console.log(cart.TotalPrice());
        console.log(cart.itemPrice("Diamond CBD MCT Oil"));
        res.json({cart_obj: cart, TotalPrice: cart.TotalPrice(),quantity: cart.Quantity() });
    }
    catch(error){
        console.log(error);
    }
};

