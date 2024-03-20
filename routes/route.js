import express from "express";
import { userSignup, userLogin } from "../controller/user-controller.js";
import { getProducts ,getProductById} from "../controller/product-controller.js";
import { checkout, paymentVerification } from "../controller/paymentController.js";


const router = express.Router() ;

router.post('/signup', userSignup) ;

// for login
router.post('/login', userLogin) ; 

// to get product from redux 
router.get('/products', getProducts) ;
router.get('/product/:id', getProductById) ;

//razor pay
router.post('/checkout', checkout) ;
router.post('/paymentverification',paymentVerification);
router.get('/getkey', (req,resp) => {
    resp.status(200).json({key: process.env.RAZORPAY_API_KEY})
})

export default router ;