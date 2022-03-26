let guestMiddleware = (req, res, next) => {
    if(req.session.user == undefined) {
        next();
    }
    else {
        res.send("No puedes acceder a esta página porque ya estás logueado/a")
    }
}

module.exports = guestMiddleware;