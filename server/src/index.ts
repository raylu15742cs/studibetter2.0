import express , {Request, Response} from "express";
import mongoose from "mongoose";

const app = express()



app.get("/", (req: Request ,res: Response) => {
    res.send("hello world")
})

app.listen(3000);