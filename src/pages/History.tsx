import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Filter, Search } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'

const History: React.FC = () => {
  const { state } = useNutrition()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')

  // Group foods by date
  const groupedHistory = state.history.reduce((acc, food) => {
    const date = food.timestamp.toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(food)
    return acc
  }, {} as Record<string, typeof state.history>)

  const filteredHistory = Object.entries(groupedHistory)
    .filter(([date, foods]) => 
      foods.some(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())

  const calculateDayTotals = (foods: typeof state.history) => {
    return foods.reduce((totals, food) => ({
      calories: totals.calories + food.calories,
      protein: totals.protein + food.protein,
      carbs: totals.carbs + food.carbs,
      fat: totals.fat + food.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Hari Ini'
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Kemarin'
    } else {
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Makanan</h1>
        <p className="text-gray-600">Lihat kembali perjalanan nutrisi Anda</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari makanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* History List */}
      <div className="space-y-6">
        {filteredHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Riwayat</h3>
            <p className="text-gray-600">Mulai catat makanan Anda untuk melihat riwayat di sini</p>
          </motion.div>
        ) : (
          filteredHistory.map(([date, foods], index) => {
            const dayTotals = calculateDayTotals(foods)
            
            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Date Header */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{formatDate(date)}</h3>
                      <p className="text-primary-100">{foods.length} makanan dicatat</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{dayTotals.calories}</p>
                      <p className="text-primary-100">total kalori</p>
                    </div>
                  </div>
                </div>

                {/* Daily Summary */}
                <div className="p-6 border-b border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dayTotals.protein.toFixed(1)}g</p>
                      <p className="text-sm text-gray-600">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{dayTotals.carbs.toFixed(1)}g</p>
                      <p className="text-sm text-gray-600">Karbohidrat</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dayTotals.fat.toFixed(1)}g</p>
                      <p className="text-sm text-gray-600">Lemak</p>
                    </div>
                  </div>
                </div>

                {/* Food List */}
                <div className="p-6">
                  <div className="space-y-3">
                    {foods
                      .filter(food => 
                        food.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((food, foodIndex) => (
                        <motion.div
                          key={food.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: foodIndex * 0.05 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{food.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Intl.DateTimeFormat('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(food.timestamp)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{food.calories} kal</p>
                            <p className="text-sm text-gray-500">
                              {food.protein}g • {food.carbs}g • {food.fat}g
                            </p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Weekly Summary */}
      {filteredHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ringkasan Mingguan</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(state.history.reduce((sum, food) => sum + food.calories, 0) / 7)}
              </p>
              <p className="text-sm text-blue-800">Rata-rata kalori/hari</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {state.history.length}
              </p>
              <p className="text-sm text-green-800">Total makanan</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {Object.keys(groupedHistory).length}
              </p>
              <p className="text-sm text-purple-800">Hari aktif</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((Object.keys(groupedHistory).length / 7) * 100)}%
              </p>
              <p className="text-sm text-orange-800">Konsistensi</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default History