import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// Load environment variables from .env file
dotenv.config();

const mongodbPassword = process.env.MONGODB_PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


// using environmental password 
mongoose.connect(`mongodb+srv://emmaW:${mongodbPassword}@recipes.k9ropze.mongodb.net/recipes?retryWrites=true&w=majority`,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }
);

app.listen(3002, () => console.log('SERVER STARTED！'));

export default app;
