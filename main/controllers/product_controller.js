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

