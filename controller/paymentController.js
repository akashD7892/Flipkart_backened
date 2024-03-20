import { instance } from "../server.js"
import crypto from 'crypto' ;
import { Payment } from "../model/payment-schema.js";

export const checkout = async(req,resp) => {
   
    const options = {
        amount: Number(req.body.amount * 100 ) ,
        currency:"INR" ,
    } ;

    const order = await instance.orders.create(options) ;
    console.log(order) ;
    resp.status(200).json({
        success:true,
        order
    }) ;
}

export const paymentVerification = async(req,resp) => {
     
    //console.log(req.body) ;
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body ; 

    //generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_API_SECRET);
    const body = razorpay_order_id + "|" + razorpay_payment_id ;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                       .update(body.toString())
                                       .digest('hex')

    // if( generated_signature === razorpay_signature ){
    //     console.log(generated_signature, razorpay_signature) ;
    //     resp.status(400).json({
    //                 success:false,
                   
    //     }) ;
    // }

    if (generated_signature == razorpay_signature) {
        //database
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        resp.redirect(
          `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        ) ;

    } else {
        resp.status(400).json({
            success:false,
           
        }) ;
    }
    
}