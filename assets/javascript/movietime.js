

$(document).ready(function () {

  // showtimes, theater location api
  var apikey = "KjOQzlwvuexNF2nJ5EEMEBuwk3er0xXH"
  // global list of variables from internationashowtimes api
  var genreIDs = ("https://api.internationalshowtimes.com/v4/genres/?apikey=" + apikey)
  var userLat;
  var userLng;


  $.ajax({
    url: genreIDs,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    for (var i = 0; i < 20; i++) {
      var element = response.genres[i];
      if (element.name) {
        // console.log(element.name);
        var button = $("<a>")
        //trying to add more dropdown options
        button.addClass("dropdown-item")
        button.addClass("genre-select")
        button.attr("data-genre", element.id)
        button.text(element.name)
        $("#genre-dropdown").append(button)
      }
    }
  });
  function geoFindMe() {
    var status = $("#status")
    function success(position) {
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;
      // console.log(userLat);
      // console.log(userLng);


    }
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  geoFindMe();

  $(document).on("click", ".genre-select", function (event) {
    event.preventDefault()

    var genre = $(this).attr("data-genre");
    //console log genre, the genre id
    // console.log("genre", genre);
    // calling international showtimes api for the movie list in respect to genre chosen

    var genresURL = ("https://api.internationalshowtimes.com/v4/movies?genre_ids=" + genre + "&lang=en&countries=US&include_outdated=true&fields=id,title,synopsis,poster_image.flat,imbd_id&location=" + userLat + "," + userLng + "&distance=100&apikey=" + apikey)
    var showtimes = ("https://api.internationalshowtimes.com/v4/showtimes?all_fields=true&location=" + userLat + "," + userLng + "&distance=100&apikey=" + apikey)

    // searches for movies based on genre in the international showtimes database

    $.ajax({
      url: genresURL,
      method: "GET"
    }).then(function (response) {

      console.log(response)

      var row = $("<div>")
      row.addClass("row")
      $("#card-container").prepend(row)
      for (var i = 0; i < response.movies.length; i++) {
        var element = response.movies[i]
        var posterImg = response.movies[i].poster_image
        if (posterImg == null || posterImg == "null" || posterImg == '') {
          // console.log("null poster///////////////////////////")


        }
        else {
          // console.log("good");
        }
        var smallColumn = $("<div>")
        smallColumn.addClass("col-sm-4")
        row.append(smallColumn)
        var br = $("<br>")
        smallColumn.append(br)
        // populating cards dynamically
        //create card deck
        var cardDeck = $("<div>")
        cardDeck.addClass("card-deck")
        smallColumn.append(cardDeck)
        //create card class
        var card = $("<div>")
        card.addClass("card")
        cardDeck.append(card)
        var poster = $("<img>")
        poster.attr("src", element.poster_image)
        poster.addClass("card-img-1")
        poster.attr("alt", "poster-image")
        card.append(poster)
        var cardBody = $("<div>")
        cardBody.addClass("card-body")
        cardBody.addClass("d-flex")
        cardBody.addClass("flex-column")
        cardBody.addClass("align-items-center")
        card.append(cardBody)
        var cardTitle = $("<h5>")
        cardTitle.addClass("card-title")
        cardTitle.html("<strong>" + element.title + "</strong>")
        cardTitle.attr("element-id", element.id)
        cardBody.append(cardTitle)
        var p = $("<p>")
        p.addClass("card-text")
        p.attr("id", "overview")
        p.text(element.synopsis)
        var overflow = $("<div>")
        overflow.addClass("overflow-auto")
        overflow.append(p)
        cardBody.append(overflow)
        var button = $("<button>")
        button.addClass("btn")
        button.addClass("btn-danger")
        button.attr("data-target", "#theater-map-" + [i])
        button.attr("data-toggle", "modal")
        button.text("Show Me Theatres!")
        var icon = $("<i>")
        icon.addClass("fa")
        icon.addClass("fa-film")
        icon.attr("aria-hidden", "true")
        button.append(icon)
        cardBody.append(button)
        var modal = $("<div>")
        modal.addClass("modal")
        modal.attr("id", "theater-map-" + [i])
        modal.attr("tabindex", "-1")
        modal.attr("role", "dialog")
        var modalDia = $("<div>")
        modalDia.addClass("modal-dialog")
        modalDia.attr("role", "document")
        modal.append(modalDia)
        var modalCont = $("<div>")
        modalCont.addClass("modal-content")
        modalDia.append(modalCont)
        var modalHead = $("<div>")
        modalHead.addClass("modal-header")
        var modalTitle = $("<h5>")
        modalTitle.addClass("modal-title")
        modalHead.append(modalTitle)
        var buttonClose = $("<button>")
        buttonClose.addClass("close")
        buttonClose.attr("type", "button")
        buttonClose.attr("data-dismiss", "modal")
        buttonClose.attr("aria-label", "Close")
        var span = $("<span>")
        span.attr("aria-hidden", "true")
        span.text("x")
        buttonClose.append(span)
        modalHead.append(buttonClose)
        modalCont.append(modalHead)
        var modalBody = $("<div>").addClass("modal-body")
        var unList = $("<ul>").addClass("list-group")
        var list = $("<li>").addClass("list-group-item")
        list.html("This is a showtime")
        unList.append(list)
        modalBody.append(unList)
        modalCont.append(modalBody)
        var modalFoot = $("<div>").addClass("modal-footer")
        var footerClose = $("<button>").attr("type", "button")
        footerClose.attr("data-dismiss", "modal")
        footerClose.addClass("btn")
        footerClose.addClass("btn-primary")
        footerClose.text("Close")
        modalFoot.append(footerClose)
        modalCont.append(modalFoot)
        card.append(modal)
        var mapId = $("<div>")
        mapId.attr("id", "mapid")
        var movieID = $("#element-id")
        var currentdate = new Date();
          var datetime = "Now: " + currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + "T"
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
          
          var datetimeTomorrow = "tomorrow: " + (currentdate.getDate() + 1) + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + "T"
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
          
          // console.log(movieID)
        button.on("click", function() {
          var cinemaURL = ("https://api.internationalshowtimes.com/v4/cinemas?countries=US&movie_id=" + element.id +
            "&location=" + userLat + "," + userLng + "&distance=100&apikey=" + apikey)

          $.ajax({
            url: cinemaURL,
            method: "GET"
          }).then(function (response) {
            console.log(response.cinemas[0])
            $(".modal-title").text(response.cinemas[0].name)

            var showtimesURL = ("https://api.internationalshowtimes.com/v4/showtimes?cinema_id=" + response.cinemas[0].id + "&movie_id" + element.id + "&start_at=" + datetime + "&apikey=" + apikey)
            console.log(element.id)
            $.ajax({
              url: showtimesURL,
              method: "GET"
            }).then(function (response) {
              console.log(response.showtimes[0])
              list.text(response.showtimes.start_at)
              

            })
          })
        })

      }



    })




  });
})














