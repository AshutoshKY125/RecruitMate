import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors';
config();

export const app = express();
export const port = 5000;

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: '*', // Yahan '*' ka matlab hai koi bhi frontend request bhej sakta hai.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));


// ✅ Correct way to connect using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB successfully');
    // console.log(mongoose.connection.name); // Database ka naam print karega
// console.log(mongoose.connection.collections); // Collections ka list print karega

}).catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
});
console.log("DB Connection Status:", mongoose.connection.readyState);

import interviewRoutes from "./routes/InterviewerRoute.js";
app.use("/api/interviews", interviewRoutes);

import candidateRoutes from "./routes/CandidateRoute.js";
app.use("/api/candidates", candidateRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});

