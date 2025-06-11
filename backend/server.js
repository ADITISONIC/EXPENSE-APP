import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js"

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
async function initDB(){
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("databse connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

app.get("/",(req,res)=>{
    res.send("Its working")
})

app.get("/api/transactions/:userId",async(req,res)=>{
    try {
        const {userId} = req.params
        const transation = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `
        res.status(200).json(transation)
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error gettinf transactions",
        });
    }
})

app.post("/api/transactions",async (req,res)=>{
    try {
       const {title,amount,category,user_id} = req.body
       if(!title||amount===undefined||!category||!user_id){
        return res.status(400).json({
            message:"All fields are required"
        })
       }
       const transaction = await sql`
        INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `;
       res.status(200).json(transaction[0]);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

app.delete("/api/transactions/:id",(req,res)=>{
    try {
        const {id} = req.params
        const 
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error deleting the transaction",
        });
    }
})

initDB().then(()=>{
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
})