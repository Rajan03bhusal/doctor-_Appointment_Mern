const { default: mongoose } = require('mongoose');
const mongodb=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:"String",
        require:[true,'name is required']
    },
    email:{
        type:"String",
        require:[true,'email is required']
    },
    password:{
        type:"String",
        require:[true,'password is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    Seennotification:{
        type:Array,
        default:[]
    }
    
    

})

const userModel=mongoose.model('users',userSchema);
module.exports=userModel