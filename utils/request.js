export const baseUrl = "http://127.0.0.1:3000"

export default function request(url,data = {},header={},method = 'get') {
  return new Promise((resolve, reject) => {
	   // var baseUrl="127.0.0.1:8080/"
		uni.request({
		  url: baseUrl + url,
		  data,
		  header:header,
		  method,
		  success: res => {
			  // console.log("本次访问的路径是",url)
			   console.log("本次访问的路径是",url,"本次访问的路径返回的数据",res.data)
			if (res.statusCode == 200) {
				// 正常
				resolve({
				  data: res.data,
				  status: res.statusCode
				})
			  return;
			}
			reject({
			  data: 401,
			  status: res.statusCode
			})
		   
		  },
		  fail: err => {
			// console.log(err)
			reject(err)
			uni.showToast({
			  title: '网络连接异常',
			  icon: 'none'
			})
		  }
		})
  })
}

