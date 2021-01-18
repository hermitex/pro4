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
const header = document.querySelector(".header");
const dataList = document.querySelector("#options");
let genre = "";

quoteGenre.addEventListener("change", (e) => {
  genre = e.target.value.toLowerCase();
  getQuote();
});

const getQuote = () => {
  body.style.background = `#${Math.floor(Math.random() * 255)}`;
  let id = Math.floor(Math.random() * QUOTES.length);
  if (options.value === "Select Quote Genre" || options.value === "Random") {
    if (search.value !== " ") {
      displayQuotesFromThisAuthor();
    } else if (search.value === " ") {
      header.innerHTML = ` <h1 class='quote-header'>Random quotes(${QUOTES.length})</h1> `;
      outputDiv.innerHTML = `
     
        <blockquote> 
            ${QUOTES[id].quote}
            <footer class="quote-author" >-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</footer>
        </blockquote>`;
    }
  } else {
    displayQuotesFromThisGenre();
  }
};

const displayMultipleQuotes = (num, quotes) => {
  let output = "";
  while (num && num <= 4) {
    let id = Math.floor(Math.random() * quotes.length);
    output += `
    <blockquote  style="text-align: center"> 
      ${QUOTES[id].quote}
      <span  style=" font-style: oblique; font-size:small; display: block;">-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</span>
    </blockquote> <br/> <hr/>`;
    num--;
    outputDiv.innerHTML = `${output}`;
    // <button type='button' id="generate-quote" class="btn btn-light p-3 d-block w-auto m-auto">Back</button>
  }
};

const displayQuotesFromThisGenre = () => {
  const quotes = QUOTES.filter((quote) => quote.genre === genre);

  let id = Math.floor(Math.random() * quotes.length);

  if (quotes.length > 0) {
    header.innerHTML = ` <h1 class='quote-header'>${quotes[id].genre}  quotes(${quotes.length})</h1>  `;
    outputDiv.innerHTML = `
  
    <blockquote> 
        ${quotes[id].quote}
        <footer class="quote-author" >-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</footer>
        
        </blockquote>`;
  } else {
    outputDiv.innerHTML = `
    <blockquote class='warning'> 
        This genre does not have quotes yet
    </blockquote>`;
  }
};

const findQuotesFromAuthor = (author) => {
  const quotesFromAuthor = QUOTES.filter(
    (quote) =>
      `${quote.authorFirstName} ${
        quote.authorSecondName ? quote.authorSecondName : ""
      }` === author
  );

  return quotesFromAuthor;
};

console.log(QUOTES);

const displayQuotesFromThisAuthor = () => {
  let quotes = findQuotesFromAuthor(search.value);
  console.log(quotes);
  let id = Math.floor(Math.random() * quotes.length);

  if (quotes.length > 0) {
    header.innerHTML = ` <h1 class='quote-header'>${quotes[id].authorFirstName} ${quotes[id].authorSecondName}(${quotes.length} quotes)</h1>  `;
    outputDiv.innerHTML = `
  
    <blockquote> 
        ${quotes[id].quote}
        <footer class="quote-author" >-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</footer>
        
        </blockquote>`;
  } else {
    header.innerHTML = ` <h1 class='quote-header'>Random quotes(${QUOTES.length})</h1> `;
    let id = Math.floor(Math.random() * QUOTES.length);
    outputDiv.innerHTML = `   
      <blockquote> 
          ${QUOTES[id].quote}
          <footer class="quote-author" >-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</footer>
      </blockquote>`;
  }
};

window.addEventListener("load", (e) => {
  body.style.background = `#${Math.floor(Math.random() * 255)}`;
  let randomNumber = Math.floor(Math.random() * QUOTES.length);
  const authorNames = QUOTES.map(
    (quote) =>
      `${quote.authorFirstName.trim()} ${
        quote.authorSecondName ? quote.authorSecondName.trim() : ""
      }`
  ).sort();
  let uniqueAuthorNames = [...new Set(authorNames)];

  getQuote(randomNumber);
});

const instertAuthorsDatalist = (authors) => {
  let authorList = "";
  authors.forEach((author) => {
    authorList += `<option value="${author}">${author}</option>`;
  });
  dataList.innerHTML = authorList;
};

quoteNumber.addEventListener("change", (e) => {
  displayMultipleQuotes(parseInt(e.target.value), QUOTES);
});

nextButton.addEventListener("click", (e) => {
  getQuote();
});

search.addEventListener("keyup", (e) => {
  findQuotesFromAuthor(e.target.value);
});
