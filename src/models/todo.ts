import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

export const Todos = mongoose.model('Todo',todoSchema)