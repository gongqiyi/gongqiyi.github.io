var FangTianYi = {
	chunk: function(arr, n) {

		var l = Math.ceil(arr.length / n)

		var result = new Array(l);

		for (var i = 0; i < l; i++) {
			result[i] = []
		}



		for (var i = 0; i < arr.length; i++) {
			result[parseInt(i / n)][i % n] = arr[i]
		}

		return result
	},
	compact: function(arr) {
		var result = []
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]) {
				result.push(arr[i])

			}

		}
		return result //函数一定要return
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

	difference: function(arr1, arr2) {

		for (var i = 0; i < arr1.length; i++) {
			for (var j = 0; j <= arr2.length; j++) {
				if (arr1[i] == arr2[j]) {
					arr1.splice(i, 1)
				}
			}

		}
		return arr1
	},
	reverse: function(arr) {

		var len = arr.length
		var result = []
		for (var i = 0; i < len; i++) {
			result.push(arr.pop())
		}
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
	fill: function(arr, value, start, end) {
		if (start == undefined) {
			start = 0
		}
		if (end == undefined) {
			end = arr.length
		}
		for (i = start; i < n; i++) {
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
		// 	return arr
		// }
		// if (i >= arr.length) {
		// 	return arr
		// }
		// for (i = 0; i < arr.length; i++) {
		// 	result.push(arr[i])
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
	// 	for (i = o; i < arr.length; i++) {
	// 		array = FangTianYi.filter(array)
	// 	}
	// 	return arr
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
	join: function(arr, separator) {
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
		return array.join(vale, fromIdex)
	},
	nth: function(array, n) {
		return array.slice(n, n + 1)[0]
	}
}