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
	}
}