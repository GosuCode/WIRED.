import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const DoughnutChart = () => {
    const data = {
        labels: [
            'Users',
            'Posts',
            'Likes',
            'Comments'
        ],
        datasets: [{
            label: 'WIRE',
            data: [8, 17, 10, 11],
            backgroundColor: [
                'blue',
                'red',
                'yellow',
                'purple'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }

    return (
        <div className="text-white w-[400px] ">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
