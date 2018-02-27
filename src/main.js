import Vue from 'vue'
import App from './App.vue'



new Vue({
  el: '#app',
  components: {
		'vue-c3-custom-element': App
	},
	data: {
		'chart': {
			data: {
				columns: [
					['data', 90],
				],
				type: 'gauge',
			},
			color: {
					pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
					threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
							values: [30, 60, 90, 100]
					}
			},
			size: {
					height: 120
			} 
		}
	}
  //render: h => h(App)
})
