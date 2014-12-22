
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

	var street = $("#street").val();
	var city = $("#city").val();
	var address = street + ", " + city;
	$body.append('<img class="bgimg" src=" https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + 
	address + '">');
   $greeting.text("So, you want to live at " + address + "?");
	var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + 
	city + "&sort=newest&api-key=a351df13b09fd7ade32de615e7776aa5:17:70501973";
   $.getJSON(url, function(data) {
		$nytHeaderElem.text("New York Times Articles About " + city);
		
		var items = data.response.docs;
		for(var i = 0; i<items.length; i++) {
			var article = items[i];
			$nytElem.append("<li class='article'>" + "<a href='" + article.web_url + 
			"'>" + article.headline.main + "</a> <p>" + article.snippet + "</p> </li>" );
		};
	}).error (function() {
		$nytHeaderElem.text("There was an error in the page request.");
	});
	
	var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" +
	city + "&format=json&callback=wikiCallback";
	
	$.ajax(wikiUrl, {
		dataType: "jsonp",
		success: function(response) {
			var articleList = response[1];
			for(var i = 0; i < articleList.length; i++) {
				var articleStr = articleList[i];
				var url = "http://en.wikipedia.org/wiki/" + articleStr;
				$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
			};
		}
	});
	
    return false;
};

$('#form-container').submit(loadData);

// loadData();
