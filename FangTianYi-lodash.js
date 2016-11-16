var FangTianYi = {
	chunk: function() {

	},
	compact: function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i]) {
				arr.splice(i, 1)

			}

		}
		return arr //函数一定要return
	}
}