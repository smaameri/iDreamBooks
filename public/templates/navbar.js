var navbarTemplate = 
	`
		<nav class="navbar navbar-default navbar-fixed-top">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#">
						<img src='./img/logo.png'>
						<span>Books</span>
					</a>
		    </div>
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<div id='searchForm'>
				    <form class="navbar-form navbar-left">
				      <div class="form-group">
				        <input type="text" class="form-control" placeholder="Search for Title, Author, ISBN ...">
				      </div>
				    </form>
					</div>
					<ul class="nav navbar-nav navbar-right">
		        <li><a href='#shows'>Recent TV Show Appearances</a></li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
	`