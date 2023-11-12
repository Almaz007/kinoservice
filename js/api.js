const API_KEY = 'a01afeb8-3d61-4bb6-8eb7-e521a31cc4ec';
const API_POPULAR = 
'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
getMovies(API_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMoives(respData);
}
  
function getClassByRate(vote) {
    if (vote >= 7) {
      return "green";
    } else if (vote > 5) {
      return "orange";
    } else {
      return "red";
    }
}

function showMoives (data){

    let moivesEl = document.querySelector('.movies');
    document.querySelector(".movies").innerHTML = "";

    data.films.forEach(movie => {
        const moiveEl = document.createElement('div');

        moiveEl.classList.add('movie');

        moiveEl.innerHTML = `
            <div class="movie__cover-inner">
                <img src="${movie.posterUrlPreview}"  alt="${movie.nameRu}" class="movier__cover">
                <div class="movie__cover--darkened"></div>
            </div>

            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">
                    ${movie.genres.map(genre => ` ${genre.genre}`)}
                </div>
                <div class="movie__average movie__average--${getClassByRate(movie.rating)}">
                    ${movie.rating}
                </div>
            </div>
        `;
        moivesEl.appendChild(moiveEl);

    });

    const form = document.querySelector("form");
    const search = document.querySelector(".header__search");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
      
        const apiSearchUrl = `${API_SEARCH}${search.value}`;
        if (search.value) {
          getMovies(apiSearchUrl);
      
          search.value = "";
        }
      });
}