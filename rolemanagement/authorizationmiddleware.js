function roleAccess(allowedRoles)
{
    return function(req,res,next){
        if (allowedRoles.includes(req.user.role)==false)
        {
            return res.status(403).send("Unauthorized permission : you don't have the role for this")
        }
        return next()
    };
}

module.exports = {roleAccess}