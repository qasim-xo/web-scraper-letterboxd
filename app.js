const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

async function fetchMovieRating(movieName) {
  try {
    const url = `https://letterboxd.com/film/${movieName}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const rating = $('meta[name="twitter:data2"]').attr("content");
    return parseFloat(rating) || "Rating not found";
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data";
  }
}

app.get("/rating", async (req, res) => {
  const movieName = req.query.movie;
  if (!movieName) {
    return res.status(400).json({ error: "Movie name is required" });
  }

  const rating = await fetchMovieRating(movieName);
  res.json({ movie: movieName, rating });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
