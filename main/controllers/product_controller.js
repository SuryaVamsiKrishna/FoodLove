import Product from '../models/product_model.js';

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

