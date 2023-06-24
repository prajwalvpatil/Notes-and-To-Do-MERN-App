import {useAuthContext} from './useAuthContext'
import {useNotesContext} from './useNotesContext'
import {useTodosContext} from './useTodosContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: notesDispatch} = useNotesContext()
    const {dispatch: todosDispatch} = useTodosContext()


    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        notesDispatch({type: 'SET_NOTES', payload: null})
        todosDispatch({type: 'SET_TODOS', payload: null})
    }

    return {logout}
}