const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
const API_KEY = "e7868432a1924b8ab759671808e395a5";
const COUNTRY = "us";

app.use(cors()); // Fix CORS issue

// Route to get news from NewsAPI
app.get("/news", async (req, res) => {
    try {
        const category = req.query.category || "general";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
