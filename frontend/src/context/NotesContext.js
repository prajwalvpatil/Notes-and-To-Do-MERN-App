import { createContext, useReducer } from "react";

export const NotesContext = createContext()

export const NotesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}  

const NotesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(NotesReducer, {
        notes: null
    })
    return ( 
        <NotesContext.Provider value={{...state,dispatch}}>
            {children}
        </NotesContext.Provider>
     );
}
 
export default NotesContextProvider;