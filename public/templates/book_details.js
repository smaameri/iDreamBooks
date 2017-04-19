var bookDetailsTemplate = 
	`
		<div id='bookDetailsMain'>
			{{#if book.title}}
				<p class='bookTitle'>{{book.title}} {{#if book.sub_title}}:{{book.sub_title}}{{/if}} <span class='bookAuthor'>by {{book.author}}</span></p>
				{{#if book.rating}}
					<p class='bookRating'>{{book.rating}}% rating</p>
				{{/if}}
				<p>{{book.genre}}, {{book.pages}} pages, released on {{book.release_date}}</p>
				<p>{{book.review_count}} review{{#if (is_equal book.review_count)}}s{{/if}}</p>
			</div>
			<div>
			
			  <!-- Nav tabs -->
			  <ul class="nav nav-tabs" role="tablist">
			    <li role="presentation" class="active"><a href="#reviewsTab" aria-controls="reviewsTab" role="tab" data-toggle="tab">Top Reviews</a></li>
			    <li role="presentation"><a href="#showsTab" aria-controls="showsTab" role="tab" data-toggle="tab">TV Show Appearences</a></li>
			  </ul>

			  <!-- Tab panes -->
			  <div class="tab-content">
			    <div role="tabpanel" class="tab-pane fade in active" id="reviewsTab">
						{{#if (get_length book.critic_reviews)}}
							{{#each book.critic_reviews}}
								<div class='bookReview'>
									<select class='reviewRating' id='reviewRating-{{@index}}'>
									  <option value="1">1</option>
									  <option value="2">2</option>
									  <option value="3">3</option>
									  <option value="4">4</option>
									  <option value="5">5</option>
									</select>
									<img class='reviewPublicationLogo' src={{source_logo}} >
									<p class='reviewPublicationTitle'><a href='{{review_link}}' target='_blank'>{{source}}</a></p>
									<p>{{review_date}}</p>
									<p>{{snippet}}</p>
								</div>
							{{/each}}
						{{else}}
							<p class='noResults'>No reviews for this book</p>
						{{/if}}	
					
					</div>
			    <div role="tabpanel" class="tab-pane fade" id="showsTab">
						{{#if (get_length books.shows)}}
							<table class='table table-striped'>
							  <tr>
							    <th>Channel</th>
							    <th>Air Date</th>
							  </tr>
								{{#each books}}
									{{#each shows}}
					  				<tr>
									    <td>{{showName}}</td>
									    <td>{{showDate}}</td>
									  </tr>
									{{/each}}
								{{/each}}
							</table>
						{{else}}
							<p class='noResults'>No TV appearances for this book</p>
						{{/if}}	
					</div>
				{{else}}
					<p class='noResults'>No book results for this search</p>
				{{/if}}	
		</div>
	`
