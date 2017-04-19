var put = (url, form) => {
	fetch(url, {
		method: "PUT",
		body: new FormData(form)
	}).then(function(response) {
		return response.text()
	}).then(function(body) {
		document.getElementById("status").innerHTML = body;
	});;
}

var del = (url, id) => {
	fetch(url+"?id="+id, {
		method: "DELETE"
	}).then(function(response) {
		return response.text()
	}).then(function(body) {
		document.getElementById("status").innerHTML = body;
	});
}

var putImage = () => {
	var form = document.getElementById("putForm");
	put('/image',form);
};

var delImage = () => {
	var id = document.getElementById('delId').value;
	del('/image',id);
};