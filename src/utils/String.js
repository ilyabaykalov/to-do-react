// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
	if (!this) return this;

	return this[0].toUpperCase() + this.slice(1);
};
export default String;
