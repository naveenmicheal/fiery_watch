<template>
	<div>
		<div id="map-wrap" style="height: 100vh">
 		<client-only>
  		 <l-map :zoom=10 :center="mapcenter.center">
   		  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

   		  <l-circle-marker v-for="loopmarker in marker.coords" :key="loopmarker.index" :lat-lng="loopmarker" :color="marker.color" :fillColor="marker.color":fillOpacity="1" :weight=0 :radius="marker.radius"> 
   		  </l-circle-marker>

		</l-map>
 		</client-only>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			// NOTE: mapcenter.center, and marker.coords has been redacted for privacy concerns
			/* Add your data set
					mapcenter :{
						center:[lattitude, longitude],
			},

			marker :{
				coords : [[lattitude, longitude].[lattitude, longitude].[lattitude, longitude]]
			}
			*/

		return{
			mapcenter :{
				center:[],
			},
			marker :{
				color : "red",
				radius :4,
				coords : []
			}
			
		}	
	}
}

</script>

