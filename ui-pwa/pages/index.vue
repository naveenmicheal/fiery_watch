<template>
  <div class="container">
    <navbar/>
    <Gmap/>
   </div>
</template>

<script>
import navbar from '~/components/navbar.vue'
import Gmap from '~/components/map.vue'

export default {

  components: {
    navbar,
    Gmap
  }
}
</script>

