import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        const storedFileList = JSON.parse(localStorage.getItem('fileList')) || [];
        setFileList(storedFileList);
    }, []);

    useEffect(() => {
        localStorage.setItem('fileList', JSON.stringify(fileList));
    }, [fileList]);

    const addTodo = () => {
        if (!info.trim()) return;

        const newTodo = {
            id: Date.now(),
            todo: info,
            priority: priority
        };

        setFileList([...fileList, newTodo]);
        setInfo("");
    };

    const deleteTodo = (id) => {
        const newList = fileList.filter((todo) => todo.id !== id);
        setFileList(newList);
    };

    const updateTodo = (id, updatedTodo) => {
        const updatedList = fileList.map(todo => {
            if (todo.id === id) {
                return { ...todo, ...updatedTodo };
            }
            return todo;
        });
        setFileList(updatedList);
    };

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
