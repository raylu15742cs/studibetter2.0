import express , {Request, Response} from "express";
import mongoose from "mongoose";

const app = express()

const db = mongoose.connect(`mongodb+srv://admin:${process.env.DB_Password}@cluster0.titas9x.mongodb.net/?retryWrites=true&w=majority`)

app.get("/", (req: Request ,res: Response) => {
    res.send("hello world")
})

app.listen(3000);