var app1 = new Vue({
	el: "#thumbnails",
	data: {
		thumbnails: []
	},
	mounted() {
		fetch("/api/images",{credentials : 'include'})
			.then(response => {return response.json()})
				.then(json => {
					json.forEach((image, index) => {
						let date = new Date(image.date);
						let year = date.getFullYear();
						let month = date.getMonth()+1;
						let dt = date.getDate();

						if (dt < 10) {
						  dt = '0' + dt;
						}
						if (month < 10) {
						  month = '0' + month;
						}
						let final =dt + "/" + month + "/" + year;
						json[index].date = final;
					});
					this.thumbnails=json;
				})
	},
	methods: {
		addPlus() {
			alert();
		}
	}
});