import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip)

const UserChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: "Users",
            data: [2, 4, 7, 5, 8, 6, 7],
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

export default UserChart
