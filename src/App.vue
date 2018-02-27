<template>
	 <div>
    <vue-c3 :handler="handler"></vue-c3>
  </div>
</template>

<script>
import VueC3 from 'vue-c3'


import Vue from 'vue'

//Vue.use(VueC3)

export default {
  name: 'vue-c3-custom-element',
  
  props: {
		columns: {
			type: [String, Array],
			 default: () => (['mem', 0])
		},
	},
  
	components: {
		VueC3,
	},
		
  data () {
		return {
			gauge: {
				data: {
					columns: [],
					type: 'gauge',
				},
				gauge: {
					expand: false
				},
				color: {
						pattern: ['#a4ff00', '#ffdf00', '#ffb100', '#FF0000'], // the three color levels for the percentage values.
						threshold: {
							values: [25, 50, 75, 100]
						}
				},
				size: {
					height: 120
				} 
			},
			handler: new Vue(),
		}
		
	},
	/**computed: {
		chart: function(){
			if(typeof(this.columns) == 'string')
				this.chart = JSON.parse(this.columns)
				
			this.gauge.data.columns = this.columns;
			return this.gauge;
		},
	},*/
	watch: {
    columns: function (val) {
			if(typeof(this.columns) == 'string')
				val = JSON.parse(val)
				
      this.gauge.data.columns[0] = val;
      
      /**this.handler.$emit('dispatch', (chart) => chart.unload({
					ids: ['mem']
			}))
			
			console.log('App columns', this.gauge.data.columns[0])
			
      this.handler.$emit('dispatch', (chart) => chart.load(this.gauge.data.columns[0]))
      this.handler.$emit('dispatch', (chart) => chart.flush())**/
      
      this.handler.$emit('dispatch', (chart) => chart.load({
					columns: this.gauge.data.columns,
					unload: ['mem']
				})
			);
			
    },
  },
	mounted () {
			
      if(typeof(this.columns) == 'string')
				this.columns = JSON.parse(this.columns)
			
			console.log(this.columns)
			
			this.gauge.data.columns.push(this.columns);
      
      this.handler.$emit('init', this.gauge)
    },
}
</script>

