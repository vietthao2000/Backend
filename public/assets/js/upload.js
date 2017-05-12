var app = new Vue({
	el: "#image-form",
	data: {
		name: "",
		imageLink: "",
		description: "",
		submitted: 0,
		submitStatus: "",
		submitClass: "alert alert-success"
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
				if (json.err) {
					this.submitClass = "alert alert-danger";
					this.submitStatus = "Error: "+json.err;
					this.submitted=1;
					this.name = "";
					this.imageLink = "";
					this.description = "";
				}
				else { 
					this.submitClass = "alert alert-success";
					this.submitStatus = "Success, image id: "+json._id;
					this.submitted=1;
					this.name = "";
					this.imageLink = "";
					this.description = "";
				}
			});
		}
	}
})