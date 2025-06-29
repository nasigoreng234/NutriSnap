import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Trash2 } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  timestamp: Date
  image?: string
}

interface RecentFoodsProps {
  foods: FoodItem[]
}

const RecentFoods: React.FC<RecentFoodsProps> = ({ foods }) => {
  const { dispatch } = useNutrition()

  const removeFood = (id: string) => {
    dispatch({ type: 'REMOVE_FOOD', payload: id })
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="nutrition-card"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Makanan Terbaru</h3>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Belum ada makanan yang dicatat</p>
          <p className="text-sm">Mulai tambahkan makanan hari ini!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {foods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{food.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{food.calories} kal</span>
                  <span>{food.protein}g protein</span>
                  <span>{formatTime(food.timestamp)}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeFood(food.id)}
                className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default RecentFoods