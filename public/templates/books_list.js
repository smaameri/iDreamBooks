var booklist = 
	`{{#each this}}
  	<div id='{{isbns}}' class='bookResult grid-item'>
			<img class='reviewRatingImage' src={{review_rating_image}}>
			<p class='bookTitle'>{{title}} <span class='bookAuthor'>by {{author}}</span></p>
			<div class='reviewPublicationLogo' style="background-image:url({{review_publication_logo}})"s></div
			<p class='reviewPublication'>Reviewed by the {{review_publication_name}} on {{review_date}}</p>
			<p class='reviewSnippet'>"{{review_snippet}}"</p>
	</div>
	{{/each}}`

