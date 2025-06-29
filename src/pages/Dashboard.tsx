import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, TrendingUp, Award } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'
import NutritionChart from '../components/NutritionChart'
import CalorieProgress from '../components/CalorieProgress'
import QuickAddFood from '../components/QuickAddFood'
import RecentFoods from '../components/RecentFoods'

const Dashboard: React.FC = () => {
  const { state } = useNutrition()
  
  const todaysCalories = state.todaysFoods.reduce((total, food) => total + food.calories, 0)
  const todaysProtein = state.todaysFoods.reduce((total, food) => total + food.protein, 0)
  const todaysCarbs = state.todaysFoods.reduce((total, food) => total + food.carbs, 0)
  const todaysFat = state.todaysFoods.reduce((total, food) => total + food.fat, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Selamat Datang, {state.userProfile.name}!</h2>
              <p className="text-primary-100">Mari capai target nutrisi hari ini</p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="nutrition-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kalori</p>
              <p className="text-2xl font-bold text-gray-900">{todaysCalories}</p>
              <p className="text-xs text-gray-500">/ {state.dailyGoals.calories}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="nutrition-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-2xl font-bold text-gray-900">{todaysProtein.toFixed(1)}g</p>
              <p className="text-xs text-gray-500">/ {state.dailyGoals.protein}g</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">💪</span>
            </div>
          </div>
        </div>

        <div className="nutrition-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Karbohidrat</p>
              <p className="text-2xl font-bold text-gray-900">{todaysCarbs.toFixed(1)}g</p>
              <p className="text-xs text-gray-500">/ {state.dailyGoals.carbs}g</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">🌾</span>
            </div>
          </div>
        </div>

        <div className="nutrition-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lemak</p>
              <p className="text-2xl font-bold text-gray-900">{todaysFat.toFixed(1)}g</p>
              <p className="text-xs text-gray-500">/ {state.dailyGoals.fat}g</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">🥑</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <CalorieProgress 
              current={todaysCalories} 
              goal={state.dailyGoals.calories} 
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <NutritionChart 
              protein={todaysProtein}
              carbs={todaysCarbs}
              fat={todaysFat}
              goals={state.dailyGoals}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <QuickAddFood />
          </motion.div>

          <motion.div variants={itemVariants}>
            <RecentFoods foods={state.todaysFoods.slice(-5)} />
          </motion.div>

          {/* Achievement Card */}
          <motion.div variants={itemVariants}>
            <div className="nutrition-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pencapaian</h3>
                  <p className="text-sm text-gray-600">Streak 7 hari!</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3">
                <p className="text-white text-sm font-medium">
                  Selamat! Anda telah konsisten mencatat makanan selama 7 hari berturut-turut! 🎉
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard