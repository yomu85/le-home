<script>
  import Header from '$lib/Header.svelte'
  import Loader from '$lib/Loader.svelte';
  import { leVal, loading } from '$lib/stores'
  import Chart from 'chart.js/auto';

  let flag = false;

  function dataOn() {
    const ctx = document.getElementById('myChart').getContext('2d');

    let arrdate = []
    let arrBitcoin = []
    let arrGold = []
    let arrSP500 = []

    for(let i = 0; i < $leVal.length; i++) {
      arrdate.push($leVal[i].properties.title.title[0].plain_text)
      arrBitcoin.push($leVal[i].properties.Bitcoin.number)
      arrGold.push($leVal[i].properties.Gold.number)
      arrSP500.push($leVal[i].properties.Sp.number)
    }
    
    let data = {
      labels: arrdate,
      datasets: [
        {
          label: 'Bitcoin',
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
          data: arrBitcoin,
        },
        {
          label: 'Gold',
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
          data: arrGold,
        },
        {
          label: 'SP500',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(236, 244, 231, .2)',
          borderColor: '#617AFF',
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
          data: arrSP500,
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

<svelte:head>
  <title>casebitcoin</title>
</svelte:head>

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
            <th>Year</th>
            <th>Bitcoin</th>
            <th>Gold</th>
            <th>S&amp;P500</th>
          </tr>
        </thead> 
        <tbody>
          {#each $leVal as leValInfo}
          <tr>
            <td>{leValInfo.properties.title.title[0].plain_text}%</td>
            <td>{leValInfo.properties.Bitcoin.number}%</td>
            <td>{leValInfo.properties.Gold.number}%</td>
            <td>{leValInfo.properties.Sp.number}%</td>
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
