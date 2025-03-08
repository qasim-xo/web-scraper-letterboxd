const cheerio = require("cheerio");
const axios = require("axios");

// Sample HTML
async function fetchHTML(movieName) {
  try {
    const url = `https://letterboxd.com/film/${movieName}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const rating = $('meta[name="twitter:data2"]').attr("content");
    const rating2 = $(".average-rating").attr("a");
    console.log("Rating:", rating);
    console.log("rating2 : ", rating2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Example usage
fetchHTML("the-matrix");
