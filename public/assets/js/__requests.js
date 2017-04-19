var put = (url, form) => {
	var id = parseInt(document.getElementById("putId").value);
	var name = document.getElementById("putName").value;
	var imageLink = document.getElementById("putImageLink").value;
	var description = document.getElementById("putDescription").value;
	fetch(url, {
		method: "PUT",
		body: JSON.stringify({"name":name, "imageLink":imageLink, "description":description, "id":id})
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