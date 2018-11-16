import 'babel-polyfill'

var news;

document.addEventListener('DOMContentLoaded', () => {
    news = document.getElementById('news');
    var search = document.getElementById('search');

    search.addEventListener('keyup', (event) => {
        // console.log(event)/
        if (event.key == 'Enter') {
            getNews(search.value)
        }
    });
    getNews('iraq')
});

async function getNews(query) {
    var response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`);
    var content = await response.json();
    news.innerHTML = '';
    content.articles.forEach(addArticle);
}


function addArticle(article, i) {
    article.counter = 1;
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
            imgUpElement.src = require('./assets/upVote.svg');
            imgUpElement.addEventListener('click', () =>
                divCounterElement.innerText = ++article.counter);

            var imgDownElement = document.createElement('img');
            imgDownElement.width = 13;
            imgDownElement.height = 13;
            imgDownElement.src = require('./assets/downvote.svg');
            imgDownElement.addEventListener('click', () =>
                divCounterElement.innerText = --article.counter);

            divVoterElement.appendChild(imgUpElement);
            divVoterElement.appendChild(divCounterElement);
            divVoterElement.appendChild(imgDownElement);
            imgUpElement.onclick = () => console.log(article.counter);
        }
    }
    articleElement.appendChild(imgElement);
    articleElement.appendChild(divTextElement);
    articleElement.appendChild(divVoterElement);
    news.appendChild(articleElement);
}

