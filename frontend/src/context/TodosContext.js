import { createContext, useReducer } from "react";

export const TodosContext = createContext()

export const TodosReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos]
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}  

const TodosContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(TodosReducer, {
        todos: null
    })
    return ( 
        <TodosContext.Provider value={{...state,dispatch}}>
            {children}
        </TodosContext.Provider>
     );
}
 
export default TodosContextProvider;