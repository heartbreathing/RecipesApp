import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


// using environmental password instead of "MERNpassword123"
mongoose.connect("mongodb+srv://emmaW:MERNpassword123@recipes.k9ropze.mongodb.net/recipes?retryWrites=true&w=majority",
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   }
);

app.listen(3001, () => console.log('SERVER STARTED！'));


