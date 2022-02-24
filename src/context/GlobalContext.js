import React, {createContext, useContext, useReducer, useEffect} from 'react'

// initial state
const initialState = {
  currentSchemeLetter: 'A',
  currentSchemeDetails: {},
}

// reducer - how to interact w/ the state   
const globalReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

// create the context
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  const value = {
    ...state,
  }

  // action: get current scheme
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}