// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <PieChart width={1000} height={400}>
      <Pie
        cx="50%"
        cy="50%"
        data={vaccinationByAge}
        startAngle={0}
        endAngle={360}
        outerRadius="60%"
        dataKey="count"
      >
        <Cell name="18-44" fill="#2cc6c6" />
        <Cell name="44-60" fill="#a3df9f" />
        <Cell name="Above 60" fill="#64c2a6" />
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

export default VaccinationByAge
