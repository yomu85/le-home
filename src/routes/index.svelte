<svelte:head>
  <title>홈 | LeForYou</title>
</svelte:head>

<script>
  import Header from '$lib/Header.svelte'
  import Loader from '$lib/Loader.svelte';
  import { leVal, loading } from '$lib/stores'
  import Chart from 'chart.js/auto';

  let flag = false;

  function dataOn() {
    const ctx = document.getElementById('myChart').getContext('2d');

    let arrdate = []
    let arrLe = []
    let arrPvu = []

    for(let i = 0; i < $leVal.length; i++) {
      arrdate.push($leVal[i].properties.date.date.start)
      arrLe.push($leVal[i].properties.LE_k.number)
      arrPvu.push($leVal[i].properties.getPVU.number)
    }
    
    let data = {
      labels: arrdate,
      datasets: [
        {
          label: 'LE(k)',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(248, 114, 114, .1)',
          borderColor: '#F87272',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(205, 130,1 58)',
          pointBackgroundColor: 'rgb(255, 255, 255)',
          pointBorderWidth: 4,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: 'rgb(0, 0, 0)',
          pointHoverBorderColor: 'rgba(220, 220, 220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arrLe,
        },
        {
          label: 'PVU',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(236, 244, 231, .2)',
          borderColor: '#5C7F67',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(205, 130,1 58)',
          pointBackgroundColor: 'rgb(255, 255, 255)',
          pointBorderWidth: 4,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: 'rgb(0, 0, 0)',
          pointHoverBorderColor: 'rgba(220, 220, 220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arrPvu,
        }
      ],
    }
    let config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }

    if(!flag){
      new Chart(ctx, config);
    }
    flag = true
  }
</script>

<Header />

<main id="main">
  <div class={flag ? 'btn_area hide' : 'btn_area'}>
    <button type="button"
      class={ $loading ? 'btn btn-block loading' : 'btn btn-block'}
      on:click={dataOn}
    >LE/PVU 차트 보기</button>
  </div>
  
  <canvas id="myChart" class={flag ? 'show' : ''}></canvas>

  {#if $loading}
    <Loader 
      scale='.7'
      absolute={false}
      fixed={false}
    />
  {:else}
    <div class="table_wrap">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>날짜</th>
            <th>LE(k)</th>
            <th><a href="https://bscscan.com/token/tokenholderchart/0x31471e0791fcdbe82fbf4c44943255e923f1b794" target="_blank">PVU</a></th>
            <th><a href="https://poocoin.app/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794" target="_blank">PVU 가격($)</a></th>
          </tr>
        </thead> 
        <tbody>
          {#each $leVal as leValInfo}
          <tr>
            <td>{leValInfo.properties.date.date.start}</td>
            <td>{leValInfo.properties.LE_k.number}</td>
            <td>{leValInfo.properties.getPVU.number}</td>
            <td>{leValInfo.properties.PVUprice.number}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>

<style lang="scss">
  #main {
    padding: 1rem;
  }
  .table_wrap {
    margin-top: 1rem;
    overflow-x: auto;
    .table-zebra {
      thead th {
        text-align: center;
        font-size: 1.2rem;
      }
      tbody td {
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }
  .btn_area {
    display: flex;
    justify-content: center;
    &:global(.hide) {
      display: none;
    }
    .btn {
      font-size: 1.3rem;
    }
  }

  #myChart {
    display: none;
    max-height: 40rem;
    &:global(.show) {
      display:block;
    }
  }
</style>
