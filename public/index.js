//API Key to access idreambooks APIs
var apiKey = 'ae681fdeef7a192e0e05f716f70d36aec4903cc7';


//API URLs to access idreambooks data

//API to access top 25 most recent book reviews by Genre
var genresURL    = `https://idreambooks.com/api/publications/recent_recos.json?key=${apiKey}`
// API to access book details and reviews for a certain book
var detailsURL   = `https://idreambooks.com/api/books/reviews.json?key=${apiKey}`;
//API to access most TV Channel appearence for a certain book.
var bookShowsURL = `https://idreambooks.com/api/books/show_features.json?key=${apiKey}`;
//API to access most recently featured books on all TV Channels.
var showsURL     = `https://idreambooks.com/api/shows/books_featured.json?key=${apiKey}`;

//Array to store list of genres from genres.json
var genres = []

//Object to store all the handlebar templates.
var templates = {
	booksByGenre:'',
	bookDetails:'',
	genresList:'',
	searchForm:'',
	navbar:''
}


$(() => {
	
////AJAX Calls to get templates and data	
	//Generate Genre List
	$.when(
		//Get template for Genres List
	  $.ajax( "templates/genre_list.js"),
	  //Get data list for Genre List
		$.getJSON("data/genres.json"))
		.done((first_call, second_call) => {
			genres = second_call[0];
			templates.genresList = genreListTemplate;
			//render Genre List
			renderGenresList();
		})
		
	$.getScript( "templates/navbar.js", () => {
		templates.navbar = navbarTemplate;
    var element = $('#navbarTemplate');
		renderNavbar();
	});
		
	$.getScript( "templates/books_list.js", ()  => {
		templates.booksByGenre = booklist;
	});
	
	$.getScript( "templates/shows_list.js", () => {
		templates.bookDetails = bookDetailsTemplate;
		var hash 	= decodeURI(window.location.hash);
		var temp  = hash.split('/')[0];
		if(temp   = '#shows')
			renderPage(hash);
	});
	
	$.getScript( "templates/book_details.js", () => {
		templates.bookDetails = bookDetailsTemplate;
		var hash 	= decodeURI(window.location.hash);
		var temp  = hash.split('/')[0];
		if(temp   = '#bookdetails')
			renderPage(hash);
	});

//END OF 
	
	
	//Load inital view based on url hash value
  var hashURL = decodeURI(window.location.hash);
	//renderPage(hashURL);
	
	// On every hash change the render function is called with the new hash.
	// This is how the navigation of our app happens.
 	$(window).on('hashchange', () => {
 		renderPage(decodeURI(window.location.hash));
 	});

	
////AJAX Calls to APIs to get data. Function make call to render
	//the appropriate template once the response returns
	
	//Get top 25 books for a certain Genre
	function getBooksListByGenre(genre){
		var searchURL = genresURL;
		if(genre)
			searchURL = genresURL.concat(`&slug=${genre}`)
		$.ajax(searchURL)
			.done((response) => {
				renderBooksByGenreList(response);
		})
	}
	
	//Get details on book including reviews and show appearences.
	function getBookDetails(id){
		var currentSearchURL = detailsURL.concat(`&q=${id}`)
		var currentShowshURL = bookShowsURL.concat(`&q=${id}`)
		
		$.when(
		  $.ajax(currentSearchURL),
		  $.ajax(currentShowshURL))
			.done((first_call, second_call) => {
				var obj = Object.assign(first_call[0], second_call[0]);
					renderBookDetailsPage(obj);
			})
		}
		
		//Get most recent appearences of any book on all shows
		function getShows(){
			$.ajax(showsURL)
				.done((response) => {
					renderShowsPage(response)
			})
		}
	
//////All routing is carried out through the function renderPage. Anytime the hash url is changed, this
		//function is called and the appropriate page is shown based on the url hash value.
	
		function renderPage(url) {
			// Hide whatever page is currently shown.
			$('.page').hide();

			var map = {
				// The Homepage.
				'': () => {
					//render home page
					getBooksListByGenre('all-books');
				},
			
				// The list of books by Genre (View 1)
				'#genre': () => {
					//get URL for book based on ISBN
					var genre = url.split('#genre/')[1].trim();
					//render book details page
					getBooksListByGenre(genre);
				},
			
				// The Book Details Page (View 2)
				'#bookdetails': () => {
					//get URL for book based on ISBN
					var id = url.split('#bookdetails/')[1].trim();
					//render book details page
					getBookDetails(id);
				},
			
				//The Show Appearences Page (View 3)
				'#shows': () => {
					//render the Recent Show Appearencess page
					getShows();
				}
			};
		
			// Get the keyword from the url.
			var temp = url.split('/')[0];
		
			// Execute the needed function depending on the url keyword (stored in temp).
			if(map[temp]){
				map[temp]();
			}
			// If the keyword isn't listed in the above - render the error page.
			else {
				console.log('error no URL')
			}
		}
	
	})
	
		
