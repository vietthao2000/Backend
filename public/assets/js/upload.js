var app = new Vue({
	el: "#image-form",
	data: {
		name: "",
		imageLink: "",
		description: "",
		submitted: 0,
		submitStatus: "",
		submitClass: "alert alert-success",
		errors: {}
	},
	methods: {
		submit() {
			fetch('/api/images/',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					name: this.name,
					imageLink: this.imageLink,
					description: this.description
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
					this.submitStatus = "Success, image id: "+json._id;
					this.submitted=1;
					this.errors = "";
					this.name = "";
					this.imageLink = "";
					this.description = "";
				}
			});
		}
	}
})