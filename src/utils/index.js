export function Trim(str, is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  return result;
}

// 查询字符串参数
export function getUrlParameter() {
  // 取得查询字符串并去掉开头的问号
  var qs = (location.search.length > 0) ? location.search.substring(1) : '',
    // 定义一个对象保存数据
    args = {},
    // 把取得的keyword保存在数组中便于遍历
    items = qs.length > 0 ? qs.split('&') : [],
    item = null,
    name = null,
    value = null;
  console.log(qs)
  // 在for循环中使用
  for (var i = 0, iLength = items.length; i < iLength; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    // 如果name存在
    if (name.length) {
      args[name] = value;
    }
  }
  // 返回一个对象，格式{name:value}
  return args;
}