////Rendering functions to render the templates
	
	//General rendering function. Takes 3 arguments:
	// 1 - element - HTML element where the template is to be rendered
	// 2 - templateScript - the handlebars template script that will be used to generate the template
	// 3 - data - the data which needs to be passed into the template script so it can be rendered as HTML
	function renderTemplateFunction(element, templateScript, data){
		//empty current element
		element.empty()
		//compile the template with the data and append it to the selected HTML element
    var theTemplate = Handlebars.compile(templateScript);
		element.append(theTemplate(data));
		//show the element again, which now containes the compiled template.
    element.show();
	}
	
	//Fixed Templates Components which are the same on all views
	
	//Renders the list of book genres
	function renderGenresList(){
		var page = $('#genres-list')
		renderTemplateFunction(page, templates.genresList, genres)
	}
	
	//Renders the search form
	function renderNavbar(){
    var element = $('#navbarTemplate');
		renderTemplateFunction(element, templates.navbar)
		
		//Update form so that on submit of query an 
		//Ajax call is triggered to get book details for the query query
		element.find('form').submit((event) => {
		  event.preventDefault();
			var query = $('#searchForm input').val()
  		window.location.hash = `bookdetails/${query}`;
		})
	}
		
	//Renders the star ratings which can be seen in the critic review of the book detail views 
	function renderStarRatings(className, rating){
		$(className).barrating({
	    theme: 'fontawesome-stars-o',
			initialRating: rating,
			readonly: true
	  });
	}
	
	//Templates which change depending on the selected view
	//The 3 switching vies in this Single Page Application are
	// 1 - the list of books by genre
	// 2 - detailed view of a selected book
	// 3 - view which shows books appearing on recent TV Channels
	
	//View 1 - list of books by Genre
	function renderBooksByGenreList(data){
		var page = $('#books-by-genre-list');
		renderTemplateFunction(page, templates.booksByGenre, data)
			
		//update the id of the book li elements to be the ISBN of the book
		page.children().each((index, item) => {
			var isbn = data[index].isbns.split(',')[0]
			item.id = isbn
		})
	
		//add onClick function to each of the book li elements.
		//click causes an Ajax call to find the book details based on the books ISBN
    page.find('.bookResult').on('click', (e) => {
			var id = event.target.closest('.bookResult').id;
  		window.location.hash = `bookdetails/${id}`;
		})
  }
	
	// View 2 - detailed view of a selected book
	function renderBookDetailsPage(data){
    var page = $('#book-details');
		renderTemplateFunction(page, templates.bookDetails, data)
		
		var reviews = data.book.critic_reviews;
		//Loop through each of the books top reviews and generate a start
		//image rating based on the rating given by that review.
		if(reviews){
			reviews.map((item, index) => {
				var className = `#reviewRating-${index}`;
				var rating = item.star_rating;
				renderStarRatings(className, rating);			
			})
		}
	}
	
	//View 3 - view which shows books appearing on recent TV Channels
	function renderShowsPage(data){
    var page = $('#all-shows');
		renderTemplateFunction(page, showsTemplate, data)
	}
	

//Handle Bar Template Helpers

	//Whether to display the singlur or plural of a word
	//E.g if number of reviews is equal to 1, print 'review', else print 'reviews'
	Handlebars.registerHelper('is_equal', (a) => {
    if(a === 1) 
      return false;
    else
      return true;
	});
	
	Handlebars.registerHelper('get_length', (array) => {
		if(array === undefined || array.length === 0) 
      return false;
    else
      return true;
	});
	

