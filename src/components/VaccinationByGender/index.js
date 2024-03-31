// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <PieChart width={1000} height={400}>
      <Pie
        cx="50%"
        cy="50%"
        data={vaccinationByGender}
        startAngle={180}
        endAngle={0}
        innerRadius="30%"
        outerRadius="60%"
        dataKey="countG"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#2d87bb" />
        <Cell name="Others" fill="#2cc6c6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
      />
    </PieChart>
  )
}

export default VaccinationByGender
