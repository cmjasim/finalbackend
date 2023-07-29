const express=require ("express")
const jwt=require ("jsonwebtoken")
const cors=require ("cors")
const dataservice = require("./services/data.service")
const app= express()

app.use(cors({
    origin:"http://localhost:4200"
}))

app.use(express.json())




//Login API
app.post('/log',(req,res)=>{
    console.log("log hitt")
    const result=dataservice.login(req.body.userid,req.body.password)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

//REGISTER API
app.post('/reg',(req,res)=>{
    console.log("log hitt")
    const result=dataservice.register(req.body.userid,req.body.username,req.body.password)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.post('/frontp',(req,res)=>{
   
    const result=dataservice.opticket(req.body.userid,req.body.name,req.body.age,req.body.address,req.body.phone,req.body.date,req.body.doctor)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})


//view/add
app.post('/viewbook',(req,res)=>{
    const result=dataservice.getopticket(req.body.userid)
    console.log(req.body.userid)
    
    result.then((resobj)=>{
        console.log(resobj)
       
        res.status(resobj.statusCode).send(resobj)
        
    })
});

//vaccine slote
app.post('/slote',(req,res)=>{
    console.log(req.body)
    const result=dataservice.slote(req.body.userid,req.body.name,req.body.age,req.body.hospital,req.body.date,req.body.vacc)
    // console.log(req.body.userid)
    result.then((resobj)=>{
        // console.log(resobj)
        res.status(resobj.statusCode).send(resobj)
        // console.log(result,)
    })
})

//delete op
app.post('/delslote',(req,res)=>{
    const result=dataservice.delslote(req.body.userid)
    result.then(resobj=>{
    res.status(resobj.statusCode).send(resobj)

    })
})


// <---------------view vaccine slote--------------->

app.post('/viewvacc',(req,res)=>{
    const result=dataservice.getvacc(req.body.userid)
    console.log(req.body.userid)
    result.then((resobj)=>{
        console.log(resobj)
        res.status(resobj.statusCode).send(resobj)
        console.log(result)
    })
})

// delete op
app.post('/delop',(req,res)=>{
    const result=dataservice.delop(req.body.userid)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})


app.listen(3000,()=>{
    console.log("server running on port 3000")
})



// 
// 