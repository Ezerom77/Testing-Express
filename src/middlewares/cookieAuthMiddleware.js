const db = require('../../models'); 
const cookieAuthMiddleware = function(req, res, next){
    if(req.cookie != undefined){
        if(req.cookie.recordame != undefined && req.session.users == undefined){
            db.Users.findOne({
                where: {email: req.cookie.recordame}
            })
            .then((users)=> {
                req.session.user = users;
            });
        }
    } next();
}

module.exports = cookieAuthMiddleware ; 