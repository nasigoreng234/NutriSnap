import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

interface NutritionChartProps {
  protein: number
  carbs: number
  fat: number
  goals: {
    protein: number
    carbs: number
    fat: number
  }
}

const NutritionChart: React.FC<NutritionChartProps> = ({ protein, carbs, fat, goals }) => {
  const data = [
    { name: 'Protein', value: protein, goal: goals.protein, color: '#3B82F6' },
    { name: 'Karbohidrat', value: carbs, goal: goals.carbs, color: '#EF4444' },
    { name: 'Lemak', value: fat, goal: goals.fat, color: '#10B981' },
  ]

  const COLORS = ['#3B82F6', '#EF4444', '#10B981']

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Konsumsi: {data.value.toFixed(1)}g</p>
          <p className="text-sm">Target: {data.goal}g</p>
          <p className="text-sm">Progress: {((data.value / data.goal) * 100).toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="nutrition-card"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribusi Makronutrien</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {item.value.toFixed(1)}g
                </p>
                <p className="text-xs text-gray-500">
                  {((item.value / item.goal) * 100).toFixed(0)}% dari target
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default NutritionChart