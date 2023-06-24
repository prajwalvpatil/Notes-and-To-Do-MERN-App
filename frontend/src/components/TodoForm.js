import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext} from '../hooks/useAuthContext'

const TodoForm = () => {
    const {dispatch} = useTodosContext()
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const todo = {title,details}

        const reponse = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await reponse.json()

        if (!reponse.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (reponse.ok) {
            setTitle('')
            setDetails('')
            setError(null)
            setEmptyFields([])
            console.log("New Task added")
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>
            <br />
            <label>Title: </label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error': ''}
            />

            <label>Details: </label>
            <input 
            type="text"
            onChange={(e) => setDetails(e.target.value)} 
            value={details}
            // className={emptyFields.includes('title') ? 'error': ''}
            />

            <button>Add</button> 
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default TodoForm;