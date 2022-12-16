import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const TopicSchema = new Schema({
    title: String,
    cards: [String]
})

const TopicModel = mongoose.model("Topic", TopicSchema)

export default TopicModel;