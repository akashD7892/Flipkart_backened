import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    url: String,
    detailUrl: String, // Fixed typo in property name
    title: Object, // Assuming title is a string, change to the appropriate type if needed
    price: Object, // Assuming price is a number, change to the appropriate type if needed
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
});

const Product = mongoose.model('products', productSchema); // Changed the model name to 'Product'

export default Product; // Export the model, not the schema
