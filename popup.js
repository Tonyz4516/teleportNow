document.addEventListener('DOMContentLoaded', function () {
	var button = document.getElementById('teleportButton');
	button.addEventListener('click', teleportToPage);

	var input = document.getElementById('newitem');
	input.addEventListener('keypress', function (e){
		if (e.code === "Enter") teleportToPage();
	});
});

function teleportToPage() {
	let targetUrl, tabIndex, polarisPrefix, classicPrefix;
	let newItem = document.getElementById("newitem").value;
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		targetUrl = tabs[0].url;
		tabIndex = tabs[0].index;

		polarisPrefix = 'now/nav/ui/classic/params/target/';
		let polarisPage = targetUrl.includes(polarisPrefix);
		classicPrefix = 'nav_to.do?uri=%2F';
		let classicPage = targetUrl.includes(classicPrefix);

		urlArray = targetUrl.split('/');
		// only keep the first part of the url, add prefix depend on the UI type
		if (polarisPage) {
			targetUrl = urlArray[0] + '//' + urlArray[2] + '/' + polarisPrefix;
		} else if (classicPage) {
			targetUrl = urlArray[0] + '//' + urlArray[2] + '/' + classicPrefix;
		} else {
			targetUrl = urlArray[0] + '//' + urlArray[2] + '/';
		}

		newItem = newItem.replace('.list', '_list.do')

		// shortcut
		if (newItem in tableNames) {
			chrome.tabs.create({
				url: targetUrl + tableNames[newItem],
				index: tabIndex + 1,
			});
		} else {
			chrome.tabs.create({
				url: targetUrl + newItem,
				index: tabIndex + 1,
			});
		}
	});
}

let tableNames = {
	install: 'cmdb_sam_sw_install_list.do',
	subscription: 'samp_sw_subscription_list.do',
	scriptinclude: 'sys_script_include_list.do',
	businessrule: 'sys_script_list.do',
	entitlement: 'alm_license_list.do',
	softwaremodel: 'cmdb_software_product_model_list.do',
	discoverymodel: 'cmdb_sam_sw_discovery_model_list.do',
	discovery: 'cmdb_sam_sw_discovery_model_list.do',
	table: 'sys_db_object_list.do',
	runrecon: 'ui_page_process.do%3Fname%3Dsamp_run_reconciliation_by_publisher',
	historicalresult: 'samp_reconciliation_result_list.do',
	historicalresults: 'samp_reconciliation_result_list.do',
	licenseworkbench: '$sam.ui',
};
tableNames['- b'] = 'sys.scripts.do';