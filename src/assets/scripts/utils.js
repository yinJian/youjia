// 测试环境
// export const API_URL = 'http://yjhealth-test.s1.natapp.cc/healthcloud365common/static/wechat';
// export const APP_URL = 'http://test2-app.youjiajk.com/';
// export const AppId = 'wx072fa38aced8d8f4';

// hua 测试
// export const API_URL = 'http://192.168.1.222:8080/healthcloud365common/static/wechat';
// export const APP_URL = 'http://test2-app.youjiajk.com/';
// export const AppId = 'wx072fa38aced8d8f4';

// 正式环境
export const API_URL = 'https://yfb.youjiajk.com/healthcloud365common/static/wechat';
export const APP_URL = 'https://yfb-app.youjiajk.com/';
export const AppId = 'wx7ff9103b9ee86217';

/**
 * [保存localStorage]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const setLocalStorage = (name, value) => {
	if (!name || !value) {
		return;
	}
	if (typeof value !== 'String') {
		value = JSON.stringify(value)
	}
	window.localStorage.setItem(name, value);
}

/**
 * [获取localStorage]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export const getLocalStorage = name => {
	if (!name) {
		return;
	}
	return window.localStorage.getItem(name);
}

/**
 * [删除localStorage]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export const removeLocalStorage = name => {
	if (!name) {
		return;
	}
	window.localStorage.removeItem(name);
}
