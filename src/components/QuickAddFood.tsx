import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'

const QuickAddFood: React.FC = () => {
  const { dispatch } = useNutrition()
  const [searchTerm, setSearchTerm] = useState('')

  const popularFoods = [
    { name: 'Nasi Putih', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1 },
    { name: 'Ayam Goreng', calories: 250, protein: 25, carbs: 8, fat: 15, fiber: 0, sugar: 0, sodium: 400 },
    { name: 'Telur Dadar', calories: 154, protein: 11, carbs: 1, fat: 12, fiber: 0, sugar: 1, sodium: 124 },
    { name: 'Tempe Goreng', calories: 190, protein: 19, carbs: 9, fat: 11, fiber: 9, sugar: 2, sodium: 9 },
    { name: 'Sayur Bayam', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79 },
    { name: 'Pisang', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, sodium: 1 },
  ]

  const filteredFoods = popularFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addFood = (food: typeof popularFoods[0]) => {
    const newFood = {
      id: Date.now().toString(),
      ...food,
      timestamp: new Date(),
    }
    dispatch({ type: 'ADD_FOOD', payload: newFood })
    setSearchTerm('')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="nutrition-card"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Plus className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Tambah Makanan Cepat</h3>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari makanan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredFoods.map((food, index) => (
          <motion.button
            key={food.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => addFood(food)}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-700">
                  {food.name}
                </p>
                <p className="text-sm text-gray-500">
                  {food.calories} kal • {food.protein}g protein
                </p>
              </div>
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
            </div>
          </motion.button>
        ))}
      </div>

      {filteredFoods.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          <p>Makanan tidak ditemukan</p>
          <p className="text-sm">Coba gunakan scanner untuk makanan baru</p>
        </div>
      )}
    </motion.div>
  )
}

export default QuickAddFood