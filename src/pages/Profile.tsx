import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, Target, Award, Edit3, Save, X } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'

const Profile: React.FC = () => {
  const { state, dispatch } = useNutrition()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(state.userProfile)
  const [editedGoals, setEditedGoals] = useState(state.dailyGoals)

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: editedProfile })
    dispatch({ type: 'UPDATE_GOALS', payload: editedGoals })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(state.userProfile)
    setEditedGoals(state.dailyGoals)
    setIsEditing(false)
  }

  const calculateBMI = () => {
    const heightInM = editedProfile.height / 100
    return (editedProfile.weight / (heightInM * heightInM)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' }
    return { category: 'Obese', color: 'text-red-600' }
  }

  const achievements = [
    { title: '7 Hari Berturut-turut', description: 'Konsisten mencatat makanan', icon: '🔥', earned: true },
    { title: 'Target Protein', description: 'Mencapai target protein harian', icon: '💪', earned: true },
    { title: 'Scan Master', description: 'Menggunakan scanner 10 kali', icon: '📸', earned: false },
    { title: 'Healthy Eater', description: 'Makan 5 porsi sayur dalam sehari', icon: '🥗', earned: false },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi dan target nutrisi Anda</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Simpan' : 'Edit'}</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Informasi Dasar</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.userProfile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usia</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({...editedProfile, age: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.userProfile.age} tahun</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Berat Badan</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile({...editedProfile, weight: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.userProfile.weight} kg</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi Badan</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({...editedProfile, height: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.userProfile.height} cm</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Aktivitas</label>
                {isEditing ? (
                  <select
                    value={editedProfile.activityLevel}
                    onChange={(e) => setEditedProfile({...editedProfile, activityLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 capitalize">{state.userProfile.activityLevel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tujuan</label>
                {isEditing ? (
                  <select
                    value={editedProfile.goal}
                    onChange={(e) => setEditedProfile({...editedProfile, goal: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="lose">Menurunkan Berat Badan</option>
                    <option value="maintain">Mempertahankan Berat Badan</option>
                    <option value="gain">Menambah Berat Badan</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900">
                    {state.userProfile.goal === 'lose' && 'Menurunkan Berat Badan'}
                    {state.userProfile.goal === 'maintain' && 'Mempertahankan Berat Badan'}
                    {state.userProfile.goal === 'gain' && 'Menambah Berat Badan'}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Batal</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Daily Goals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Target Harian</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kalori</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedGoals.calories}
                    onChange={(e) => setEditedGoals({...editedGoals, calories: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.dailyGoals.calories} kal</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Protein</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedGoals.protein}
                    onChange={(e) => setEditedGoals({...editedGoals, protein: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.dailyGoals.protein}g</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Karbohidrat</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedGoals.carbs}
                    onChange={(e) => setEditedGoals({...editedGoals, carbs: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.dailyGoals.carbs}g</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lemak</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedGoals.fat}
                    onChange={(e) => setEditedGoals({...editedGoals, fat: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{state.dailyGoals.fat}g</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* BMI Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Anda</h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">{calculateBMI()}</p>
              <p className={`text-lg font-medium ${getBMICategory(parseFloat(calculateBMI())).color}`}>
                {getBMICategory(parseFloat(calculateBMI())).category}
              </p>
            </div>
            <div className="mt-4 bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-600 text-center">
                BMI dihitung berdasarkan tinggi dan berat badan Anda
              </p>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Pencapaian</h3>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.earned 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      achievement.earned ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </p>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile