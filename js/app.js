import { QUOTES } from "../js/quoteDB.js";

const preveousButton = document.querySelector(".preveous");
const nextButton = document.querySelector(".next");
const outputDiv = document.querySelector(".quote-content");
const search = document.querySelector("#search-quote");
const quoteNumber = document.querySelector("#quote-number");
const body = document.querySelector("body");
const quoteGenre = document.querySelector("#quote-genre");
const authorImage = document.querySelector(".author-image");
const options = document.querySelector("select");

const getQuote = (option, id) => {
  body.style.background = `#${Math.floor(Math.random() * 255)}`;
  if (option === "Select Quote Genre") {
    console.log(option);
    outputDiv.innerHTML = `
      <blockquote> 
          ${QUOTES[id].quote}
          <footer class="quote-author" >-${QUOTES[id].authorFirstName}</footer>
      </blockquote>`;
  } else {
    console.log(QUOTES[id]);
    outputDiv.innerHTML = `
      <blockquote> 
          ${QUOTES[id].quote}
          <footer class="quote-author" >-${QUOTES[id].authorFirstName}</footer>
      </blockquote>`;
  }
};

const displayMultipleQuotes = (num, quotes) => {
  let output = "";
  while (num && num <= 4) {
    let id = Math.floor(Math.random() * quotes.length);
    output += `
    <blockquote  style="text-align: left"> 
    ${QUOTES[id].quote}
    <span  style=" font-style: oblique; font-size:small">-${QUOTES[id].authorFirstName}</span>
</blockquote> <br/> <hr/>`;
    num--;
    outputDiv.innerHTML = `${output}`;
    // <button type='button' id="generate-quote" class="btn btn-light p-3 d-block w-auto m-auto">Back</button>
  }
};

const displayQuotesFromThisGenre = (genre) => {
  let randomNumber = Math.floor(Math.random() * QUOTES.length);
  getQuote(genre, randomNumber);
};

window.addEventListener("load", (e) => {
  let randomNumber = Math.floor(Math.random() * QUOTES.length);
  getQuote(e, randomNumber);
});
quoteNumber.addEventListener("change", (e) =>
  displayMultipleQuotes(parseInt(e.target.value), QUOTES)
);

nextButton.addEventListener("click", (e) => {
  let randomNumber = Math.floor(Math.random() * QUOTES.length);
  getQuote(e, randomNumber);
});

quoteGenre.addEventListener("change", (e) => {
  displayQuotesFromThisGenre(e.target.value.toLowerCase());
});
