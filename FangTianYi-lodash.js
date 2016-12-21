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
    }
    return result
      //  j/n为二位数组左边，j%n为二维数组右边
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

  difference: function(arr) { //分类讨论的思想，把复杂的问题拆分为几个小洞
    var tmp = []
    var len = arguments.length
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
  /**
     *这个方法类似_.diffenrence,除了它接受一个iteratee，
    （愚人码头注：迭代器）， 调用array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。
     iteratee 会调用一个参数：(value)。
     （愚人码头注：首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值）。 
     
     *@param  array(Array)：要检查的数组
     *@param  [value](..Array):排除的值 
     *@param [iteratee=_.identity](Array|Function|Object|string):iteratee每个元素
     *@return (Array): 返回一个过滤值后的新数组。

     例子
     *_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
      // => [3.1, 1.3]
 
     // The `_.property` iteratee shorthand.
     *_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
      // => [{ 'x': 2 }]
    **/
  diffenrenceBy: function(arr, value, iter) {
    var result = []
    var onOff
    if (typeof iter == 'function') {
      for (i = 0; i < arr.length; i++) {
        onOff = true
        for (var j = 0; j < value.length; j++) {
          if (iter(value[j]) == iter(arr[i])) {
            onOff = false
          }
        }
        if (onOff) {
          result.push(arr[i])
        }
      }
    }
    if (typeof iter == 'string') {
      for (var i = 0; i < arr.length; i++) {
        onOff = true
        for (var j = 0; j < value.length; j++) {
          if (arr[i][iter] == value[j][iter]) {
            //属性名里的属性值相等，即'x':1里的'x'属性名对应的值相等
            onOff = false
          }
        }
        if (onOff) {
          result.push(arr[i])
        }
      }
    }
    return result
  },
  /**
   *这个方法类似_.difference,除了它接受一个comparator
   
   * @param  array (Array): 要检查的数组。
   * @param  [values] (...Array): 排除的值。
   * @param  [comparator] (Function): comparator 调用每个元素。
   * @return (Array): 返回一个过滤值后的新数组。

   例子
   *var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
  _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
  // => [{ 'x': 2, 'y': 1 }]
   */
  differenceWith: function(arr, value, compara) {
    var result = []
    var onOff
    for (var i = 0; i < arr.length; i++) {
      onOff = true
      for (var j = 0; j < value.length; j++) {
        if (compara(arr[i], value[j])) {
          onOff = false
        }
      }
      if (onOff) {
        result.push(arr[i])
      }
    }
    return result
  },
  /**
   * 将 array 中的前 n 个元素去掉，然后返回剩余的部分。
   * 参数
   * array (Array): 被操作的数组。
   * [n=1] (number): 去掉的元素个数。
   * 返回值
   * (Array): 返回 array 的剩余部分。
   * 例子
   * drop([1, 2, 3]);
   * // => [2, 3] 默认是1开始的
   * drop([1, 2, 3], 2);
   * // => [3]
   * drop([1, 2, 3], 5);
   * // => []
   * drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   **/
  drop: function(arr, del) {
    debugger
    var result = []
    if (del == undefined) {
      del = 1
    }
    for (var i = del; i < arr.length; i++) {
      result.push(arr[i])
    }
    return result
  },
  /**
   * 将 array 尾部的 n 个元素去除，并返回剩余的部分。
   * 参数
   * array (Array): 需要被处理数组。
   * [n=1] (number): 去掉的元素个数。
   * 返回值
   * (Array): 返回 array 的剩余部分。
   * 例子
   * dropRight([1, 2, 3]);
   * // => [1, 2]
   * dropRight([1, 2, 3], 2);
   * // => [1]
   * dropRight([1, 2, 3], 5);
   * // => []
   * dropRight([1, 2, 3], 0);
   * // => [1, 2, 3]
   **/
  dropRight: function(arr, index) {
    debugger
    var result = []
    if (index == undefined) {
      index = 1
    }
    for (var i = 0; i < arr.length - index; i++) {
      result.push(arr[i])
    }
    return result
  },
  /**
   * 获取数组 array的第一个元素
   
   * 参数
   * array (Array): 需要查询的数组
   * 返回值
   * (*): 返回数组的第一个元素
   
   * 例子
   * first([1, 2, 3]);
   * // => 1
   * first([]);
   * // => undefined
   **/
  first: function(arr) {
    if (arr == []) {
      return undefined
    } else {
      return arr[0]
    }
  },
  /**
   * 创建一个新数组，将array与任何数组 或 值连接在一起。
  
   * 参数
   * array (Array): 被连接的数组。
   * [values] (...*): 连接的值。
   * 返回值
   * (Array): 返回连接后的新数组。
 
   * 例子
   * var array = [1];
   * var other = concat(array, 2, [3], [[4]]);
   * console.log(other);
   * // => [1, 2, 3, [4]]
   * console.log(array);
   * // => [1]
   **/
  concat: function(array, af) {
    debugger
    var arr = []
    l = arguments.length
    for (var i = 0; i < l; i++) {
      if (arguments[i] instanceof Array) {
        for (var j = 0; j < arguments[i].length; j++) {
          arr.push(arguments[i][j])
        }
      } else {
        arr.push(arguments[i])
      }
    }
    return arr
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
  /**
   * 可以理解为将嵌套数组的维数减少，flattened（平坦）. 如果 isDeep 值为 true 时，嵌套数组将递归为一维数组, 否则只减少嵌套数组一个级别的维数.
   * 参数
   * array (Array): 需要flattened（减少维数）的嵌套数组
   * [isDeep] (boolean): 是否深递归
   * 返回值
   * (Array): 返回处理后的数组
   * 例子
   * flatten([1, [2, 3, [4]]]);
   * // => [1, 2, 3, [4]]
   * // using `isDeep`
   * flatten([1, [2, 3, [4]]], true);
   * // => [1, 2, 3, 4]
   **/
  flatten: function(arr) {
    debugger
    result = []
    for (i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(arr[i])
      } else {
        result.push(arr[i])
      }
    }
    return result //一定要return
  },
  /**
   * 递归地平坦一个嵌套的数组.相当于_.flatten(array, true)
   * 参数
   * array (Array): 需要
   * 返回值
   * (Array): 返回处理后的数组.
   * 例子
   * flattenDeep([1, [2, 3, [4]]]);
   * // => [1, 2, 3, 4]
   **/

  flattenDeep: function(a) {
    debugger
    var newArr = []

    function fun(a) {
      for (var i = 0; i < a.length; i++) {
        if (Array.isArray(a[i])) {
          fun(a[i]) //降了一维，比如[[2]]变成[2]后
            //再降一维
        } else {
          newArr.push(a[i])
        }
      }
    }
    fun(a) //这个一定要有才能不断递归
    return newArr
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
  /**
   * 使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * 参数
   * array (Array): 需要查找的数组。
   * value (*): 需要查找的值。
   * [fromIndex=0] (number): 开始查询的位置。
   * 返回值
   * (number): 返回 值value在数组中的索引位置, 没有找到为返回-1。
   * 例子
   * indexOf([1, 2, 1, 2], 2);
   * // => 1
   * // Search from the `fromIndex`.
   * indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   **/
  indexOf: function(arr, n, start = 0) {

    for (var i = start; i < arr.length; i++) {


      if (arr[i] == n) {
        return i
      }

    }
    return -1
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
