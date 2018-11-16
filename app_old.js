let counter = 0
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=978d6c3818ff431b8c210ae86550fb1f')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)

      let results = data.articles.map((item) => {
        return `
          <article>
            <img width="124px" height="124px;" src="${item.urlToImage}" alt="">
            <div>
              <h1>${item.title}</h1>
              <p>${item.description}</p>
              <time>${item.publishedAt}</time>
            </div>
          </article>
        `
      })

      document.getElementById('news').innerHTML = results.join('\n')

    })
})