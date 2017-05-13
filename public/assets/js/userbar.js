var app2 = new Vue({
	el: "#userbar",
	data: {
		user: false,
		s: "",
		searched: []
	},
	mounted() {
		fetch("/api/users/me",{
			credentials: 'include'
		})
		.then(response => {
			return response.json()
		}).then(json => {
			this.user = json.username?json:false;
		});
	},
	methods: {
		search() {
			fetch("/api/images?s="+this.s)
			.then(resp => {
				return resp.json()
			}).then(json => {
				this.searched = json;
			});
		}
	}
});