const jwt=require("jsonwebtoken")
const db=require("./db")

const moment =require("moment")
const transactionTime = new Date();
const formattedTransactionTime = moment(transactionTime).format('YYYY-MM-DD HH:mm:ss');

details={
    1000:{userid:"jsm100",username:"jasim",password:"jasim123"},
    1000:{userid:"vshn101",username:"vishnu",password:"vishnu123"}
}
optickets={
    a:{userid:"jsm100",username:"jasim",hname:"anil",address:"calicut",}
}


const login=(userid,password)=>{
    console.log(userid)
    return db.Detail.findOne({
        userid,
        password
    }).then(res=>{
        console.log(res+'from login server')
        if(res){
            console.log(res+"from if res login")
            currentUsername=res.username
            currentUserid= userid
            token=jwt.sign(
                {currentUsername:userid},"secretsuperkey123"
            )
            // console.log(token)
            return{
                status:true,
                message:"Login successfull",
                statusCode:200,
                currentUserid,
                currentUsername,
                token,
                
            }
        }
        else{
            return{
                status:false,
                message:"Invalid username or password",
                statusCode:400
            }
        }
    })
}


const register=(userid,username,password)=>{
    return db.Detail.findOne({
        userid,
        // username,
        // password
    })
     .then((res)=>{
        // console.log(res)
        if(res){
            return {
                status:false,
                message:"account already exist.....",
                statusCode:404
            }
        }
      else{
        console.log("heelo")
        let ticket=db.Detail({
            userid,
            username,
            password,
            view:[]

        })
        ticket.save()
        return{
            status:true,
            message:"registration succesfull",
            statusCode:201
        }
    }
     })
}


//add op
const opticket=(userid,name,age,address,phone,date,doctor)=>{
    return db.Detail.findOne({
        userid,

    }).then((res)=>{
        if(res){
            console.log("op reg",res)
            let opt= {
                userid,
                name,
                age,
                address,
                phone,
                date,
                "time":formattedTransactionTime,
                doctor,
                

            }
            res.view.push(opt)
        res.save()
     
            return{
                status:true,

                message:"your op confirmed",
                statusCode:201
            }
        }
        else{
            return{
               status:false,
               message:"invalid data",
               statusCode:404
            }
        }
    })

}



const getopticket=(currentusid)=>{
    return db.Detail.findOne({
        userid:currentusid
    }).then(res=>{
        console.log(res+"jas")
        if(res){
           
            return{
                status:true,                                                        
                message:"success",
                data:res.view,
                statusCode:200
            }
            
        }
        else{
            return{
                status:false,
                message:"false",
                
                statusCode:404
            }
        }
    })
}

//delete op

const delop=(userid,username)=>{
    return db.Detail.findOne({
         userid
    }).then((res)=>{
        if(res){
            res.view=[]
            res.save()
            return{
                status:true,
                message:"OP-TICKET Successfully Deleted!!!!!!",
                statusCode:200
            }
        }
        else{
            return{
                status:false,
                message:"Can't Delete",
                statusCode:404
            }
        }
    })
}


//vaccine slote

const slote=(userid,name,age,hospital,date,vacc)=>{
    // console.log(vacc)
    return db.Slote.findOne({
        userid
    }).then((res)=>{

        if(res){
            return{
                status:false,
                message:"Slot already created for the user",
                statusCode:404
            }
        }
        else{
            let vac=db.Slote({
                userid,
                name,   
                age,
                hospital,
                date,
                vacc
            })
            vac.save()
            return{
                status:true,
                data:res,
                message:"slote conformed",
                statusCode:200
            }
        }
    })
}


// -----view vaccine slote-----

const getvacc=(userid)=>{
      return db.Slote.findOne({
        userid
      }).then(res=>{
        console.log(res,)
        if(res){
            return{
                status:true,
                message:"success",
                data:res,
                statusCode:200
            }
           
        }
        else{
            return{
               status:false,
               message:"user does not exist.....",
               statusCode:404
            }
        }
      })
}

//----------delete vaccine slote-----------

const delslote=(userid)=>{
    return db.Slote.deleteOne({
        userid
    }).then(res=>{
        if(res){
            // console.log(res)
            // res.slote=[]
            // res.save()
        return{
            status:true,
            message:"Slote Successfully Deleted!!!!!!",
            statusCode:200
        }
        }
        else{
            return{
                status:true,
                message:"Slote deletion failed",
                statusCode:404
            } 
        }
        
    })
}
    
        

module.exports={
    login,
    register,
    opticket,
    getopticket,
    slote,
    getvacc,
    delop,
    delslote
    
}





