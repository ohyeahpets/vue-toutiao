export default class News {
  constructor({id, title, imgUrl, desc}) {
    this.id = id
    this.title = title
    this.imgUrl = imgUrl
    this.desc = desc
  }
}

export function createNews(listDataItem) {
  return new News({
    id: listDataItem.group_id,
    title: listDataItem.title,
    imgUrl: listDataItem.image_list.length > 0 ? converStr(listDataItem.image_list) : [],
    desc: {
      source: listDataItem.source,
      count: listDataItem.comments_count,
      time: listDataItem.datetime,
      abstract: listDataItem.abstract,
      keywords: converArr(listDataItem.keywords),
      label: listDataItem.label,
      label_style: listDataItem.label_style
    }
  })
}

// 处理数据，使其每项转换成字符串
function converStr(imgUrl) {
  var arr = []
  var reg = /^http/
  var str = ''
  imgUrl.forEach((item) => {
    // if (item.url.test(reg)) {
    //   str = 'http:' + item.url
    //   arr.push(str)
    // }
    arr.push(item.url)
  })
  return arr
}

// 处理keywords，转换成数组
function converArr(keywords) {
  var arr = []
  if (keywords) {
    arr = keywords.split(',');
  }
  return arr
}
