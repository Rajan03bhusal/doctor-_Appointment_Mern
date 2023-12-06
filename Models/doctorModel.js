const { default: mongoose } = require('mongoose');
const momgoose=require('mongoose');

const doctorSchema=new mongoose.Schema({

    userId:{
        type:String,
    },
    firstName:{
        type:String,
        require:[true,'first name is required'],

    },
    LastName:{
        type:String,
        require:[true,'last name is required'],

    },
    phone:{
        type:String,
        require:[true,'phone is required'],

    },
    email:{
        type:String,
        require:[true,'email is required'],

    },
    website:{
        type:String,

    },
    address:{
        type:String,
        require:[true,'address is required'],

    },
    specialization:{
        type:String,
        require:[true,'specialization is required'],

    },
    experience:{
        type:String,
        require:[true,'experience is required'],

    },
    fee:{
        type:Number,
        require:[true,'fee is required'],

    },
    status:{
        type:String,
        default:'pending'

    },
    time:{
        type:Object,
        require:[true,'time is required'],

    },
},
  {timestamps:true}
);

const doctorModel=mongoose.model('doctors',doctorSchema);
module.exports=doctorModel;