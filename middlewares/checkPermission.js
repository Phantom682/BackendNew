const User = require('../schema/users')
const Role = require('../schema/roles')

module.exports = {
    checkPermission: async (req,res,next) => {
        let email = req.body.email
        const user = await User.findOne({email:email});
        const role = await Role.findOne({name:user.role})
        if(role.permissions.includes("login")) {
            next()          
        }
        else{
            res.status(400).json({status:"You dont have requires Permission"});
            return;
        }
    }
}