import { connect, Schema, model } from "mongoose";
connect("mongodb+srv://dileepkumar30827:Mulagada%233@cluster0.th8hl8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = model("collection",newSchema)

export default collection
