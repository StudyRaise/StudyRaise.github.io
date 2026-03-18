import request from "../utils/api";

 const reportService = {};

//获取报告pdf
reportService.getReportPdf = (data) => request({
    url: `/file/S3/download?key=${data}`,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Accept': 'application/pdf',
    }

})


export default reportService;
