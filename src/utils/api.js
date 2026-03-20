import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 50000;

axios.interceptors.request.use(config => {
	if (sessionStorage.getItem("token")) {

		config.headers.Authorization = sessionStorage.getItem("token");
	} 
	// else if (config.url.indexOf('/njcx/getCheckPatOne') > -1) {
	// 	// 固定token
	// 	config.headers.Authorization = 'abc-123'
	// }
	return config;
}, err => {
	return Promise.resolve(err);
});
axios.interceptors.response.use(data => {
	if (data.status && data.status === 200 && data.data.status === 'error') {
		return;
	} else if (data.status && data.status === 200) {
		if (data.data.code === 500) {

			Message.error(data.data.message ? data.data.message : data.data.msg);
		}
	}
	return data;
},
	err => {
		if (err.response.status === 504 || err.response.status === 404) {

		} else if (err.response.status === 403) {

		} else if (err.response.status === 500) {
			
			Message.error(err.response.data||'服务器错误');
		}
		return Promise.resolve(err);
		// return err;
	}
);


let base = '';

const BASE_URL = process.env.NODE_ENV

function judgePath(path) {
	const setInfo = JSON.parse(window.sessionStorage.getItem("setInfo"))
	if (setInfo.type === "固定") {
		return setInfo.Http + setInfo.ip + ":" + setInfo.dk + path
	} else {
		return location.protocol + "//" + location.host + path
	}
}


export const postRequest = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'post',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': params,
		'transformRequest': [function (data) {
			let ret = '';
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
			}
			return ret;
		}],
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const postRequestRaw = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'post',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': JSON.stringify(params),
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const postRequestRawParams = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'post',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'params': params,
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};

export const postRequestRawNoToken = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'post',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': JSON.stringify(params),
		'headers': {
			'Content-Type': 'application/json',
		}
	});
};


export const uploadFileRequest = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'post',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': params,
		'headers': {
			'Content-Type': 'multipart/form-data',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const putRequest = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'put',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': params,
		'transformRequest': [function (data) {
			let ret = '';

			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
			}
			return ret;
		}],
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const putRequestRaw = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'put',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': JSON.stringify(params),
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const deleteRequest = (url) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'delete',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'headers': {
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const deleteRequestRaw = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'delete',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'data': params,
		'transformRequest': [function (data) {
			let ret = '';

			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
			}
			return ret;
		}],
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': sessionStorage.getItem("token")
		}
	});
};

export const getRequest = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'get',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'params': params,
		'headers': {
			'Authorization': sessionStorage.getItem("token")
		}
	});
};
export const getRequestNoToken = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'get',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'params': params,
		'headers': {
			'Authorization': sessionStorage.getItem("token")
		}
	});
};

export const getRequestNoToken2 = (url, params) => {
	const newUrl = judgePath(url)
	return axios({
		'method': 'get',
		'url': BASE_URL === 'production' ? newUrl : base + url,
		'params': params,
		'headers': {
			
		},
	});
};

// axios.defaults.baseURL = location.origin
axios.defaults.baseURL = 'http://192.168.0.234:9528'

export default axios