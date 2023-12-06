const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const connectDB = require('./config/db');

//rest object
const app=express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));


// dotenv config
dotenv.config();

//mongo db connection
connectDB();

//routes
// app.get("/",(req,res)=>{
//     res.status(200).send(
//         {
//             message:"Server Running"
//         }
//     )

//});


app.use('/api/v1/user',require('./routes/UserRoutes'))

//port
const port=process.env.PORT || 8080;

//listen port
app.listen(port,()=>{
    console.log( `Server running at port number:${port}`);
})