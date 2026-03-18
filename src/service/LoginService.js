import { postRequestRawNoToken, getRequestNoToken2 } from '../utils/api';

const LoginService = {};

//登录
LoginService.Login = function (data) {
    return new Promise((resolve, reject) => {
        postRequestRawNoToken('/njcx/login', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};

// //登录
// LoginService.Login = function (data) {
//     return new Promise((resolve, reject) => {
//         postRequestRawNoToken('/njcx/loginNew', data).then(resp => {
//             if (resp.status === 200) {
//                 resolve(resp.data);
//             } else {
//                 reject(resp.data);
//             }
//         });
//     });
// };
// 验证码
LoginService.getCaptcha = function (data) {
    return new Promise((resolve, reject) => {
        getRequestNoToken2('/njcx/getCheckCode', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};

export default LoginService;
