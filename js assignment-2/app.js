 const express=require('express');
// const pug=require("pug")
const PORT=9999;
const app=express();
const fs = require("fs");

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/static",express.static("public"));
 //define routes 
 app.get("/",(req,res)=>{
    res.render("first_view");
 })
//  app.get("/login",(req,res)=>{
//     res.render("login");
//  })
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
}) 
const postdata = (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.message;

    let userDetaills=name+","+email+","+message+"\n";
    if(fs.existsSync("users/contactDetails.txt"))
    {
        if(name=="" && email=="" && message ==""){
            res.send(`<script> alert('pls enter the details');  window.location.assign('/contact'); </script>`);
        }else{
                fs. appendFile("users/contactDetails.txt",`${userDetaills}`,(err)=>{
                    if (err) throw err
                     else   res.redirect("/contactDetails")
              });   
       }
    }
}
const contactDetails=(req, res) => {
    const data = fs.readFileSync('users/contactDetails.txt', 'UTF-8').split("\n");
    const result = data.map(ele=>{
        const d = ele.split(',');
        return {name:d[0],email:d[1], message:d[2]}
    })
                res.render("contactDetails",{result:result})
}
app.get("/service",(req,res)=>{
    res.render("service");
}) 
app.get("/gallery",(req,res)=>{
    res.render("gallery");
}) 
app.post("/postdata",postdata)

app.get('/contactDetails',contactDetails)  
app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server work on ${PORT}`)
})