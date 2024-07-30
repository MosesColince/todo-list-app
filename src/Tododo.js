import React, { useState, useEffect } from 'react';
import axios from 'axios';

const priorityColors = {
    High: 'red',
    Medium: 'yellow',
    Low: 'green'
};

function Tododo() {
    const [fileList, setFileList] = useState([]);
    const [info, setInfo] = useState("");
    const [priority, setPriority] = useState("Low");
    const [searchTerm, setSearchTerm] = useState("");
    const [editTodo, setEditTodo] = useState("");
    const [editPriority, setEditPriority] = useState("");
    const [editUserId, setEditUserId] = useState(null);
    

   /* useEffect(() => {
        const storedFileList = JSON.parse(localStorage.getItem('fileList')) || [];
        setFileList(storedFileList);
    }, []);
*/
    useEffect(() => {
        FileList();
    }, [])

    const fetchTodo = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/users/${id}`);
            setInfo(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setInfo(null);
        }
    };

    const addTodo = async () => {
        try {
            await axios.post('http://localhost:3002/users', { info, priority});
            fetchTodo();
            setInfo('');
            setPriority('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
   /* const addTodo = () => {
        if (!info.trim()) return;

        const newTodo = {
            id: Date.now(),
            todo: info,
            priority: priority
        };

        setFileList([...fileList, newTodo]);
        setInfo("");
    };
*/

const deleteTodo = async (id) => {
    try {
        await axios.delete(`http://localhost:3002/users/${id}`);
        fetchTodo();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
/*
    const deleteTodo = (id) => {
        const newList = fileList.filter((todo) => todo.id !== id);
        setFileList(newList);
    };
*/
const updateTodo = async (id) => {
    try {
        await axios.put(`http://localhost:3002/users/${id}`, { todo: editTodo, priority: editPriority });
        setEditUserId(null);
        setEditTodo('');
        setEditPriority('');
        fetchTodo();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
/*
    const updateTodo = (id, updatedTodo) => {
        const updatedList = fileList.map(todo => {
            if (todo.id === id) {
                return { ...todo, ...updatedTodo };
            }
            return todo;
        });
        setFileList(updatedList);
    };
*/

/*const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditTodo(user.info);
    setEditPriority(user.priority);
};*/
    const handlePriorityColor = (priority) => {
        return priorityColors[priority] || 'black';
    };

    const filteredList = fileList.filter(item =>
        item.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>To Do LIST</h1>
            <input
                type='text'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Enter Task Description"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button onClick={addTodo}>Add Todo</button>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredList.map((item) => (
                    <li key={item.id}>
                        <span style={{ color: handlePriorityColor(item.priority) }}>
                            {item.todo} - Priority: {item.priority}
                        </span>
                        <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        <button onClick={() => updateTodo(item.id, {
                            todo: prompt('Update Task Description', item.todo),
                            priority: prompt('Update Priority', item.priority)
                        })}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tododo;
