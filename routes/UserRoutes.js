const express=require("express");
const { loginControlller, registernontrolller,authController,applyDoctorController,getAllNotificationController} = require("../Controllers/userController");
const auth=require('../Middleware/auth')

//router object
const router=express.Router();


//routes for login and register
router.post('/login',loginControlller);
router.post('/register',registernontrolller);

//Auth
router.post('/getUserdata',auth,authController);


//Auth || aaply-doctor
router.post('/apply-doctor',auth,applyDoctorController);


 
//Auth || notification
router.post('/get-all-notification',auth,getAllNotificationController);



module.exports=router;