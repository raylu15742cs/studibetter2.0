import mongoose from "mongoose";

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const CardSchema = new Schema ({
    title: String,
    definition: String,
    status: {type: Number, default: 0, min: 0 , max: 4},
    topic: {type: ObjectId}
})

const CardModel = mongoose.model("Card", CardSchema)
export default CardModel;