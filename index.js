// new Vue({
// 	el:'#app',
// 	data::{
// 		equation:0,
// 		isDecimalAdded:false,
// 		isOperatorAdded:false,
// 		isStarted:false,
// 	},
	
// 	methods:{
// 		isOperator(c){
// 			return ['+','-','x','÷'].includes(c)
// 		}
// 		append(c){
// 		// when started
// 			if(this.equation === 0 && !this.isOperator(c)){
// 				if(c === '.'){
// 					this.equation += '' + c;
// 					this.isDecimalAdded = true;
// 				} else {
// 					this.equation = '' + c;
// 				}
// 				this.isStarted = true;
// 				return
// 			}
// 			if(!this.isOperator(c)){
// 				// if(c === '.' && this.isDecimalAdded) return
// 				// if(c === '.') this.isDecimalAdded = true;
// 				this.equation += '' + c;
// 			}
// 		}
// 	}
// })

function Caclulatoer(){
	this.equation = 0;
	this.isDecimalAdded = false;
	this.isOperatorAdded = false;
	this.isStarted = false;
	Caclulatoer.prototype.isOperator = function(c){
		return ['+','-','x','÷'].includes(c)
	}
	Caclulatoer.prototype.append = function(c){
		if(this.equation === 0 && !this.isOperator(c)){
			if(c === '.'){
				this.equation += '' + c;
				this.isDecimalAdded = true;
			} else {
				this.equation = '' + c;
			}
			this.isStarted = true;
			return
		}
		if(!this.isOperator(c)){
			if(c === '.' && this.isDecimalAdded) return
			if(c === '.') {
				this.isDecimalAdded = true;
				this.isOperatorAdded = true;
			}
			else{
				this.isOperatorAdded = false;
			}
			this.equation += '' + c;
		}
		if(this.isOperator(c) && !this.isOperatorAdded){
			this.equation += '' + c;
			this.isDecimalAdded = false;
			this.isOperatorAdded = true;
		}
	}
	Caclulatoer.prototype.calculate = function(){
		let res = this.equation.replace(/x/g,'*')
		.replace(/÷/g,'/');
		this.equation = parseFloat(eval(res).toFixed(9)).toString();
		this.isDecimalAdded = false;
		this.isOperatorAdded = false;
	}
	Caclulatoer.prototype.clear = function(){
		this.equation = 0;
		this.isDecimalAdded = false;
		this.isOperatorAdded = false;
		this.isStarted = false;
	}
	Caclulatoer.prototype.toggle = function(){
		if(this.isOperatorAdded || !this.isStarted)
			return
		this.equation += '' + '* -1';
		this.calculate();
	}
	Caclulatoer.prototype.percent = function(){
		if(this.isOperatorAdded || !this.isStarted)
			return
		this.equation += '' + '/100';
		this.calculate();
	}
	
}
const btn = document.querySelector('.calculatoer');
const result = document.body.querySelector('.result');
let cac = new Caclulatoer();
window.onload = function(){
	// console.log(btn);
	btn.addEventListener('click',function(e){
		let character = e.target.innerHTML;
		// if(character!='')
		// cac.append(character);
		// if(character == '='){
		// 	console.log(character);
		// 	cac.calculate();
		// }
		switch(character){
			case '+':
			case '-':
			case 'x':
			case '÷':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
			case '.':cac.append(character);
				break;
			case '=':cac.calculate();
				break;
			case '%':cac.percent();
				break;
			case '±':cac.toggle();
				break;
			case 'AC':cac.clear();
				break;
			
		}

		console.log(result.innerHTML.length);
		
		result.innerHTML = cac.equation;
		changeFontSize(result);
	})
}

function changeFontSize(node){
	if(node.innerHTML.length > 10&&node.innerHTML.length<15){
		node.style.fontSize = '36px';
	}else if(node.innerHTML.length >= 15){
		node.style.fontSize = '24px';
	}else{
		node.style.fontSize = '48px';
	}
}