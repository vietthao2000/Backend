// v-model="message" 
// v-on:click="addName" v-on:keyUp="addName"
// v-for="name in names"
// v-text
// :title="Hover me"
// :class="className"

// new Vue({
// 	el: "#root",
// 	data: {
// 		message: "test",
// 		newName: "",
// 		names: ["Thao","Tu","Viet"]
// 	},
// 	methods: {
// 		addName() {
// 			this.names.push(this.newName);
// 			this.newName = "";
// 		}
// 	},
// 	mounted() {console.log("Mounted")}
// });		

// Vue.component('task', {
// 	template: "<li><b><slot></slot></b><li>",
// 	data() {
// 		return {
// 			message: "It works"
// 		}
// 	}
// });

// new Vue({
// 	el: "#tasks",
// 	data: {
// 		ts: ["Work1", "Work2", "Work3"]
// 	}
// });

// var app = new Vue({
// 	el: "#test",
// 	data: {
// 		message: "It works"
// 	}
// });

var app1 = new Vue({
	el: "#thumbnails",
	data: {
		thumbnails: [],
	},
	mounted() {
		fetch("http://localhost:6969/api/image",{'mode': 'no-cors'})
			.then(response => {return response.json()})
				.then(json => {this.thumbnails=json;})
	}
})