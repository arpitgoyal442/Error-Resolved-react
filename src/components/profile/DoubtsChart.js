import { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
	2021: {
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		doubts: [3, 2, 1, 5, 10, 9, 2, 1, 5, 10, 9, 2],
	},
	2022: {
		months: ["Jan", "Feb", "Mar", "Apr"],
		doubts: [3, 2, 1, 5],
	},
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DoubtsChart = () => {
	const [currYear, setCurrYear] = useState(2021);
	return (
		<>
			<select
				className="mb-2 w-full border p-1 rounded-md cursor-pointer outline-none text-center"
				value={currYear}
				onChange={(e) => setCurrYear(e.target.value)}
			>
				{Object.keys(data).map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
			<Line
				className="-mx-2 md:-mx-4"
				datasetIdKey="doubts"
				options={{
					plugins: { legend: { display: false }, tooltip: { intersect: false } },
					scales: { y: { beginAtZero: true } },
				}}
				data={{
					labels: data[currYear].months,
					datasets: [
						{
							id: 1,
							label: "Doubts Solved",
							data: data[currYear].doubts,
							pointHoverRadius: 10,
							borderColor: "#008891",
							backgroundColor: "#2BA3A3",
						},
					],
				}}
			/>
		</>
	);
};

export default DoubtsChart;
