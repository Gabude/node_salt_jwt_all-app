const User = require('../models/User')

//handles error
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: '' }

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach( ({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
     //console.log(req.body);
     const {email, password} = req.body;
    try{
        const user = await User.create({ email, password });
        res.status(201).json(user);
    }
    catch(err){
        handleErrors(err);
        res.status(400).json({error});
        next(err);
    }
}
//let isLoggedIn = false;
module.exports.login_post = async (req, res) => {
    //req.session.isLoggedIn = true;
    const {email, password} = req.body;
    console.log(req.body);
    res.send('user login');
}