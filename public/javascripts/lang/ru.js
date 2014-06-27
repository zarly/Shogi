
var dict = {
	'Shogi': 'Сёги',
	'': '',
};

module.exports = function (str) {
	return dict[str] || str;
};
