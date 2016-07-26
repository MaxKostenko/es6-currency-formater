class CurrencyFormat {

	constructor( settings = {} ) {
		this.settings = Object.assign( this.default, settings );
	}
	
	get default() {
		return { 
			currencySignFirst:true,
			currencySign:'$',
			group:',',
			decimal:'.' 
		}
	
	}

	set currencySignFirst( isFirst ) {
		if( isFirst != undefined ) {
			if( typeof isFirst == 'string' ) {
				this.isSignFirst = !( ( isFirst === 'false' ) || ( isFirst === '0' ) || ( isFirst === 'null' ) );
			} else {
				this.isSignFirst = !!isFirst;
			}
		}
	}

	get currencySignFirst() {
		return this.isSignFirst;
	}

	
	set settings( settings ) {
	   
		if( settings.currencySignFirst != undefined ) {
			this.currencySignFirst = settings.currencySignFirst;
		}
		if( settings.currencySign || settings.currencySign === '' ) {
			this.currencySign = settings.currencySign;
		}
		if( settings.group ) {
			this.group = settings.group;
		}
		if( settings.decimal ) {
			this.decimal = settings.decimal;
		}
	}

	static round(value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math.round(value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	format( number ) {
		let formattingNumber = this.formatDigits( number );
		if( this.currencySignFirst ) {
			return this.currencySign + formattingNumber;
		} else {
			return formattingNumber + this.currencySign;
		}
	}

	intPartFormat( value ) {
		return String( value ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + this.group );
	}
	
	fractionPartFormat( value ) {
		return this.decimal + String( value.toFixed( 2 ) ).substr( 2 );
	}
	
	formatDigits( number ) {
		number = this.constructor.round( number, -2 );
		let integer_part = Math.floor(number);
		let fraction_part = number % 1;
		if( ( !fraction_part ) && ( integer_part > 999 ) ) {
			fraction_part = '';
		} else {
			fraction_part = this.fractionPartFormat(fraction_part);
		}
		return this.intPartFormat( integer_part ) + fraction_part;
	}
}
