import React from 'react'
import { motion } from 'framer-motion'

interface CalorieProgressProps {
  current: number
  goal: number
}

const CalorieProgress: React.FC<CalorieProgressProps> = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100)
  const remaining = Math.max(goal - current, 0)

  return (
    <div className="nutrition-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progress Kalori Hari Ini</h3>
        <span className="text-sm text-gray-500">{current} / {goal} kal</span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {percentage.toFixed(1)}% tercapai
          </span>
          <span className="text-gray-600">
            Sisa: {remaining} kal
          </span>
        </div>
      </div>

      {percentage >= 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-800 text-sm font-medium">
            🎉 Selamat! Target kalori hari ini sudah tercapai!
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default CalorieProgress