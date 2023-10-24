import mongoose from "mongoose";


export const Connection = async( URL ) => {
    
    try { 

       await mongoose.connect( URL, { useUnifiedTopology:true, useNewUrlParser:true})
       console.log('Database connected succesfully')
      //  console.log( username, password) ; 

    } catch (error) {

       console.log("Error while connecting with the database", error ); 
       
    }

}

export default Connection;