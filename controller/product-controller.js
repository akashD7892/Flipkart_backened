import Product from '../model/product-schema.js';// Assuming your model is named "Product"

export const getProducts = async (req, res) => {
    try {
        let products = await Product.find({}); // Use the correct model name
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, resp) => {
    try {

       const id = req.params.id ;
       const product = await Product.findOne( {'id':id})
       resp.status(200).json(product) ;

    } catch (error) {
       resp.status(500).json( {message : error.message} )
    }

}