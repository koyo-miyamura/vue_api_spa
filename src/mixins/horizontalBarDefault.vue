<script>
export default {
  data: function () {
    return {
      maxDisplayNum: 15,
      dataCollection: {
        labels: [],
        datasets: [
          {
            label: 'いいね数',
            backgroundColor: '#2E827F',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                fontSize: 14
              }
            }
          ],
          yAxes: [
            {
              display: true,
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              ticks: {
                fontSize: 14
              }
            }
          ]
        }
      }
    }
  }
}
</script>
