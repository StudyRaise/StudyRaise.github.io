// 加密
import CryptoJS from 'crypto-js'

// 定义一个安全的密钥，建议长度为16位（AES-128）、24位（AES-192）或32位（AES-256）
// !!! 重要：此密钥应与后端商定，并妥善保管，切勿硬编码在前端代码中，建议通过环境变量注入 !!!
const SECRET_KEY = '009S7#2pMQ6z9$4T'

export default {
  /**
   * 生成16位的IV（基于时间戳）
   * 规则：取当前时间戳（毫秒），不足16位补0，超过16位截断后16位
   */
  generateIvByTimestamp() {
    // 获取当前时间戳（毫秒）
    const timestamp = Date.now().toString()
    // 处理成16位：不足补0，超过截断
    let iv = timestamp.padEnd(16, '0').slice(0, 16)
    return iv
  },
  encrypt(data, aesIv) {
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
      iv: CryptoJS.enc.Utf8.parse(aesIv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    let str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    return str
  },
  // iv加密
  ivEncryption(iv) {
    return CryptoJS.enc.Utf8.parse(iv)
  },

  // /**
  //  * AES 加密方法
  //  * @param {string} word - 需要加密的明文
  //  * @param {string} keyStr - 密钥，可选，不传则使用默认密钥
  //  * @returns {string} 加密后的密文（Base64格式）
  //  */
  // encrypt(word, keyStr = SECRET_KEY) {
  //   const key = CryptoJS.enc.Utf8.parse(keyStr)
  //   const srcs = CryptoJS.enc.Utf8.parse(word)
  //   const encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //     iv: CryptoJS.enc.Utf8.parse('xZ13msI2YqQs4c/tOvPXyw=='),
  //     mode: CryptoJS.mode.ECB, // 加密模式，常用ECB或CBC
  //     padding: CryptoJS.pad.Pkcs7 // 填充方式
  //   })
  //   return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  // },


}


