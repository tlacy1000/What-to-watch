var rndNumber =  Math.floor(Math.random() * 10);
var movieId;

$(document).ready(() => { 
    $('#suggestBtn').click( () => {
        var cult =["tt1454468","tt1825683","tt2872718","tt3460252","tt1853728","tt1392190","tt0816692","tt0993846","tt0780504","tt1798709"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

$(document).ready(() => { 
    $('.scifi').click( () => {
        var cult =["tt1856101","tt0246578","tt1136608","tt1483013","tt2543164","tt1631867","tt0470752","tt0945513","tt2397535","tt2884206"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

$(document).ready(() => { 
    $('.act').click( () => {
        var cult =["tt1706620","tt5013056","tt0381061","tt0379786","tt0472043","tt1343727","tt3890160","tt2911666","tt2179136","tt0390022"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

$(document).ready(() => { 
    $('.adv').click( () => {
        var cult =["tt0910970","tt0454876","tt0499549","tt1156398","tt0381849","tt1542344","tt0970179","tt0825232","tt2883512","tt0359950"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

$(document).ready(() => { 
    $('.bio').click( () => {
        var cult =["tt1979320","tt0790636","tt0454921","tt1596363","tt0765429","tt0878804","tt3774114","tt4276820","tt1704573","tt1596345"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

$(document).ready(() => { 
    $('.myst').click( () => {
        var cult =["tt0209144","tt2267998","tt1791528","tt0401792","tt1182345","tt1568346","tt0119174","tt1536537","tt0259711","tt2406566"];
        var suggestedMovieID = cult[rndNumber];
        suggestMovie(suggestedMovieID)
    });
});

  
//below function is triggerin suggestBtn to suggest movie
function suggestMovie(suggestedMovieID) {
    axios.get('http://www.omdbapi.com/?i='+suggestedMovieID+'&apikey=b1480198')
    .then((response) => {
        console.log(response);
        let movieInfo = response.data;
        let movieoutput = `
        <div class="col-md">
        <div class="well text-center">
        <img id="poster" src="${movieInfo.Poster}">
        <h4>${movieInfo.Title}</h4>
        <a onclick="suggestMovie('${movieInfo.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
        </div>`;
    $('#movies').html(movieoutput);
    })
    .catch((err) => {
        console.log(err);
}); }