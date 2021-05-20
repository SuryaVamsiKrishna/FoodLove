import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: {
        type: Number,
        default: 0
    },
    imageUrl: String,
});

const Product = mongoose.model('products', ProductSchema);
export default Product;