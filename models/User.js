const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valied email']
        /*sparse:true    //NOTE : The sparse property in email , is what tells my database to allow null values which will later be filled with unique values */
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password character requied is 6 digit'],
    }
});
//fire a function after dox is saved to db...use...post() and pre() for brfore...
userSchema.post('save', function(doc, next ){
    console.log('new user was created and saved', doc);
    next();
})


//pre() for save brfore... and use the THIS_KEY_WORD
userSchema.pre('save', function(next ){ //Note: removed can be used in place of save....when u want to remove, etc
    console.log('user about to be created and saved', this);
    next();
})
//use pre() for salt-bcrypt application
userSchema.pre('save', async function(next ){ 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;