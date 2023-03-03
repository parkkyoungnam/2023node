const User = require('../models/user');

exports.follow = async (req, res, next) => {
    // req.body.id, req.params.id
    try{
        const user = await User.findOne({ where : {id : req.user.id} })

        if(user)
        {
            await user.addFollowing(paraseInt(req.params.id, 10));
            res.send('success');
        }
        else
        {
            res.status(404).send('no user');
        }
        

    }catch(error)
    {
        console.log(error);
        next(error);
    }

};