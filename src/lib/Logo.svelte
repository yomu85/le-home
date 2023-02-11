<script>
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import anime from "animejs"

  function goTop() {
    document.body.scrollIntoView();
    goto('/')
  }

  onMount(()=> {
    anime.timeline({loop: true})
    .add({
      targets: '.ml15 .word',
      scale: [2,1],
      opacity: [0,1],
      easing: "easeOutCirc",
      duration: 125,
      delay: (el, i) => 125 * i
    }).add({
      targets: '.ml15',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 300000
    });
  })
</script>

<h1 class="ml6">
  <button type="button" on:click={goTop} class="text-primary ml15">
    <span class="word">CASEBITCOIN</span>
  </button>
</h1>

<style lang="scss">
  button {
    display: block;
    font-family: 'Titan One', cursive;
    font-size: 2.5rem;
    line-height: 2.5rem;
    text-decoration: none;
    text-align: left;
    letter-spacing: 1px;
    .word {
      display: inline-block;
    }
  }
</style>