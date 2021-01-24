import { QUOTES } from "../js/quoteDB.js";

const nextButton = document.querySelector(".next");
const outputDiv = document.querySelector(".quote-content");
const search = document.querySelector("#search-quote");
const quoteNumber = document.querySelector("#quote-number");
const body = document.querySelector("body");
const quoteGenre = document.querySelector("#quote-genre");
const options = document.querySelector("select");
const header = document.querySelector(".header");
let genre = "";

quoteGenre.addEventListener("change", (e) => {
  genre = e.target.value.toLowerCase(); //Get quote genre to be used in a different function
  getQuote(); //Generate a new random quote imediately the quote genre chnages
});

const getQuote = () => {
  let id = Math.floor(Math.random() * QUOTES.length);
  if (options.value === "Select Quote Genre" || options.value === "Random") {
    if (search.value) {
      body.style.background = `#${Math.floor(Math.random() * 255)}`;
      outputDiv.style.backgroundImage = ``;
      displayQuotesFromThisAuthor();
    } else if (search.value === "") {
      body.style.background = `#${Math.floor(Math.random() * 255)}`;
      header.innerHTML = ` <h1 class='quote-header'>Random quotes(${QUOTES.length})</h1>`;
      outputDiv.innerHTML = `     
        <blockquote>            
            ${QUOTES[id].quote}
            <footer class="quote-author" >-${QUOTES[id].authorFirstName} ${QUOTES[id].authorSecondName}</footer>
        </blockquote>`;
    }
  } else {
    outputDiv.style.backgroundImage = ``;
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
  }
};

const displayQuotesFromThisGenre = () => {
  const quotes = QUOTES.filter((quote) => quote.genre === genre);

  let id = Math.floor(Math.random() * quotes.length);

  if (quotes.length > 0) {
    body.style.background = `#${Math.floor(Math.random() * 255)}`;
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
  const quotesFromAuthor = QUOTES.filter((quote) => {
    if (
      quote.authorFirstName.toLowerCase() === author ||
      quote.authorSecondName.toLowerCase() === author
    )
      return author;
  });

  return quotesFromAuthor;
};

const displayQuotesFromThisAuthor = () => {
  let quotes = findQuotesFromAuthor(search.value.toLowerCase());
  let id = Math.floor(Math.random() * quotes.length);
  if (quotes.length > 0) {
    body.style.background = `#${Math.floor(Math.random() * 255)}`;
    header.innerHTML = ` <h1 class='quote-header'>${quotes[id].authorFirstName} ${quotes[id].authorSecondName}(${quotes.length} quotes)</h1>  `;
    outputDiv.innerHTML = `  
    <blockquote> 
        ${quotes[id].quote}      
      
           <footer class="quote-author" >-${quotes[id].authorFirstName} ${quotes[id].authorSecondName}</footer>
        
     </blockquote>`;
  } else {
    outputDiv.innerHTML = `   
      <blockquote style='font-style: italic;' class='warning'> 
        <span style='text-decoration: underline; text-transform: capitalize'> ${search.value}</span> does not have any quotes yet
      </blockquote>`;
    search.value = "";
  }
};

search.addEventListener("onblur", (e) => {
  console.log(e.target.value);
});

window.addEventListener("load", (e) => {
  body.style.background = `#${Math.floor(Math.random() * 255)}`;
  let randomNumber = Math.floor(Math.random() * QUOTES.length);
  getQuote(randomNumber);
});

quoteNumber.addEventListener("change", (e) => {
  if (+e.target.value > 4) {
    confirm("You can read up to 4 quotes at a time");
    e.target.value = 4;
  } else {
    displayMultipleQuotes(parseInt(e.target.value), QUOTES);
  }
});

nextButton.addEventListener("click", (e) => {
  getQuote();
});

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyN" || e.code === "ArrowRight") {
    getQuote();
  }
});

search.addEventListener("keyup", (e) => {
  findQuotesFromAuthor(e.target.value);
});
