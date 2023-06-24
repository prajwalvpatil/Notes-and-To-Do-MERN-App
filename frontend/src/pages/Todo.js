import { useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext} from '../hooks/useAuthContext'

import TodoDetails from '../components/TodoDetails'
import TodoForm from "../components/TodoForm";

const Todo = () => {
    const {todos, dispatch} = useTodosContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              }) 
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_TODOS', payload: json})
            }
        }

        fetchTodos()
    }, [dispatch, user])

    return ( 
        <div className="home-div">
            <div className="todos">
                {todos && todos.map(todo => (
                    <TodoDetails key={todo._id} todo={todo}/>
                ))}
            </div>
            <TodoForm/>
        </div>
     );
}
 
export default Todo;