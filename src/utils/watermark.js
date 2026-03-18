let watermark = {}

let setWatermark = (str) => {
  let id = '1.23452384164.123412415'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  can.width = 450
  can.height = 320
  let cans = can.getContext('2d')
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '40px Vedana'
  cans.fillStyle = 'rgba(255, 0, 0, 1)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 20, can.height)
  let reportBox = document.querySelector("#PdfPag");
  console.log(reportBox.clientHeight);
  let div = document.createElement('div')
  div.id = id
  div.style.opacity = '.2'
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.zIndex = '100'
  div.style.width = reportBox.clientWidth + 'px'
  div.style.height = reportBox.clientHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  reportBox.appendChild(div)
  // return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
  // let id = setWatermark(str)
  // setInterval(() => {
  //   if (document.getElementById(id) === null) {
  //     id = setWatermark(str)
  //   }
  // }, 2000)
  // window.onresize = () => {
  //   setWatermark(str)
  // }
  setWatermark(str)
}

export default watermark