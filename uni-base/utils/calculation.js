// 小数相加
function accAdd(data1, data2) {
	var r1, r2, m, c;
	try {
		r1 = data1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = data2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			data1 = Number(data1.toString().replace(".", ""));
			data2 = Number(data2.toString().replace(".", "")) * cm;
		} else {
			data1 = Number(data1.toString().replace(".", "")) * cm;
			data2 = Number(data2.toString().replace(".", ""));
		}
	} else {
		data1 = Number(data1.toString().replace(".", ""));
		data2 = Number(data2.toString().replace(".", ""));
	}
	return (data1 + data2) / m;
}
// 小数相减
function numSub(data1, data2, precision) {
	var num, num1, num2;
	var precision; // 精度
	try {
		num1 = data1.toString().split(".")[1].length;
	} catch (e) {
		num1 = 0;
	}
	try {
		num2 = data2.toString().split(".")[1].length;
	} catch (e) {
		num2 = 0;
	}
	num = Math.pow(10, Math.max(num1, num2));
	precision = precision || (num1 >= num2) ? num1 : num2;
	return ((data1 * num - data2 * num) / num).toFixed(precision);
};
// 小数相乘
function accMulti(data1, data2) {
	var baseData = 0;
	try {
		baseData += data1.toString().split(".")[1].length;
	} catch (e) {}
	try {
		baseData += data2.toString().split(".")[1].length;
	} catch (e) {}
	return Number(data1.toString().replace(".", "")) * Number(data2.toString().replace(".", "")) / Math.pow(10, baseData);
}
// 小数相除
function division(arg1, arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = new String(arg1).split(".")[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {}
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	//放大倍数后两个数相除 后，乘以两个小数位数长度相减后的10的次幂
	var newData = accMulti((r1 / r2), Math.pow(10, t2 - t1));
	//保留2个小数位数：return newData.toFixed(2)
	return newData;
}
export {
	accAdd,
	numSub,
	accMulti,
	division
}