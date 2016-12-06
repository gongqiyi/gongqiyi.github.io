var FangTianYi = {
  /**
   *将array拆分为多个size长度的块，把这些块组成一个新的数组。
   如果array无法被分割成全部等长的块，那么最后剩余的元素将会组成一个块
   
  *参数
  *array(Array):需要被处理的数组。
  *[size=1](number):每个块的长度。
  *返回值
   (Array):返回一个包含拆分数组的新数组(相当于一个新数组)。

  *例子
  *chunk(['a','b','c','d'],2)
   =>[['a','b']],['c','d']]
  *chunk(['a','b','c','d'],3)
   =>[['a','b','c']],['d']]
  **/
  chunk: function(arr, n) {
    var lenC = Math.ceil(arr.length / n) //因为多一个数也要成为数组，所以向上取整
    var lenA = arr.length
    var result = new Array(lenC) //建立一个空数组
    for (var i = 0; i < lenC; i++) {
      result[i] = []
    } //这个循环是建立lenC个空数组，符合题意
    for (var j = 0; j < lenA; j++) {
      result[parseInt(j / n)][j % n] = arr[j]
    } //  j/n为二位数组左边，j%n为二维数组右边
  },


  /**
  *创建一个新数组，包含原数组中所有的非假值元素。
  例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
      
  *参数 
  *array(Array):数组参数 
  [values](...Array):数组需要排除掉的值
  *返回值 
  *(Array):返回过滤后的数组 

  *例子
  *compact([0,1,false,2,'',3])=>[1,2,3]

  **/
  compact: function(arr) {
    var result = [] //一定要先创建一个新数组
    for (i = 0; i < arr.length; i++) {
      if (arr[i]) {
        result.push(arr[i])
      }
    }
    return result
  },
  /**
        *创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中
        （愚人码头注：即创建一个新数组，这个数中的值，为第一个数中的值，为第一个数字（array参数）排除了给定数组中的值。
        该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。 
      
        *参数 
        *array(Array):需要过滤的数组 
        [values](...Array):数组需要排除掉的值
        *返回值 
        *(Array):返回过滤后的数组 

        *例子
        difference([1,2,3],[4,2])=>[1,3]
        **/

  difference: function(arr) {
    var tmp = []
    var len = arguments.lebgth
    var result = []
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i])
    }
    for (var i = 1; i < len; i++) {
      tmp.push(arguments[i]) //把数组需要排除的量合并成一个数组
    }
    tmp = this.flattenDeep(tmp)
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < tmp.length; j++) {
        if (result[i] === result[j]) {
          result.splice(i, 1)
          j = -1
        }
      }
    }
    return result
  },
  drop: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    arr.splice(0, n)
    return arr
  },
  dropRight: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    var l = arr.length
    var i = l
    if (i > n) {
      arr.splice(i - n, n)
    }
    if (i < n) {
      return []
    }
    return arr
  },
  concat: function(arr, value) {
    var result = arr
    for (var i = 1; i < arguments.length; i++) {
      result = result.concat(arguments[i])
    }
    return result
  },

  reverse: function(arr) {
    debugger
    var len = arr.length
    var result = []
    for (var i = 0; i < len; i++) {
      result.push(arr.pop()) //pop是删除最后一个元素，shift是删除第一个
    } //push后面一定要有值，pop后面没有
    for (var i = 0; i < len; i++) {
      arr.push(result[i])
    }
    return arr
  },
  pull: function(array, value) {

    var index
    for (var i = 1; i < arguments.length; i++) {
      index = array.indexOf(arguments[i])
      while (index >= 0) {
        array.splice(index, 1)
        index = array.indexOf(arguments[i])
      }
    }
    return array
  },
  pullAt: function(array, indexes) {

    for (var i = indexes.length; i >= 0; i--) {
      pullItem = array.splice(indexes[i], 1)
    }
    return array
  },
  intersection: function() {


    var result = []
    var temp
    var isAll = true

    for (var i = 0; i < arguments.length; i++) {
      temp = arguments[0][i]

      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j].indexOf(temp) < 0) { //当j=1，temp=2，从头到尾搜索数组，看2出现的次数
          isAll = false
        }
      }
      if (isAll) {
        result.push(temp)
      }
    }
    return result
  },
  /**
  *使用value值来填充array，从start位置开始，
  到end位置结束(但不包含end位置)
  *Note:这个方法会改变array
 
  *参数
  *array(Array):要填充改变的数组
  *value(*):填充给array的值
  *[start=0](number):开始位置(默认0)
  *[end=array.length](number):结束位置(默认array.length)
  *返回值
  *(Array):返回array

  *例子
  *var array=[1,2,3]
  *fill(array,'a')
  *console.log(array)
  * // => ['a', 'a', 'a']
  * fill(Array(3), 2);
  * // => [2, 2, 2]
  * fill([4, 6, 8, 10], '*', 1, 3);
  * // => [4, '*', '*', 10]
  **/

  fill: function(arr, value, start, end) {
    if (start == undefined) {
      start = 0
    }
    if (end == undefined) {
      end = arr.length
    }
    for (i = start; i < end; i++) {
      arr.splice(i, 1, value)
        //arr[i]=value  一样的效果 
    }
    return arr
  },
  flatten: function(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(arr[i])
      } else {
        result.push(arr[i])
      }
    }
    return result
  },

  flattenDeep: function(array) {

    for (var i = 1;; i++) {
      var tOrF = true
      array = FangTianYi.flatten(array)
      for (var j = 0; j < array.length; j++) { //它如果是二维数组就一直递归下去
        if (array[j][0] != undefined) {
          tOrF = false
        }
      }
      if (tOrF) {
        return array
      }
    }
  },
  fromPairs: function(arr) {
    var obj = new Object()
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i][0]] = arr[i][1]
    }
    return obj
  },
  initial: function(arr) {

    arr.splice((arr.length) - 1, 1)
    return arr
  },
  map: function(arr, fn) {
    var result = []
    for (i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr))
    }
    return result
  },
  filter: function(collection, predicate) {
    var result = []
    for (i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) { //经过predicate函数后的结果
        result.push(collection[i])
      }
      return result
    }
    // function equal(v){
    // return v>2

  },

  split: function(string, separator, limit) {

    var result = string.split(separator)
    result.splice(limit)
    return result
  },
  tail: function(array) {
    array.splice(0, 1)
    return array
  },
  take: function(array, n) {
    var l = array.length
    array.splice(0, l - n)
    return array
  },
  takeRight: function(arr, n) {

    // result = []
    // if (var n == 0) {
    //  return arr
    // }
    // if (i >= arr.length) {
    //  return arr
    // }
    // for (i = 0; i < arr.length; i++) {
    //  result.push(arr[i])
    // }
    if (n == undefined) {
      n = 1
    }
    if (n == 0) {
      return []
    }
    return slice(-n)
  },
  // union: function(arr) {
  //  for (i = o; i < arr.length; i++) {
  //    array = FangTianYi.filter(array)
  //  }
  //  return arr
  // }

  union: function(arrs) {
    var result = []
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < rguments.length; j++) {
        if (result.indexOf(arguments[i][j] < 0)) {
          result.push(arguments[i][j])
        }
      }
    }
    return result
  },

  uniq: function(arr) {

    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) < 0) { //检索的字符串值没有出现，则该方法返回 -1
        result.push(arr[i])
      }
    }
    return result
  },
  zip: function(arrays) {
    debugger
    var result = new Array()
    for (var i = 0; i < arrays.length; i++) {
      result[i] = []
    }
    for (var i = 0; i < arguments[0].length; i++) {
      for (var j = 0; j < arguments.length; j++) {
        result[i].push(arguments[j][i])
      }
    }
    return result
  },
  without: function(array, values) {

    var result = []
    for (var i = 0; i < array.length; i++) {
      var need = true
      for (var j = 1; j < arguments.length; j++) {
        if (array[i] === arguments[j]) {
          need = false
          break
        }
      }
      if (need == true) {
        result.push(array[i])
      }
    }
    return result
  },
  partition: function(collection, predicate) {

    var result = [
      [],
      []
    ]
    for (var i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        result[0].push(collection[i])
      } else {
        result[1].push(collection[i])
      }
    }
    return result
  },
  every: function(collection, predicate) {
    for (i = 0; i < collection.length; i++) {
      if (!predicate(collection[i], i, collection)) {
        return false
      }
    }
    return true
  },
  some: function(collection, predicate) {
    for (i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        return true
      }
    }
    return false
  },
  reduce: function(collection, reducer, initial) {
    if (initial == undefined) {
      initial = collection[0]
      star = 1
    }
    var result = initial
    for (var i = 0; i < collection.length; i++) {
      result = reducer(result, collection[i])
    }
    return result
  },
  head: function(arr) {
    return arr.shift(0, 1)
  },
  join: function(arr, n) {
    var result = arr
    result = result.join(n)
    return result
  },
  rejecct: function(collection, predicate) {
    var result = []
    for (var i = 0; i < collection.arr; i++) {
      if (!predicate(collection[i], icollection)) {
        result.push(collection[i])
      }
    }
    return result
  },
  last: function(arr) {
    return arr.pop()
  },
  indexOf: function(array, value, fromIdex) {
    return array.join(value, fromIdex)
  },
  nth: function(array, n) {
    return array.slice(n, n + 1)[0]
  },
  parseJson: function(json) {
    var i = 0
    return deleteGap(json)

    function deleteGap(json) {
      var arr = []
      for (var j = 0; j < json.length; j++) {
        if (!(json.charCodeAt(j) == 32 || json.charCodeAt(j) == 160 || json.charCodeAt(j) == 9229)) {
          arr.push(json[j])
        }
      }
      return parseJson2(arr.join(""))
    }

    function parseJson2(json) {
      //对象      
      if (json[i] == '{') {
        if (json[i + 1] == '}') {
          return {}
        }
        return parseObject(json, i)
      }
      //数组
      if (json[i] == '[') {
        if (json[i + 1] == ']') {
          return []
        }
        return parseArray(json)
      }
      //true
      if (json[i] == 't') {
        return parseTrue(json)
      }
      //false
      if (json[i] == 'f') {
        return parseFalse(json)
      }
      //null
      if (json[i] == 'n') {
        return parseNull(json)
      }
      //字符串
      if (json[i] == '"') {
        return parseString(json)
      }
      //数字
      if (isNum(json[i])) {
        return parseNum(json)
      }
    }

    function parseObject(json) {
      var newObj = {}
      i++
      for (;; i++) {
        if (json[i] == '"') {
          var key = parseJson2(json)
        }
        if (json[i] == ':') {
          i++
          var keyValue = parseJson2(json)
          newObj[key] = keyValue
        }
        if (json[i] == '}') {
          i++
          return newObj
        }
      }
    }

    function parseArray(json) {
      var result = []
      i++
      for (;; i++) {
        if (json[i] == ']') {
          i++
          return result
        }
        result.push(parseJson2(json))
        if (json[i] == ']') {
          i++
          return result
        }
      }
    }

    function parseTrue(json) {
      i += 4
      return true
    }

    function parseFalse(json) {
      i += 5
      return false
    }

    function parseNull(json) {
      i += 4
      return null
    }

    function parseNum(json) {
      for (var j = i + 1;; j++) {
        if (!isNum(json[j])) {
          break
        }
      }
      var str = json.slice(i, j)
      i = j
      return parseInt(str)
    }

    function parseString(json) {
      var endIndex = json.indexOf('"', i + 1)
      var newStr = json.slice(i + 1, endIndex)
      i = endIndex
      return newStr
    }
    //判断是不是数字
    function isNum(char) {
      if (char == undefined) {
        return false
      }
      return ((char.charCodeAt(0) >= '0'.charCodeAt(0) && char.charCodeAt(0) <= '9'.charCodeAt(0)))
    }
  }
}
