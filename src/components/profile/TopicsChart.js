import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["C++", "Java", "Python", "Javascript", "Nodejs", "Reactjs", "Firebase"];

const TopicsChart = () => {
	return (
		<Bar
			// className="md:scale-90"
			data={{
				labels,
				datasets: [
					{
						id: 1,
						label: "Solved",
						data: [3, 2, 1, 5, 10, 9, 2],
						pointHoverRadius: 10,
						backgroundColor: [
							"rgb(255, 99, 132)",
							"rgb(54, 162, 235)",
							"rgb(255, 205, 86)",
							"rgb(43, 163, 163)",
						],
					},
				],
			}}
		/>
	);
};

export default TopicsChart;
