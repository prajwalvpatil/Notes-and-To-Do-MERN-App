import { useTodosContext } from "../hooks/useTodosContext";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext} from '../hooks/useAuthContext'

const TodoDetails = ({ todo }) => {
    const {dispatch} = useTodosContext()
    const {user} = useAuthContext()

    const handleClick = async () => {

        if(!user){
            return
        }
        
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    } 

    if (!todo) {
        return <div>Loading...</div>; // or any other appropriate loading state
      }
    return ( 
        <div className="todo-details">
            <h2>{todo.title}</h2>
            {todo.details && <p><strong>Details: </strong>{todo.details}</p>}            
            <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}>&#10004;</span>
        </div>
     );
}
 
export default TodoDetails;