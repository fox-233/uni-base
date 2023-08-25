/* eslint-disable */
import {getLoading} from './fetch'
import config from './config'
function UserAuth (callback) {
    var url
    uni.getSetting({
        success: (res) => {
            if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
                url = GetCurrentUrl()
                callback && callback()
            }else{//未授权，跳到授权页面
                url = GetCurrentUrl()
                uni.navigateTo({
                    url: '/pages/auth/auth?fromUrl=' + encodeURIComponent(url)
                })
            }
        }
    })
}

function replaceBlank(oldStr){ //去除空行
    var reg = /\n(\n)*( )*(\n)*\n/g;
    // var oldStr = $("#oldStr").val();
    var newStr = oldStr.replace(/(\r\n|\n)\s*/g, '\n');
    if (newStr.indexOf('\n') != -1) { // 去除首行
        newStr = newStr.substr(1)
    }
    return newStr;
}

/*
    maxLengthOne 一次性能上传张数
 */
var photoArr = []; //图片数组
function choosePic (arr, maxLengthOne = 9) {
    uni.chooseImage({
        count: maxLength,
        success: res => {
            var fileLength = res.tempFilePaths.length
            this.imgUpload(res.tempFilePaths, 0, fileLength)
        }
    })
}

// 选择图片
/*
    count: Number 上传张数
    sizeType: 压缩类型 1原图，2压缩 不传默认都有
 */

function chooseImage (count, type) {
    var sizeType = ['original', 'compressed']
    if (type == 1) {
        sizeType = ['original']
    } else {
        sizeType = ['compressed']
    }
    return new Promise((resolve, reject) => {
        uni.chooseImage({
            count,
            sizeType,
            success: res => {
                resolve(res.tempFilePaths)
            }
        })
    })
}

const localImgs2webImgs = (localImgs = []) => {
    const url = config.uploadImg
    showLoading('上传中...')
    let promiseList = localImgs.map((item) => {
        return new Promise(resolve => {
            uni.uploadFile({
                url,
                filePath: item,
                name: 'file',
                formData: {
					'user': 'test'
                },
                success: res => {
                    var resData = JSON.parse(res.data)
                    if (resData.code == 300) {
                        showToast(resData.msg)
                        return
                    }
                    resolve(resData.data)
                }
            })
        })
    })
    const result = Promise.all(promiseList).then((res) => {
        uni.hideLoading()
        return res
    }).catch((error) => {
        console.log(error)
    })
    return result
}

function GetCurrentUrl () {
    var pages = getCurrentPages() // 获取加载的页面
    var currentPage = pages[pages.length - 1] // 获取当前页面的对象
    // console.log('pages', pages)
    var url = currentPage.route // 当前页面url
    var options = currentPage.options // 如果要获取url中所带的参数可以查看options
    // 拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    return urlWithArgs
}
function showToast (msg, status = true) {
    uni.showToast({
        title: msg,
        icon: 'none',
        mask: status
    })
}

function showLoading (msg, status = true) {
    uni.showLoading({
        title: msg,
        mask: status
    })
}

function showModal (title, content, sucCal, canCal, showCancel = true) {
    var titleText = title || '提示';
    uni.showModal({
        title: titleText,
        content: content,
        showCancel: showCancel,
        success(res) {
            if (res.confirm) {
                sucCal && sucCal()
            } else if (res.cancel) {
                canCal && canCal()
            }
        }
    })
}

// 获取当前日期
function getNowFormatDate (isMonth) {
	var _isMonth = isMonth || false;
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
	if (_isMonth) {
		currentdate = year + seperator1 + month
	}
    return currentdate;
}


function checkPhone (phone) { // 检测手机号
    // var phone = this.phone
    var str = phone.trim()
    if (str == '') {
        showToast('请输入手机号', false)
        return false
    }
    var isMobile = str !== '' && /^1[3|4|5|7|8|9][0-9]\d{8,8}$/.test(str)
    if (!isMobile) {
        showToast('请输入正确的手机号', false)
        return false
    }
    return true
}

//精度问题
function formatFloat (f, digit){
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
}
function deepClone (obj){
    var cloneObj = Array.isArray(obj)?[]:{}
    if(obj && typeof obj == 'object'){
        for(var i in obj){

            if(obj.hasOwnProperty(i)){
                if(obj[i] && typeof obj[i] == 'object'){

                    cloneObj[i] = deepClone(obj[i])
                }else{
                    cloneObj[i] = obj[i]
                }
            }
        }
    }
    return cloneObj
}

//判断字符是否为空的方法
/*
    eg:
    if (!isEmpty(value)) {
        alert(value);
    }
*/
function isEmpty(obj){
    if (typeof obj == 'undefined' || obj == null || obj.trim() == '') {
        return true;
    } else {
        return false;
    }
}
/*函数节流*/
function throttle (fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce (fn, interval) {
  var timer;
  var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}
/* 小程序版本比较 */
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

// 日期转时间戳
function toTimeStamp(date) {
	const Date = new Date(date)
	return Date.getTime() / 1000
}
// 拼接图片域名
function getImgAttr(url) {
	if (url) {
		return `${config.host}${url}`
	}
}
/**
	 * js 时间戳的转换（自定义格式）
	 * @param  date [创建 Date 对象]
	 * @param  formatStr [日期格式]
	 * @return (string) 日期时间
	 * 时间戳的转换（自定义格式）
	年、月、日、时、分、秒
	var date = jutils.formatDate(new Date(1533686888*1000),"YYYY-MM-DD HH:ii:ss");
	console.log(date);
	// 2019-07-09 19:44:01
 */
function formatDate(date, formatStr) {
	var arrWeek = ['日', '一', '二', '三', '四', '五', '六'],
		str = formatStr.replace(/yyyy|YYYY/, date.getFullYear()).replace(/yy|YY/, addZero(date.getFullYear() % 100, 2)).replace(/mm|MM/, addZero(date.getMonth() + 1, 2)).replace(/m|M/g, date.getMonth() + 1).replace(/dd|DD/, addZero(date.getDate(), 2)).replace(/d|D/g, date.getDate()).replace(/hh|HH/, addZero(date.getHours(), 2)).replace(/h|H/g, date.getHours()).replace(/ii|II/, addZero(date.getMinutes(), 2)).replace(/i|I/g, date.getMinutes()).replace(/ss|SS/, addZero(date.getSeconds(), 2)).replace(/s|S/g, date.getSeconds()).replace(/w/g, date.getDay()).replace(/W/g, arrWeek[date.getDay()]);
	return str;
}
function addZero(v, size) {
    for (var i = 0, len = size - (v + "").length; i < len; i++) {
        v = "0" + v;
    };
    return v + "";
}
export {
    getNowFormatDate,
    showModal, showLoading, showToast,
    GetCurrentUrl,
    replaceBlank,
    chooseImage, localImgs2webImgs,
    UserAuth,
    checkPhone,
    formatFloat,
    deepClone,
    isEmpty,
	debounce,
	compareVersion,
	toTimeStamp,
	getImgAttr,
	formatDate
}
