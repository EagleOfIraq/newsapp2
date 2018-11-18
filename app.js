import 'babel-polyfill'

var url;
var news;

document.addEventListener('DOMContentLoaded', () => {
    news = document.getElementById('news');
    var search = document.getElementById('search');

    search.addEventListener('keyup', (event) => {
        updateUrl(search.value);
        if (event.key == 'Enter') {
            getNews()
        }
    });
    updateUrl('iraq');
    getNews()
});

async function getNews() {
    var response = await fetch(url);
    var content = await response.json();
    news.innerHTML = '';
    content.articles.forEach(addArticle);
}

function updateUrl(query) {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`
}

function addArticle(article, i) {
    if (i === 0) console.log(article);
    article.counter = localStorage.getItem(article.title) || 0;
    var articleElement = document.createElement('article');
    articleElement.id = i;
    {
        var imgElement = document.createElement('img');
        imgElement.width = 124;
        imgElement.minWidth = 124;
        imgElement.height = 124;
        imgElement.src = article.urlToImage;

        var divTextElement = document.createElement('div');
        divTextElement.id = 'text';
        {
            var h1Element = document.createElement('h1');
            h1Element.innerText = article.title;

            var pElement = document.createElement('p');
            pElement.innerText = article.description;

            var timeElement = document.createElement('time');
            timeElement.type = "time";
            timeElement.innerText = article.publishedAt;

            divTextElement.appendChild(h1Element);
            divTextElement.appendChild(pElement);
            divTextElement.appendChild(timeElement);
        }
        var divVoterElement = document.createElement('div');
        divVoterElement.id = 'voter';
        {
            var divCounterElement = document.createElement('div');
            divCounterElement.id = 'counter' + i;
            divCounterElement.innerText = article.counter;

            var imgUpElement = document.createElement('img');
            imgUpElement.width = 13;
            imgUpElement.height = 13;
            imgUpElement.src = require('./assets/upvote.svg');
            imgUpElement.addEventListener('click', () => {
                divCounterElement.innerText = ++article.counter;
                localStorage.setItem(article.title, article.counter);
            });

            var imgDownElement = document.createElement('img');
            imgDownElement.width = 13;
            imgDownElement.height = 13;
            imgDownElement.src = require('./assets/downvote.svg');
            imgDownElement.addEventListener('click', () => {
                divCounterElement.innerText = --article.counter;
                localStorage.setItem(article.title, article.counter);
            });

            divVoterElement.appendChild(imgUpElement);
            divVoterElement.appendChild(divCounterElement);
            divVoterElement.appendChild(imgDownElement);
        }
    }
    articleElement.appendChild(imgElement);
    articleElement.appendChild(divTextElement);
    articleElement.appendChild(divVoterElement);
    news.appendChild(articleElement);
}

