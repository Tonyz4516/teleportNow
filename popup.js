document.addEventListener('DOMContentLoaded', function () {
	var button = document.getElementById('teleportButton');
	button.addEventListener('click', teleportToPage);

	var input = document.getElementById('newitem');
	input.addEventListener('keypress', function (e){
		if (e.code === "Enter") teleportToPage();
	});
});

function teleportToPage() {
	let targetUrl;
	let newItem = document.getElementById("newitem").value;
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		targetUrl = tabs[0].url;
		urlArray = targetUrl.split('/');
		// only keep the first part of the url
		targetUrl = urlArray[0] + '//' + urlArray[2] + '/';
		chrome.tabs.create({
			url: targetUrl + newItem,
		});
	});
}