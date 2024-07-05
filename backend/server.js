import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import collection from './mongo.js'
import eventRoute from './routes/eventRoute.js';


const app = express();
const port = 4000;

app.use(cors());

app.use(json());

// Connect to MongoDB
connect('mongodb+srv://dileepkumar30827:Mulagada%233@cluster0.th8hl8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) =>
        console.error('Failed to connect to MongoDB', error));

app.use('/events', eventRoute);

app.post("/",async(req,res)=>{
    console.log("working")
    const{email,password}=req.body
    
    try{
        const check=await collection.findOne({email:email,password:password})
        
        if(check){
            console.log("a")
            res.json("exist")
        }
        else{
            console.log("b")
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
