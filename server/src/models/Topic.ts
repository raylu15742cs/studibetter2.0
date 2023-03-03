import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const TopicSchema = new Schema({
    title: {type: String, minLength: 1, maxLength: 100 },
    username: {type:String}
})

const TopicModel = mongoose.model("Topic", TopicSchema)

export default TopicModel;