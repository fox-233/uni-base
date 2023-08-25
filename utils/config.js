console.log('环境：',process.env.NODE_ENV)
// var host = 'https://test1.fiar.com' // 测试
// var base = 'http://192.168.1.102' // 开发

var base = "http://www.baidu.com" // 测试
var imgHost = '/'
// var base = "http://47.92.36.14" // 专属测试环境
// var h5 = 'http://47.92.36.14:9082'

// var base = "http://47.106.97.87" // 预生产
var host = base + ':8087'
/**
 * 生产
 */
// var host = "https://www.baidu.com"
// var ossALY = "https://www.baidu.com"
// var baseUrl = "https://www.baidu.com/"

// 发行时强制切换生产环境
if(process.env.NODE_ENV == 'production') {
	var host = "https://www.baidu.com" // api地址
	var imgHost = '/'
}

const api = `${host}/`
const uploadImg = `${host}/common/upload`

const config = {
	imgHost,
	host,
	api,
	uploadImg,
	baseUrl,
	ossALY,
}
export default config
