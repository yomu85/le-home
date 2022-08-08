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

    for(let i = 0; i < $leVal.length; i++) {
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

<Header />

<main id="main">
  <div class={flag ? 'btn_area hide' : 'btn_area'}>
    <button type="button"
      class={ $loading ? 'btn btn-block loading' : 'btn btn-block'}
      on:click={dataOn}
    >LE 잔량 차트 보기</button>
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
            <th>LE 잔량</th>
            <th>PVU 수확량</th>
            <th>PVU 가격($)</th>
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
    &:global(.show) {
      display:block;
    }
  }
</style>
