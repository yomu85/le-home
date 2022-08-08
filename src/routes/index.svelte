<svelte:head>
  <title>홈 | RoyalePatch</title>
</svelte:head>

<script>
  import Header from '$lib/Header.svelte'
  import { leVal } from '$lib/stores'
  import Chart from 'chart.js/auto';

  let flag = false;

  function dataOn() {
    const ctx = document.getElementById('myChart').getContext('2d');

    let arrdate = []
    let arrLe = []

    for(let i=0; i < $leVal.length; i++) {
      arrdate.push($leVal[i].properties.date.date.start)
      arrLe.push($leVal[i].properties.LE.number)
    }
    
    let data = {
      labels: arrdate,
      datasets: [
        {
          label: 'LE 잔량',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(225, 204, 230, .2)',
          borderColor: 'rgb(205, 130, 158)',
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

<main id="main">
  <Header />

  <button type="button" class="btn" on:click={dataOn}>GET DATA</button>
  <canvas id="myChart" :class={flag ? 'show' : ''}></canvas>
  <div class="table_wrap">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>날짜</th>
          <th>LE잔량</th>
          <th>PVU수확량</th>
          <th>PVU가격($)</th>
        </tr>
      </thead> 
      <tbody>
        {#each $leVal as leValInfo}
        <tr>
          <td>{leValInfo.properties.date.date.start}</td>
          <td>{leValInfo.properties.LE.number}</td>
          <td>{leValInfo.properties.getPVU.number}</td>
          <td>{leValInfo.properties.PVUprice.number}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style lang="scss">
  .table_wrap {
    overflow-x: auto;
    .table-zebra {
      thead th {
        text-align: center;
        font-size: 1.2rem;
        &.text_left {
          text-align: left;
        }
      }
      tbody td {
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }

  :global(.text_left) {
    text-align: left;
  }
  #myChart {
    display: none;
    &.show {
      display:block
    }
  }
</style>
