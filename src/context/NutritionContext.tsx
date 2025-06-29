import React, { createContext, useContext, useReducer, ReactNode } from 'react'

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

interface NutritionState {
  dailyGoals: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  todaysFoods: FoodItem[]
  history: FoodItem[]
  userProfile: {
    name: string
    age: number
    weight: number
    height: number
    activityLevel: string
    goal: string
  }
}

type NutritionAction =
  | { type: 'ADD_FOOD'; payload: FoodItem }
  | { type: 'REMOVE_FOOD'; payload: string }
  | { type: 'UPDATE_GOALS'; payload: Partial<NutritionState['dailyGoals']> }
  | { type: 'UPDATE_PROFILE'; payload: Partial<NutritionState['userProfile']> }

const initialState: NutritionState = {
  dailyGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  },
  todaysFoods: [],
  history: [],
  userProfile: {
    name: 'John Doe',
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain',
  },
}

const nutritionReducer = (state: NutritionState, action: NutritionAction): NutritionState => {
  switch (action.type) {
    case 'ADD_FOOD':
      return {
        ...state,
        todaysFoods: [...state.todaysFoods, action.payload],
        history: [...state.history, action.payload],
      }
    case 'REMOVE_FOOD':
      return {
        ...state,
        todaysFoods: state.todaysFoods.filter(food => food.id !== action.payload),
      }
    case 'UPDATE_GOALS':
      return {
        ...state,
        dailyGoals: { ...state.dailyGoals, ...action.payload },
      }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload },
      }
    default:
      return state
  }
}

const NutritionContext = createContext<{
  state: NutritionState
  dispatch: React.Dispatch<NutritionAction>
} | null>(null)

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(nutritionReducer, initialState)

  return (
    <NutritionContext.Provider value={{ state, dispatch }}>
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  const context = useContext(NutritionContext)
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider')
  }
  return context
}