<template>
	<div>
		<navbar/>
		<button v-on:click="amisafe" style="margin-top: 100px;margin-left: 10%">AM I SAFE</button>
	</div>
</template>

<script>
	import navbar from '~/components/navbar.vue'
	export default{
		data(){
		return{
			status:"OK"
		}
	},
	components :{
		navbar
	},
	methods:{
		amisafe:
			function (e) {
				
			let options = {
 				enableHighAccuracy: true,
  				timeout: 5000,
  				maximumAge: 0
			};	
			function success(pos) {
  				var crd = pos.coords;

  				console.log('Your current position is:');
  				console.log(`Latitude : ${crd.latitude}`);
  				console.log(`Longitude: ${crd.longitude}`);
  				console.log(`More or less ${crd.accuracy} meters.`);

  				// alert(`Your current position is: Latitude : ${crd.latitude}Longitude: ${crd.longitude}More or less ${crd.accuracy} meters.`)
}

		function error(err) {
		  alert(`ERROR(${err.code}): ${err.message}`);
			}
	navigator.geolocation.getCurrentPosition(success, error, options);
}
	}
	};
	
</script>