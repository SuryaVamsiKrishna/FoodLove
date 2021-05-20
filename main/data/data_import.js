import { prodData } from './prod_data.js';
import Product from '../models/product_model.js';
import mongoose from 'mongoose';

const mongo_URI = 'mongodb+srv://uday:uday@foodlove.vdwnv.mongodb.net/FoodLove?retryWrites=true&w=majority';

mongoose.connect(mongo_URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log(`mongo connection successful`))
    .catch((error)=> console.log(error));
mongoose.set('useFindAndModify',false);

const dataImport = async() => {
    try{
        await Product.deleteMany({});
        await Product.insertMany(prodData);
        console.log("Successfully imported")

        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

dataImport();
