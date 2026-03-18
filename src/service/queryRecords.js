import { postRequestRawNoToken } from '../utils/api';

const queryRecords = {};

//获取检查单列表
queryRecords.getQueryRecords = function (data) {
    return new Promise((resolve, reject) => {
        postRequestRawNoToken('/njcx/getCheckPat', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};
//获取单个检查单检查图片
queryRecords.getCheckPatImg = function (data) {
    return new Promise((resolve, reject) => {
        postRequestRawNoToken('/njcx/getCheckPatImg', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};
//获取单个检查单Pdf
queryRecords.getCheckPatPdf = function (data) {
    return new Promise((resolve, reject) => {
        postRequestRawNoToken('/njcx/getCheckPatPdf', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};


//获取单个检查单
queryRecords.getCheckPatOne = function (data) {
    return new Promise((resolve, reject) => {
        postRequestRawNoToken('/njcx/getCheckPatOne', data).then(resp => {
            if (resp.status === 200) {
                resolve(resp.data);
            } else {
                reject(resp.data);
            }
        });
    });
};




export default queryRecords;
