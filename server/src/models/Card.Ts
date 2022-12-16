import mongoose from "mongoose";

const Schema = mongoose.Schema

const CardSchema = new Schema ({
    title: String,
    definition: String,
    status: {type: Number, default: 0},
})