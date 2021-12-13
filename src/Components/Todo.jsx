import axios from "axios";
import { useEffect, useState} from "react";
import Todoinput from "./Todoinput";

    const getTodos = () => {
        const config = {
            url: `http://localhost:3000/userDetails`,
            method: 'GET'
        };
        return axios(config)

    };

    const createTodo = (title) => {
        const payload = {
            title,
            status: false,
        };
        const config = {
            url: `http://localhost:3000/userDetails`,
            method: 'POST',
            data: payload
        };
        return axios(config)
    };




const Todos = () => {

    const [isLoading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        handleGetTodos();
    },[]);

    const handleGetTodos = () => {
        return getTodos()
        .then((res) =>{
            setTodos(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const updatedTodos = (id, status) => {
        return axios({
            url: `http://localhost:3000/userDetails/${id}`,
            method: "PATCH",
            data: {
                status: status
            }
        })
    };

    const markEverythingisCompleted = async () => {
        try {
            const ids = todos.map((item) => item.id)

            for(let id of ids) {
                console.log(id);
                await updatedTodos(id, true);
            }
            await handleGetTodos();
        }catch(err) {}
    };

    const handleToggle = async(id, status) => {
        updatedTodos(id, status);
        await handleGetTodos();
    }

    const updateDelete = (id) => {
        return axios({
            url: `http://localhost:3000/userDetails/${id}`,
            method: 'DELETE',
        });

    }

    const handleDelete = async(id) => {
        updateDelete(id);
        await handleGetTodos();
    }



    const onSubmit = async (title) =>{
        try {
                setLoading(true);
                await createTodo(title);
                await handleGetTodos();
                setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    };

    if(isLoading){
        return <h5>Looding...</h5>
    }



return (
    <div>
        <Todoinput onSubmit={onSubmit}/>

        <div>
            {todos.map((item) => (
                <div key={item.id}>
                <span>{item.title}--</span>
                <span>{item.status === true ? "Done" : "Note Done"} --- </span>
                <button onClick={()=> handleToggle(item.id, !item.status)}>Toggle</button>
               <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            )

            )}
        </div>

        <button onClick={markEverythingisCompleted}>All Completed</button>

    </div>


)
}

export default Todos;