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
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i]) {
				arr.splice(i, 1)

			}

		}
		return arr //函数一定要return
	},
	drop: function(arr, n) {
		arr.splice(0, n)
		return arr
	},
	dropRight: function(arr, n) {
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
	fill: function(arr, value, m, n) {

		for (i = m; i < n; i++) {
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
	}
}