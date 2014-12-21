http = require("http");
// Base URI for Web service
//var users = process.argv.slice(2);
//users.forEach(profile.get);

var pair_input = process.argv.slice(2);
printDetail = function(name, rate, time, date){
	console.log("The exchange rate for "+name+" is "+rate+", at "+time+" "+date)
}

function get(pair_input){
	var query = 'select * from yahoo.finance.xchange where pair in ("'+pair_input+'")';
	var encoded_query = encodeURIComponent(query);
	var yql_base_uri = "http://query.yahooapis.com/v1/public/yql?q="+encoded_query+"&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

	request = http.get(yql_base_uri, function(response){
		var body = '';

		response.on('data', function(chunk){
			body += chunk;
		});//end response data
		response.on('end', function(){
			var profile = JSON.parse(body);
			printDetail(profile.query.results.rate.Name, profile.query.results.rate.Rate,profile.query.results.rate.Time, profile.query.results.rate.Date)
		});
	});
}//end get

pair_input.forEach(get)