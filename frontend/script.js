//API used: https://newsapi.org
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options-container');
const country = "us";
const options = ["general", "business", "entertainment", "health", "science", "sports", "technology"];



//100 requests per day
let requestURL;

//Create cards from data
const generateUI = (articles) => {
    for(let item of articles){
        let card= document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = 
        `<div class="news-image-container"> 
            <img src="${item.urlToImage || "./newspaper.jpg"}" alt="news-image" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
    container.appendChild(card);
    }
};

//News API call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable at moment. Please try again later.");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

const selectCategory = (e, category) => {
    // Get all option buttons
    let options = document.querySelectorAll(".options");

    // Remove 'active' class from all buttons
    options.forEach((element) => {
        element.classList.remove("active");
    });

    // Add 'active' class to the clicked button
    e.target.classList.add("active");

    // Update the request URL with the selected category
    requestURL = `http://localhost:3000/news?category=${category}`;

    // Fetch news with the new category
    getNews();
};


//options buttons 
const creatOptions =  () => {
    for(let i of options) {
        optionsContainer.innerHTML += `<button class="options ${i=="general" ? "active" :""}" 
        onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init=()=>{
    optionsContainer.innerHTML = "";
    getNews();
    creatOptions();
}

window.onload = () => {
    requestURL = `http://localhost:3000/news?category=general`;
    init();
}