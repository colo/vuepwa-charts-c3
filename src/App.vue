<template>
	 <div>
    <vue-c3 :handler="handler"></vue-c3>
  </div>
</template>

<script>
import VueC3 from 'vue-c3'
//import VueResource from 'vue-resource'

import Vue from 'vue'

//Vue.use(VueC3)

export default {
  name: 'vue-c3-custom-element',
  
  props: {
			chart: {
				type: Object,
				 default: () => ({})
			},
	},
  
	components: {
		VueC3,
		//VueResource
	},
		
  data () {
		return {
			handler: new Vue(),
			//chart: {}
		}
		
	},
	
	mounted () {
			// to init the graph call:
      const options = {
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
      
      //console.log(this.chart.color);
      
      this.handler.$emit('init', this.chart)
    },
}
</script>

