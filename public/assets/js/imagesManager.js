var app = new Vue({
	el: "#image-form",
	data: {
		collection: [],
		submitted: 0,
		submitStatus: "",
		submitClass: "alert alert-success",
		errors: {}
	},
	mounted() {
		fetch("/api/images",{'mode': 'no-cors'})
			.then(response => {return response.json()})
				.then(json => {
					this.collection=json;
				})
	},
	methods: {
		update() {

		},
		del(id) {
			fetch("/api/images", {
				credentials: 'include',
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: id
				})
			})
			.then(response => {
				return response.json();
			})
			.then(json => {
				if (json.errors) {
					this.submitClass = "alert alert-danger fadeIn";
					this.submitStatus = "Error. ";
					this.errors = json.errors;
					this.submitted = 1;
				}
				else { 
					this.submitClass = "alert alert-success fadeIn";
					this.submitStatus = "Success";
					this.submitted=1;
					this.errors = "";
					this.name = "";
					this.imageLink = "";
					this.description = "";
					this.collection.forEach((element, index) => {
						if (element.id===id) {
							this.collection.splice(index, 1);
						}
					});
				}
			});;
		}
	}
});