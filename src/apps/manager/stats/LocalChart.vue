
<script>
import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: [
    'data','options'
  ],
  data () {
    return {
      // data: {
      //   labels: ['January', 'February'],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [40, 20]
      //     }
      //   ]
      // }
    }
  },
  mounted () {
    this.renderChart(this.data, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
