function currencyFormatTest() {
	var assert = chai.assert;

	describe('General format test', function() {
		function currencyTest(value, result) {
			let formater = new CurrencyFormat;
			it('Formatted value `' + value + '` must looks like ' + result, function() {
				assert.equal(formater.format(value), result );
			});
		}
		currencyTest( 1.005, '$1.01' );
		currencyTest( 1.995, '$2.00' );
		currencyTest( .235, '$0.24' );
		currencyTest( .5, '$0.50' );
		currencyTest( 1, '$1.00' );
		currencyTest( 1.5, '$1.50' );
		currencyTest( 999, '$999.00' );
		currencyTest( 1000, '$1,000' );
		currencyTest( 1000.5, '$1,000.50' );
		currencyTest( 1000000, '$1,000,000' );
		currencyTest( 1000000.5, '$1,000,000.50' );
	});
}
