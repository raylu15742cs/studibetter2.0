import mongoose from "mongoose";

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const CardSchema = new Schema ({
    title: String,
    definition: String,
    status: {type: Number, default: 0},
    topic: [{type: ObjectId}]
})