import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip)

const PostChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: "Posts",
            data: [20, 42, 60, 52, 40, 56, 67],
            backgroundColor: 'yellow',
            borderColor: 'cyan',
            pointBorderColor: 'yellow',
            // fill: true,
            tension: 0.4
        }]
    }

    const options = {
        Plugins: {
            Legend: true
        },
        scales: {
            y: {

            }
        }
    }

    return (
        <div>
            <Line
                data={data}
                options={options}></Line>
        </div>
    )
}

export default PostChart
