var showsTemplate = 
	`
		<h3>Books recently featured in shows</h3>
		{{#each books}}
		<h4>{{title}}, {{author}}</h4>
		<h5>Featured In</h5>
			{{#each shows}}
				<p>{{showName}} on {{showDate}}</p>
			{{/each}}
		{{/each}}
	`
