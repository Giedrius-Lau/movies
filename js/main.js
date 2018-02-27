var titles = [],
movies = 'Batman',
$searchButton = $('.searchButton'),
$searchInput = $('.searchInput'),
$appBackground = $('#appBackground'),
$myTable = $('#myTable'),
$containerCards = $('.container-cards'),
$jumbotron = $('.jumbotron'),
$appTable = $('#appTable'),
btns = $(".navigationButtons"),
displaybtns = $(".displayButtons"),
sortingbtns = $(".sortingButtons");


getInfo(movies);


function button(objButton){
    getInfo(objButton.value)
}


$searchInput.on('keydown', function(e) {
    if (e.which == 13) {
      var title = $searchInput.val();
      getInfo(title);
      $searchInput.val('');
      $('.active').removeClass('active');
    }
});

function changeBackground(objectImg){
  $appBackground.css('background-image','url('+objectImg.src+')');
}

function movie(index, title, image, year){
  this.title = title;
  this.image = image;
  this.year = year;
  this.index = index + 1;
  if(this.image === 'N/A') {
    this.image = 'https://i.pinimg.com/736x/e5/f6/75/e5f67554da8c3bc8ef7237608c87d7a7.jpg'
  }

  $appBackground.css('background-image','url('+ this.image +')');


    $jumbotron.append(
      `
      <div class="card h-100" style="width: 18rem;">
          <img onclick="changeBackground(this)" class="card-img-top" src=${this.image} alt=${this.title}>
            <div class="card-body">
            <p class="card-text card-text-title">${this.title}</p>
            <p class="card-text card-text-year">${this.year}</p>
        </div>
      </div>
      `
    ).fadeIn(100);

    $appTable.append(
      `
      <tr>
        <td><img onclick="changeBackground(this)" src=${this.image} alt=${this.title}/></td>
        <td class="card-text-title">${this.title}</td>
        <td class="card-text-year">${this.year}</td>
      </tr>
      `
    )
}

function getInfo(movieTitle) {
  $.get(`https://www.omdbapi.com/?i=tt3896198&apikey=75847c2e&s=${movieTitle}`, (data) => {
    $jumbotron.empty();
    $appTable.empty();
    $.each(data.Search, (i, val) => {
      titles.push(val.Title, val.Poster, val.Year)
      movie(i, val.Title, val.Poster, val.Year)
    })
    if($myTable.css('display') !== "none"){
      $containerCards.hide(300)
    }
    arrangeDate();
  })
}





var funktDown = function(a, b) {
    var valueA = $(a).find(".card-text-year").text();
    var valueB = $(b).find(".card-text-year").text();

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
}
var funktUp = function(a, b) {
    var valueA = $(a).find(".card-text-year").text();
    var valueB = $(b).find(".card-text-year").text();

    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
}

var funktDown2 = function(a, b) {
    var valueA = $(a).find(".card-text-title").text();
    var valueB = $(b).find(".card-text-title").text();

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
}
var funktUp2 = function(a, b) {
    var valueA = $(a).find(".card-text-title").text();
    var valueB = $(b).find(".card-text-title").text();

    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
}



function arrangeDate() {
  var items = $('.card').get();
  var items2 = $('#appTable tr').get();

  items.sort(funktDown);
  items2.sort(funktDown);

  $(".jumbotron").empty().append(items);
  $("#appTable").empty().append(items2);
}


function arrangeDate2() {
  var items = $('.card').get();
  var items2 = $('#appTable tr').get();

  items.sort(funktUp);
  items2.sort(funktUp);

  $(".jumbotron").empty().append(items);
  $("#appTable").empty().append(items2);
}


function arrangeTitle() {
  var items = $('.card').get();
  var items2 = $('#appTable tr').get();

  items.sort(funktDown2);
  items2.sort(funktDown2);

  $(".jumbotron").empty().append(items);
  $("#appTable").empty().append(items2);
}


function arrangeTitle2() {
  var items = $('.card').get();
  var items2 = $('#appTable tr').get();

  items.sort(funktUp2);
  items2.sort(funktUp2);

  $(".jumbotron").empty().append(items);
  $("#appTable").empty().append(items2);
}


  btns.each(function(){
  $(this).on("click", function() {
    var current = $(".active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
});

displaybtns.each(function(){
$(this).on("click", function() {
    var current = $(".active2");
    current[0].className = current[0].className.replace("active2", "");
    this.className += " active2";
  });
});

sortingbtns.each(function(){
$(this).on("click", function() {
    var current = $(".active3");
    current[0].className = current[0].className.replace("active3", "");
    this.className += " active3";
  });
});
