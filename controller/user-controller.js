import User from "../model/user-schema.js";

export const userSignup = async( req, resp) => {
    try { 

        const exist = await User.findOne({ username: req.body.username }) ; 
        if( exist ) {
            console.log( "user exist ")
           return resp.status(401).json({message:'Username already exist'}) ;
        } 

        const user = req.body ;
        const newUser = new User( user ) ; 
        await newUser.save() ;
        console.log("Sucees")

        resp.status(200).json({ message:user }) ;
    } catch (error) {
        console.log(error) ;
        resp.status(500).json({message:error.message});
    }
}

export const userLogin = async( req, resp) => {
    try {
      const username = req.body.username ;
      const password = req.body.password ;

      let user = await User.findOne( {username:username, password:password}) ;
      if( user ) {
        console.log("Done")
        return resp.status(200).json(`${ req.body.username} login succesful`) ;
      } else {
        console.log("wrong credentials")
        return resp.status(401).json('Invalid login')
      }

    }catch( error ) {
      console.log('Error')
      resp.status(500).json('Error') ;
    }
}