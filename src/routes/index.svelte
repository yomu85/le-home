<svelte:head>
  <title>홈 | RoyalePatch</title>
</svelte:head>

<script>
  import Header from '$lib/Header.svelte'
  import { lePvu } from '$lib/stores'
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte'

  onMount(()=> {
    const ctx = document.getElementById('myChart').getContext('2d');
    let obj = {}

    function notionAPI(val) {
      let arr = []

      if(val == 'le') {
        for(let i=0; i < $lePvu.length; i++) {
          arr.push($lePvu[i].properties.LE.number)
        }
      }
      // else if(val == 'date') {
      //   for(let i=0; i < $lePvu.length; i++) {
      //     arr.push($lePvu[i].properties.date.date.start)
      //   }
      // }
      
      obj.le = arr
      console.log(obj.le)

      return obj.le
    }

    
      //obj.date = notionAPI('le')
      //['2022-08-06', '2022-08-07']

    
    const data = {
      labels: notionAPI('le'),
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
          data: notionAPI('le'),
        },
      ],
    }
    const config = {
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
    new Chart(ctx, config);
  })
</script>

<main id="main">
  <Header />

  <div class="tabs tabs-boxed">
    <a href="/" class="tab-active">HOME</a> 
    <a href="/" class="tab">2차 정보</a> 
    <a href="/" class="tab">3차 정보</a>
  </div>
    <canvas id="myChart"></canvas>
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
          {#each $lePvu as lePvuInfo}
          <tr>
            <td>{lePvuInfo.properties.date.date.start}</td>
            <td>{lePvuInfo.properties.LE.number}</td>
            <td>{lePvuInfo.properties.getPVU.number}</td>
            <td>{lePvuInfo.properties.PVUprice.number}</td>
          </tr>
          {/each}
        </tbody>
        <!-- <thead>
          <tr>
            <th>구분</th>
            <th>날짜</th>
            <th>케릭터</th>
            <th>업다운</th>
            <th class="text_left">패치내용</th> 
          </tr>
        </thead> 
        <tbody>
          {#each $patchList as patchInfo, index}
          <tr>
            <td>{index+1}</td>
            <td>{patchInfo.properties.date.date.start}</td>
            <td>
              <img src="/character/{patchInfo.properties.cards.select.name}.png" 
                class="img_character" alt={patchInfo.properties.cards.select.name}>
            </td>
            <td>{patchInfo.properties.updown.select.name}</td> 
            <td>
              <div class="text_left">
                {#each patchInfo.properties.patches.title as patch}
                  <p>{patch.plain_text}</p>
                {/each}
              </div>
            </td>
          </tr>
          {/each}
        </tbody> -->
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
</style>
