'use strict';

function printReceipt(inputs) {

	var validItems = composeValidItems(loadAllItems(), inputs);

	var buildItemsPrint = buildItemsToPrict(validItems);

	var totalPrice = calculateTotalPrice(validItems);

	var printReceipt = toString(buildItemsPrint, totalPrice);

  	console.log(printReceipt);
}

function composeValidItems(items, inputs){

	var allItems = composeItemsByInputs(items, inputs);

	var composeTwo = [];
	allItems.forEach(function(itemELement){
		var item = composeTwo.find(function(item){
			return item.barcode === itemELement.barcode;
		});
		if(item) {
			item.count += 1;
		} else {
			composeTwo.push(Object.assign({}, itemELement, {count: 1})); 			
		}
	});
	return composeTwo;
}

function composeItemsByInputs(items, inputs){
	var composeOne = [];
	inputs.forEach(function(input){
		var item = items.find(function(item){
			return input === item.barcode;
		});
		if(item){
			composeOne.push(item);
		}
	});
	return composeOne;

}

function buildItemsToPrict(validItems){
	var printItems = validItems.map(function(validItem){
		return '名称：' + validItem.name 
			+'，数量：' + validItem.count + validItem.unit 
			+'，单价：' + formatPrice(validItem.price) 
			+ '(元)，小计：' + formatPrice(validItem.count * validItem.price) + '(元)';
	});
	return printItems.join('\n');
}


function calculateTotalPrice(validItems){
	var totalPrice = validItems.reduce(function(sum,validItem){
		return sum + validItem.count * validItem.price;
	},0);
	return totalPrice;
}

function toString(buildItemsPrint, totalPrice){
	var header = '***<没钱赚商店>收据***\n';
	var itemsBody = buildItemsPrint;
	var footer = '\n----------------------\n总计：' + formatPrice(totalPrice) + '(元)\n**********************';

	return header + itemsBody + footer;
}

function formatPrice(price){
	var NUMBER = 2;
	return price.toFixed(NUMBER);
}

