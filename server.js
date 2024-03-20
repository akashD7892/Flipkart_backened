import express from "express";
import dotenv from 'dotenv' ;
import cors from 'cors'; 
import bodyParser from "body-parser";

import Connection from './Database/db.js'
import DefaultData from './default.js' 
import Router from './routes/route.js'

dotenv.config() ;
const app = express() ; 

app.use(cors()) ;
app.use(bodyParser.json({extended:true})) ;
app.use(bodyParser.urlencoded({extended:true})) ;
app.use('/',Router) ;

const PORT = process.env.PORT || 8000 ;
// const PORT =  8000 ;

const USERNAME = process.env.DB_USERNAME ;
const PASSWORD = process.env.DB_PASSWORD ; 

const URL =  process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wgdzjmo.mongodb.net/Flipkart_Clone?retryWrites=true&w=majority` ;
//const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wgdzjmo.mongodb.net/Flipkart_Clone?retryWrites=true&w=majority` ;

Connection( URL );

// if( process.env.NODE_ENV === 'production') {
//     app.use( express.static('client/build'))
// }

//razor pay integration
import Razorpay from "razorpay" ;

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
}) ;




app.listen( PORT, () => console.log("Server working"))

DefaultData() ;