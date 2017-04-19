var genreListTemplate = 
	`
		<p id='genresTitle'>Genres</p>
		{{#each this}}
	 	 <li><a href='#genre/{{this.id}}' id={{this.id}}>{{this.display}}</a></li>
		{{/each}}
	`