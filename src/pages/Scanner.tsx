import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Zap, Info } from 'lucide-react'
import { useNutrition } from '../context/NutritionContext'

const Scanner: React.FC = () => {
  const { dispatch } = useNutrition()
  const [isScanning, setIsScanning] = useState(false)
  const [scannedResult, setScannedResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockScanResults = [
    {
      name: 'Nasi Gudeg Yogya',
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 3,
      sugar: 6,
      sodium: 450,
      confidence: 92
    },
    {
      name: 'Gado-gado',
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 12,
      fiber: 8,
      sugar: 8,
      sodium: 380,
      confidence: 88
    },
    {
      name: 'Rendang Daging',
      calories: 420,
      protein: 28,
      carbs: 8,
      fat: 32,
      fiber: 2,
      sugar: 4,
      sodium: 520,
      confidence: 95
    }
  ]

  const simulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setScannedResult(randomResult)
      setIsScanning(false)
    }, 3000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      simulateScan()
    }
  }

  const addScannedFood = () => {
    if (scannedResult) {
      const newFood = {
        id: Date.now().toString(),
        name: scannedResult.name,
        calories: scannedResult.calories,
        protein: scannedResult.protein,
        carbs: scannedResult.carbs,
        fat: scannedResult.fat,
        fiber: scannedResult.fiber,
        sugar: scannedResult.sugar,
        sodium: scannedResult.sodium,
        timestamp: new Date(),
      }
      dispatch({ type: 'ADD_FOOD', payload: newFood })
      setScannedResult(null)
    }
  }

  const resetScan = () => {
    setScannedResult(null)
    setIsScanning(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scanner Makanan AI</h1>
        <p className="text-gray-600">Foto makanan Anda dan dapatkan informasi nutrisi secara otomatis</p>
      </motion.div>

      {!scannedResult && !isScanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Camera Preview Area */}
          <div className="bg-gray-900 rounded-3xl p-8 mb-6 relative overflow-hidden">
            <div className="aspect-square bg-gray-800 rounded-2xl flex items-center justify-center relative">
              <div className="absolute inset-4 border-2 border-white/30 rounded-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Corner guides */}
              <div className="absolute top-8 left-8 w-6 h-6 border-l-4 border-t-4 border-white"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-r-4 border-t-4 border-white"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 border-l-4 border-b-4 border-white"></div>
              <div className="absolute bottom-8 right-8 w-6 h-6 border-r-4 border-b-4 border-white"></div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-white text-lg font-medium mb-2">Arahkan kamera ke makanan</p>
              <p className="text-gray-300 text-sm">Pastikan makanan terlihat jelas dalam frame</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulateScan}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Ambil Foto</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Foto</span>
            </motion.button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Tips untuk hasil terbaik:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pastikan pencahayaan yang cukup</li>
                  <li>• Foto dari atas dengan jarak yang tepat</li>
                  <li>• Hindari bayangan pada makanan</li>
                  <li>• Satu jenis makanan per foto untuk akurasi maksimal</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <Zap className="w-16 h-16 text-primary-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Menganalisis Makanan...</h2>
            <p className="text-gray-600 mb-6">AI sedang mengidentifikasi nutrisi dalam foto Anda</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {scannedResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{scannedResult.name}</h2>
                  <p className="text-green-100">Akurasi: {scannedResult.confidence}%</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{scannedResult.calories}</p>
                  <p className="text-green-100">kalori</p>
                </div>
              </div>
            </div>

            {/* Nutrition Details */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Nutrisi</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Protein</p>
                  <p className="text-2xl font-bold text-blue-900">{scannedResult.protein}g</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">Karbohidrat</p>
                  <p className="text-2xl font-bold text-red-900">{scannedResult.carbs}g</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Lemak</p>
                  <p className="text-2xl font-bold text-green-900">{scannedResult.fat}g</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 font-medium">Serat</p>
                  <p className="text-2xl font-bold text-yellow-900">{scannedResult.fiber}g</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Gula</span>
                  <span className="font-semibold">{scannedResult.sugar}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Sodium</span>
                  <span className="font-semibold">{scannedResult.sodium}mg</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addScannedFood}
                  className="btn-primary"
                >
                  Tambah ke Diary
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetScan}
                  className="btn-secondary"
                >
                  Scan Lagi
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Scanner