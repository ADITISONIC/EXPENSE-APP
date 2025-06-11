import express from "express"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.get("/",(req,res)=>{
    res.send("Its working")
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})