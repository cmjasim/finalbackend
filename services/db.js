const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Consulting",{
    useNewUrlParser:true
})

const Detail=mongoose.model('Detail',{
    userid:String,
    username:String,
    password:String,
    view:[]
})
const Opticket=mongoose.model('Opticket',{
    
    userid:String,
    name:String,
    age:String,
    address:String,
    phone:Number,
    doctor:String,
    date:Date,
    view:[]

})

const Slote=mongoose.model('Slote',{
    userid:String,
    name:String,
    age:String,
    hospital:String,
    date:Date,
    vacc:String
   
})

module.exports={
    Detail,
    Opticket,
    Slote
    
}
