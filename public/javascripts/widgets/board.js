
var sizeX = 9;
var sizeY = 9;

function Board($scope) {
	$scope.cells = [];
}

if (window.Board !== undefined) {
	console.error('Board already defined');
} else {
	window.Board = Board;
}
