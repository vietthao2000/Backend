var nav = new Vue({
	el: "#nav",
	components: {
		navbar:
		{
			template:
			`
			<!-- Navbar -->	
			<nav class="navbar navbar-default" role="navigation" id="userbar">
				<div class="container-fluid">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="/">Gallery</a>
					</div>
			
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse navbar-ex1-collapse">
						<!-- Navigation tabs -->
						<ul class="nav navbar-nav">
							<li class="active"><a href="/">Showcase</a></li>
							<li><a href="/login" v-if="!user || user.guest">Login</a></li>
							<li><a href="/upload" v-if="!(!user || user.guest)">Upload</a></li>
							<li><a href="/imagesManager" v-if="!(!user || user.guest)">Images Manager</a></li>
						</ul>
						<form class="navbar-form navbar-left" role="search">
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Search">
							</div>
							<button type="submit" class="btn btn-default">Submit</button>
						</form>
						<ul class="nav navbar-nav navbar-right" v-if="user">
							<!-- Avatar -->
							<li><img class="img img-responsive img-circle" id="small-avatar" :src="user.avatar"></li>

							<!-- Username dropdown -->
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									{{user.username}}
									<b class="caret"></b>
								</a>
								<ul class="dropdown-menu">
									<li v-if="!(!user || user.guest)"><a href="/api/users/signout">Logout</a></li>
									<li v-if="!user || user.guest"><a href="/login">Login</a></li>
								</ul>
							</li>
						</ul>
					</div><!-- /.navbar-collapse -->
				</div>
			</nav>
			`
		}
	},
	data: {
		tabs: [
			{
				href: "/",
				showOnLogin: true,
				showOnLogout: true,
				text: "Showcase"
			},
			{
				href: "/login", 
				showOnLogin: false, 
				showOnLogout: true, 
				text: "Login"
			},
			{
				href: "/upload", 
				showOnLogin: true, 
				showOnLogout: false, 
				text: "Upload"
			},
			{
				href: "/imagesManager", 
				showOnLogin: true, 
				showOnLogout: false, 
				text: "Images Manager"
			},
		]
	}
});