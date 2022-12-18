// This file holds the Business-Logic layer, interacting with Data Layer
const bcrypt = require("bcrypt")
const User = getUserModel();

function getUserModel()
{
  const User = require('../Users/user.model');
  return User;
}

async function GetSelf (UserID)
{
  const user = await User.findById(UserID).select("-password")
  if (!user)
  {
    throw new Error ('NotFound')
  }
  return user;
}

  async function UpdateSelf (req, res)
  {
    const login = req.body?.username;
    const mdp = req.body?.password;
    const hash = await bcrypt.hash(mdp,10);
    User.findByIdAndUpdate(req.user._id,
    {
        $set: {
        username : login,
        password : hash
          },
    },
        {new:true},
        (err) => {
            if (err) {
            res.send(err);
            } else res.status(200).send("Update done");
        }
        );
  }

async function DeleteSelf (userID)
{
  const user = await User.findByIdAndDelete(userID)
  if (!user)
  {
    throw new Error ('NotFound')
  }
  return "Delete Done";
}
async function GetAllUsers (req,res)
{
    User.find().select("-password")
    .then(users=>{
    res.json(users)
    })
}
async function UpdateUserRole (req,res)
{
    User.findByIdAndUpdate({_id :req.params.id},
        {
          $set: {
          role : "admin"
        },
      },
          {new:true},
          (err, User) => {
            if (err) {
              res.send(err);
            } else res.status(200).send("Change Done");
          }
        );
}

module.exports = {getUserModel,GetSelf, UpdateSelf, DeleteSelf,GetAllUsers,UpdateUserRole}