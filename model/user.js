
const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryptjs = require('bcryptjs')

const userschema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        trim : true

    },
    password :{
        type : String,
        required: true,
        trim : true,
        minlength : 8,
        validate(value){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(value)){
                throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
    email :{
        type : String,
        trim : true,
        required : true,
        lowercase : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('email wrong')
            }
        }
    },
    age:{
        type:Number,
        default : 18,
        validate(value){
            if(value<=0){
                throw new Error("wroooooooong")
            }
        }
    },
    city:{
        type:String,

    }
})

userschema.pre('save', async function() {
    const user = this
    console.log(user);
    if(user.isModified('password')){
    user.password = await bcryptjs.hash(user.password, 8)
    }
})

///////////////////////////////////////////////////////////////////

userschema.statics.findByCredentials = async (em,pass) =>{
  
    const user = await User.findOne({email:em})
    if(!user){
        throw new Error('Erooor')
    }
   
    const isMatch = await bcryptjs.compare(pass,user.password)
  
    if(!isMatch){
        throw new Error('Erooor')
    }
    return user
}



const User = mongoose.model('user',userschema)


module.exports = User