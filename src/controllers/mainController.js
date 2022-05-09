const mainController = {
    index: (req,res) => {
        // res.render('index');
        res.redirect('/products/slider')
    }
}

module.exports = mainController;


//test