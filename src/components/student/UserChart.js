import React from 'react';
import {Pie, Doughnut, Line} from 'react-chartjs-2';
import {ArcElement} from 'chart.js'
Chart.register(ArcElement);

import Chart from 'chart.js/auto';

const mydata = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const labels = ['jan','feb','march','april','may','june','july'];
const linedata = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

function userChart() {
  
    return (
      <div  className='userChart'>
        
        <div className="pieChart">
        <Pie
          data={mydata}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>

         <div className="lineChart">
        <Line

        data={linedata}
        options={
          {

            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }

          }
        }


         />
         </div>

        
      </div>
    );
  
}

export default userChart;