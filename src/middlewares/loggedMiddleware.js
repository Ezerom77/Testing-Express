let loggedMiddleware = (req, res, next) => {
    if(req.session.user) {
        next();
    }
    else {
        res.send("Debes estar logueado/a para acceder a esta página");
    }
}

module.exports = loggedMiddleware;