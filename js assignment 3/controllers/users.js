const fs = require('fs');

const registration = (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let phone = req.body.phone;
    let city = req.body.city;
    // let role = req.body.role;
    var nameregex = /^[a-z A-Z]+$/;
    var emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
    var ageregex= /^[0-9]{2}$/;
    var cityregex = /^[a-z A-Z]+$/;
    let nameErr;
    let emailErr;
    let passErr;    
    let ageErr;
    let cityErr;
    if(nameregex.test(name) && emailregex.test(email) && passregex.test(pass) && ageregex.test(age) && cityregex.test(city)) {
        
    const getEmailRecord = fs.readFileSync('./users/record.txt').toString().split('\n');
    const getAllEmails = getEmails(getEmailRecord);

        if (emailExists(getAllEmails,email)){
            res.render('regis',{status:true,msg:'Sorry. Email Already Exists!!'})
        }
        else
        {
            console.log(email);
            let data = name +'|' + email + '|' + pass +'|'+ age +'|'+ phone +'|'+ city;
            fs.appendFile('./users/record.txt', data + '\n', err =>{
                if(err) throw err;
            })
            res.render('regis',{status: true,msg:'Registered Successfully!!'});
        }
    }
    else {
        if(!nameregex.test(name)) {
            nameErr = 'Only latter and white spaces allow ';
        }
        if(!emailregex.test(email)) {
            emailErr = 'Email address is not valid';
        }
        if(!passregex.test(pass)) {
            passErr = 'password between 8 to 24 characters which contain at least one  uppercase,lowercase'
        }
        if(!ageregex.test(age)) {
            ageErr = 'Only two digit number is allowed'
        }
        if(!cityregex.test(city)) {
            cityErr = 'Only latter and white spaces allow';
        }
        res.render('regis', { nameErr: nameErr, passErr: passErr, emailErr: emailErr, cityErr: cityErr, ageErr: ageErr })
    }
    

    // let {name, email, pass, age,phone,city} = req.body;
    // let data = `${name},${email},${pass},${age},${phone},${city}`;
    // if (name === '' || email === '' || pass === '' || city === '') {
    //     res.render('regis', { errMsg: "Fields are missing!" });
    // }
    // fs.appendFile('./users/record.txt', data + '\n', err => {
    //     if(err) throw err;
    // })
    // res.render("regis", {main:true, succMsg:"Registered Successfully"});
    
}

const login = (req, res) => {
    let email = req.body.email; 
    let pass = req.body.pass;
    const completeFileData = fs.readFileSync('./users/record.txt').toString().split('\n');
    const email_password = getEmailAndPassword(completeFileData);
    const value = checkEmailAndPassword(email_password,email,pass);
    if(value.status)
        {
            res.render("welcome");
        }
        res.render('login',{loginflag:true, msg: "Invalid Email and Password!!"});

   // res.render('welcome');
}

const details = (req, res) => {
    var allDetails = fs.readFileSync('./users/record.txt').toString().split('\n');
    var detailsInFormat = getDetailsInFormat(allDetails);
    console.log(detailsInFormat);
    res.render('details', {info:detailsInFormat});
}

function getDetailsInFormat(allDetails){
    let arr = [];
    allDetails.forEach(element => {
        let temp = element.split('|');
        let obj = {
            name : temp[0],
            email : temp[1],
            age : temp[3],
            phone : temp[4],
            city : temp[5],
            role : temp[6]
        }
        arr.push(obj);
    });
    return arr;
}
function checkEmailAndPassword(email_password,userEmail,userPass)
{
   for(let obj in email_password)
   {
       let email = email_password[obj].email;
       let pass = email_password[obj].pass;
       if(email == userEmail && pass == userPass)
       {
           let name = email_password[obj].name;
           return {
               status:true,
               name: name,
           };
       }
   }
   return {status:false};
}
function getEmailAndPassword(emailRecord)
{
   const ENP = [];
   for(let i of emailRecord){
       let data = i.split('|');
       let name = data[0];
       let email = data[1];
       let pass = data[2];
       let obj = {
           name: name,
           email:email,
           pass:pass,
       }
       ENP.push(obj);
   }
   return ENP;
}
function emailExists(allEmails,email){
   for(let i of allEmails){
       if(i === email) return true;
   }
   return false;
}

function getEmails(emailRecord){
   const email = [];
   for(let i of emailRecord)
   {
       let emailInString = i.split('|');
       email.push(emailInString[1]);
   }
   return email;
}

module.exports = {
    registration, login, details
};