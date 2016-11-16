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
}
