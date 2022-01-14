const jwt = require("jsonwebtoken");
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");

// schema is used to define the structure of the document 
const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        require:true
    },
    phone: {
        type: String,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        require:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {   
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                require:true
            },
            phone: {
                type: String,
                required:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
});

// we need to hash the password here, so we will called the Pre function with save as a type of EVENT
// followed by the callback func 
userSchema.pre("save", async function (next) {
    // if only password field get modified then only we will hash else not 
    if (this.isModified("password")) {
        // we need to await, bcz it return the promises 
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// generate the token for the user when login
userSchema.methods.generateAuthToken = async function() {
    try{
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token });
        await this.save();
        console.log(token);
        return token;
    }catch (error) {
        console.log(`jwt inside error `+error);
    }
}

//user when fills the Message Contact form
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

// we need to know create the colletction in our database..
const User = mongooose.model('USER', userSchema);

module.exports = User;





