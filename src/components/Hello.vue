<template>
  <div>
    <vue-c3 :handler="handler"></vue-c3>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueC3 from 'vue-c3'
	import VueResource from 'vue-resource'
	
	Vue.use(VueResource)
	
  export default {
    name: 'HellowWorld',
    components: {
      VueC3,
      VueResource
    },

    data () {
      return {
        handler: new Vue({
					http: {
						root: 'http://192.168.0.180:5984',
						headers: {
							Accept: 'application/json'
						}
					}

				})
      }
    },
    
    mounted () {
			this.$http.get('http://192.168.0.180:5984/stats/_design/sort/_view/by_type', {
				params: {
					startkey: ["hour", 'colo', Date.now()],
					endkey: ["hour", 'colo', 0],
					limit: 1,
					//reduce: true, //avoid geting duplicate host
					//group: true,
					descending: true,
					inclusive_end: true,
					include_docs: true
				}
			}).then(response => {

				// get body data
				//this.someData = response.body;
				
				console.log(response.body.rows);//docs
				console.log(response.body.rows[0].doc.data);//
				for (var key in response.body.rows[0].doc.data) {
					console.log(key);
				}
				
			}, response => {
				// error callback
			});
  
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
      this.handler.$emit('init', options)
    }
  }
</script>
