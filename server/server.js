import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from './routes/imageRoute.js';

const PORT = process.env.PORT || 4000

const app = express()

await connectDb()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Api working!")
})

//user routes
app.use("/api/user", userRouter)

//image Router
app.use("/api/image", imageRouter)

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
});