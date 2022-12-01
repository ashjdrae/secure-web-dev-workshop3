// This file holds the Business-Logic layer, interacting with Data Layer
const bcrypt = require("bcrypt")
const User = require('./user.model')

async function Register(username,password)
{
    const hash = await bcrypt.hash(password,10);
    const user = new User({username, password : hash})
    return await user.save()
}
/*
async function WriteInfos()
{
    let logs = []
    var customerLogin = await prompt("Please enter Login");
    if (customerLogin!= null) {
    Console.log("Hello " + customerLogin + "! How are you today?");
    logs.push(customerLogin);
    }
    var customerPassword = await prompt("Please enter password");
    if (customerPassword!= null) {
        Console.log("Hello " + customerPassword + "! How are you today?");
        logs.push(customerPassword);
    }
    return logs;
}
const Register = (req, res)=>{
    log = WriteInfos();
    User.create({
        username: log[0],
        password : log[1]
    }).then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.json(err)
    })
}
*/

/*
const Register = (req, res)=>{
    User.create({
        username: 'alban',
        password : 'SWD1234'
    }).then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.json(err)
    })
}
*/
const Login = (req, res)=>{

}
const GetSelf = (req, res)=>{

}
const UpdateSelf = (req, res)=>{

}
const DeleteSelf = (req, res)=>{

}
const GetAll = (req, res)=>{
    User.find()
  .then(users=>{
      res.json(users)
  })
  .catch(err=>{
      res.json(err)
  })
}
module.exports = { Register, Login, GetSelf, UpdateSelf, DeleteSelf,GetAll}