const fs=require("fs");
const http=require("http");
const PORT=5544;
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<html><body><h2> assignment created </h2></body> </html>');
        res.end()
    }
    else if(req.url=="/createfile"){
        if(fs.existsSync("assign.txt")){
            res.end('<html><body><h2>This  file  already exists (-_-)</h2></body></html>');
        }
        else{
            fs.writeFile('assign.txt',"<html><body><h2>Welcome  </h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dicta sint, illo distinctio inventore tempore aliquam quia architecto corrupti laboriosam nesciunt ducimus, nihil eius accusantium? Unde blanditiis sequi odit laborum.</p> </body> </html>",(err)=>{
                if(err) throw err
                else res.end('<html><body><h1>Code is working properly !</h1><h2>Your file has been created! </h2> </body> </html>');
            })
        }
    }
    else if(req.url=="/readfile"){
        if(fs.existsSync("assign.txt")){
            let data=fs.readFileSync("assign.txt");
            res.end(data.toString());
        }
        else{
            //res.end("File Is Not Exists");
        res.write('<html><body><h2>File does not exists</h2></body></html>');
        res.end()
        }

    }
    else if(req.url=="/readhtmlfile"){
        if(fs.existsSync("hyper.html")){
            let data=fs.readFileSync("hyper.html");
            res.end(data.toString());
        }
        else{
            res.end('<html><body><h2>Oops....File Is Not Exists</h2></body></html>');
        }

    }
    else if (req.url === "/appendfile") {
        if(fs.existsSync("assign.txt")){
            fs.appendFile("assign.txt", "And The File Is Updated...!!!", (err) => {
                if (err) throw err;
                else res.end('<html><body><h2>Good...Your data is sucessfully updated !</h2></body></html>') 
            })
        }
        else{
            res.end('<html><body><h2>File Is Not Exists</h2></body></html>');
        }

    }  
    else if (req.url === "/appendhtmlfile") {
        if(fs.existsSync("hyper.html")){
            fs.appendFile("hyper.html", '<h2><a href="./assign.txt">Created assignment file link</a>', (err)=>{
                if (err) throw err;
                else res.end('<html><body><h2>And the file is peacefully updated !</h2></body></html>') 
            })
        }
        else{
            res.end('<html><body><h2>File Is Not Exists</h2></body></html>');
        }

    }   
    else if(req.url=="/deletefile"){
        if(fs.existsSync("assign.txt")){
            fs.unlink("assign.txt",(err)=>{
                if(err) throw err
                else res.end('<html><body><h1>Well done...</h1><h2>your file has been successfully deleted !</h2></body></html>')
            })
        }
        else{
            res.end('<html><body><h2>Oops...File Is Not Exists anymore!</h2></body></html>');
        }
    }
    else{
        res.end('<html><body><h2>Oh noo you typed (-_-) Invalid URL</h2></body></html>')
        }
    })
    server.listen(PORT,()=>{
        console.log(`Server work on port ${PORT}`)
    })
