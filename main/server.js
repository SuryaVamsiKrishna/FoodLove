import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import store_router from './routes/store_routes.js';

const app = express();

const PORT = process.env.PORT || 8080;
const mongo_URI = 'mongodb+srv://uday:uday@foodlove.vdwnv.mongodb.net/FoodLove?retryWrites=true&w=majority';

mongoose.connect(mongo_URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => app.listen(PORT,()=>console.log(`server running on port: ${PORT} and mongo connection successful`)))
    .catch((error)=> console.log(error));

mongoose.set('useFindAndModify',false);

app.use(cors());
app.use(express.json());
app.use('/store', store_router);
