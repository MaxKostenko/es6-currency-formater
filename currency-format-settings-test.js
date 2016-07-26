function currencyFormatSettingsTest() {
	var assert = chai.assert;
	describe('Change settings test', function() {
		
		function settingsTest(value, settings_before, settings_after, result_before, result_after) {
			let formater = new CurrencyFormat(settings_before);
			let text = 'Value `' + value + 
				'` must looks like before settings changing:' + result_before + 
				' after settings changing:' + result_after 
			it(text, function() {
				assert.equal(formater.format(value), result_before );
				formater.settings = settings_after;
				assert.equal(formater.format(value), result_after );
			});
		}
		
		settingsTest(1.5,{},{},'$1.50','$1.50');
		settingsTest(1.5,{},{currencySignFirst:false,currencySign:' грн',group:' ',decimal:'.' },'$1.50','1.50 грн');
		settingsTest(1000.5,{},{currencySignFirst:false,currencySign:' грн',group:' ',decimal:'.' },'$1,000.50','1 000.50 грн');
		settingsTest(995.5,{currencySignFirst:false,currencySign:'$'},{currencySignFirst:false,currencySign:' грн',group:' ',decimal:'.' },'995.50$','995.50 грн')
	});
}
