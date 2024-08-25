import React, {useState} from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data }) => {
  //console.log(data)
 
  // JSX for displaying bar chart
  return (
    <div>
      <ResponsiveContainer width={800} height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="year" />
          <YAxis dataKey="total"/>
          <Tooltip />
          <Legend align="block"/>
          <Bar dataKey="startCapital" stackId="a" fill="#82ca9d" />
          <Bar dataKey="monthlyInvestment" stackId="a" fill="#8884d8" />
          <Bar dataKey="interest" stackId="a" fill="#ffc658" />
          <Bar dataKey="total" stackId="b" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
