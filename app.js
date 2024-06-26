const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const student = require("./models/model");
const cron = require("node-cron");
const axios = require("axios");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const adminR = require("./routes/admin")
const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})
app.use("/", adminR);
app.get("/", async (req, res) => {
    res.send("ping");
})
const makeApiRequest = async () => {
    try {
        const apiEndpoint = "https://techfiesta-server.onrender.com"
        const response = await axios.get(apiEndpoint);
        // console.log('API request successful:', response.data);
    } catch (error) {
        // console.error('API request failed:', error.message);
    }
};

cron.schedule('*/15 * * * *', async () => {
    // console.log('Running API request...');
    await makeApiRequest();
});
app.post("/form", async (req, res) => {
    try {
        const { team_name, problem_id, college, leader_name, email, mobile, place, utr } = req.body;
        console.log(req.body);
        const result = await student.findOne({ $or: [{ email: email }, { mobile: mobile }] })
        if (result) {
            console.log(result);
            return res.status(401).json({ message: "Some Email/Mobile already registered with us" });
        }
        const teamCheck = await student.findOne({ team_name: team_name })
        if (teamCheck) {
            console.log(teamCheck);
            return res.status(402).json({ message: "Sorry the team name is taken" });
        }
        const Nsave = new student({ team_name, problem_id, college, place, utr, email, mobile, leader_name });

        const team = await Nsave.save();

        res.status(201).json({ team, message: "Form Submitted Successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ err });

    }
})
app.listen(8080, () => {
    console.log("server running");
})