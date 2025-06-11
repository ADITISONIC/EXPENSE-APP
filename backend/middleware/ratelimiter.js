import ratelimit from "../config/upstash";

const ratelimiter = async (req,res,next)=>{
    try {
        const success =  ratelimit.limit("my-rate-limit")
        if(!success){
            res.status(429).json({
                message:"To many request. Try again later"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default ratelimiter