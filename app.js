// const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRouter=require('./routes/products')
const userRouter=require('./routes/users')
dotenv.config();

const app = express();
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("DB connected");
	})
    .catch(()=>{
        console.log("DB connection Failed");
    })

//MiddleWare
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors())
app.use(morgan("dev"));

//routes
app.use('/api/products',productRouter)
app.use('/api/user',userRouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
