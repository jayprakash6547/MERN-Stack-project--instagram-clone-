const express =require("express");
const app = express();
const PORT = 5000


const customMiddleWare = (req,res,next)=>{
    console.log("middleWare executed!");
    next();
}

app.use(customMiddleWare)


app.get('/',(req,res)=>{
    console.log("home");
    res.send("hello world");
})
app.get('/about',(req,res)=>{
    console.log("about");
    res.send("about page");
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})