<script>
  import "../app.css";
  import { onMount } from 'svelte'
  import { getPatchData } from '$lib/stores'

  onMount(()=> {
    getPatchData()
  })
</script>

<slot />