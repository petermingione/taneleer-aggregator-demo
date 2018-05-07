// Peter Mingione - Taneleer Aggregator Demo - Angular App Controllers

// Create the controller
appModule.controller('appCtrl', function($scope, $http) {

	// Formats date strings
	$scope.formatDate = function(date){
	      var dateOut = new Date(date);


	      return dateOut;
	};
	// Show the overlay when the view button is clicked
	$scope.showOverlay = function(index){
		document.getElementsByClassName("page-overlay" + index)[0].style.opacity = 1;
		document.getElementsByClassName("page-overlay" + index)[0].style["pointer-events"] = "auto";
		document.getElementsByClassName("user" + index)[0].innerHTML = "@" + $scope.insideData[index].user;
		document.getElementsByClassName("caption" + index)[0].innerHTML = $scope.insideData[index].caption;

		// Create the third text line in the overlay (The line that begins with Posted...)
		document.getElementsByClassName("created-date" + index)[0].innerHTML = "Posted " 
		// Create the date by getting the date from the createDate object, 
		// then format the date using the formatDate method,
		// then make the date relative to today's date using moment.js
		+ moment($scope.formatDate($scope.insideData[index].createdDate.date)).fromNow() 
		// Add a link to the original page on either Twitter or Instagram
		+ " via <a href='" 
		+ $scope.insideData[index].url 
		+ "' target='_blank'>" 
		+ $scope.insideData[index].service 
		+ "</a>";

		// Determine whether the page is from Twitter or Instagram and format the page accordingly
		if($scope.insideData[index].service == "Twitter"){
			document.getElementsByClassName("image-wrapper" + index)[0].style.display = "none";
			document.getElementsByClassName("text" + index)[0].style.width = "100%";
		}else{
			document.getElementsByClassName("page-image" + index)[0].style.display = "inline-block";
			document.getElementsByClassName("text" + index)[0].style.width = "33%";
		}
	}

	// Hide the overlay when the close (X) button is clicked
	$scope.hideOverlay = function(index){
		document.getElementsByClassName("page-overlay" + index)[0].style.opacity = 0;
		document.getElementsByClassName("page-overlay" + index)[0].style["pointer-events"] = "none";
	}

	// Show the next overlay when the next (>) button is clicked
	$scope.nextOverlay = function(index){
		$scope.index = index;
		$scope.hideOverlay($scope.index);
		$scope.showOverlay($scope.index + 1);	
	}

	// Show the previous overlay when the prev (<) button is clicked
	$scope.prevOverlay = function(index){
		$scope.index = index;
		$scope.hideOverlay($scope.index);
		$scope.showOverlay($scope.index - 1);
	}

	// Page Initialization
	$http({
			method : "GET",
			url : "https://taneleer.composedcreative.com/api/v1/feed/a0329f16-9225-11e6-89bb-296a97b9d609/bb0429f6-f0ca-11e7-8f5d-d92739a9a53f"
	})
	.then(	function mySucces(response) {
				$scope.myMessage = "Success!";

				$scope.response = response;
				$scope.meta = response.data.meta;
				$scope.outsideData = response.data;
				$scope.insideData = response.data.data;
				$scope.links = response.data.links;

				$scope.selfLink = response.data.links.self;
				$scope.firstLink = response.data.links.first;
				$scope.lastLink = response.data.links.last;
				$scope.nextLink = response.data.links.next;
				$scope.prevLink = response.data.links.prev;

				$scope.statuscode = response.status;
				$scope.statustext = response.statusText;
				$scope.statusheaders = response.headers(); 
				$scope.statusconfig = response.config;   
			}, 
			function myError(response) {
				$scope.myMessage = "Error!";
				$scope.response = response;
				$scope.statuscode = response.status;
				$scope.statustext = response.statusText;
				$scope.statusheaders = response.headers(); 
				$scope.statusconfig = response.config;   
			});

	// Get next page from the server
	$scope.getNext = function() {
		$http({
			method : "GET",
			url : $scope.nextLink
		})
		.then(	function mySucces(response) {
					$scope.myMessage = "Success!";

					$scope.response = response;
					$scope.outsideData = response.data;
					$scope.meta = response.data.meta;

					$scope.insideData = $scope.insideData.concat(response.data.data);
				
					$scope.links = response.data.links;
					$scope.selfLink = response.data.links.self;
					$scope.firstLink = response.data.links.first;
					$scope.lastLink = response.data.links.last;
					$scope.nextLink = response.data.links.next;
					$scope.prevLink = response.data.links.prev;

					$scope.statuscode = response.status;
					$scope.statustext = response.statusText;
					$scope.statusheaders = response.headers(); 
					$scope.statusconfig = response.config;   
				}, 
				function myError(response) {
					$scope.myMessage = "Error!";
					$scope.response = response;
					$scope.statuscode = response.status;
					$scope.statustext = response.statusText;
					$scope.statusheaders = response.headers(); 
					$scope.statusconfig = response.config;   
				});
	}

	// When the scrollbar lands at the bottom of the page get next page form the server
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			$scope.getNext();
		}
	});
});
	