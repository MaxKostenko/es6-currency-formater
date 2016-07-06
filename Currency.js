export default class CurrencyFormat {

	constructor( { currencySignFirst = true, currencySign = '$', group = ',', decimal = '.' } ) {
		this.currencySignFirst = currencySignFirst;
		this.currencySign = currencySign;
		this.group = group;
		this.decimal = decimal;
	}

	set currencySignFirst( isFirst ) {
		if( typeof isFirst == 'string' ) {
			this.isSignFirst = !( ( isFirst === 'false' ) ||
			( isFirst === '0' ) ||
			( isFirst === 'null' ) );
		} else {
			this.isSignFirst = !!isFirst;
		}
	}

	get currencySignFirst() {
		return this.isSignFirst;
	}

	set localSetting( settings ) {

		if( settings.currencySignFirst != undefined ) {
			this.currencySignFirst = settings.currencySignFirst;
		}

		if( settings.currencySign ) {
			this.currencySign = settings.currencySign;
		}
		if( settings.group ) {

			this.group = settings.group;
		}
		if( settings.decimal ) {
			this.decimal = settings.decimal;
		}
	}

	format( number ) {
		let formattingNumber = this.formatDigits( number );
		return this.currencySignFirst ? this.currencySign + formattingNumber : formattingNumber + ' ' + this.currencySign;
	}

	formatDigits( number ) {
		let integer_part = Math.floor(number);
		let fraction_part = number % 1;
		fraction_part = ( !fraction_part ) && ( integer_part > 999 ) ? '' :   this.decimal + String( fraction_part.toFixed( 2 ) ).substr( 2 );
		return String( integer_part ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + this.group ) + fraction_part;
	}
}
