import React, { useState, useEffect }  from "react";
import TodoItem from "./TodoItem";
import "../App.css";
import FormTask from "./FormTask";
import Header from "./Header"

const TodoList = () => {
    const[tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isRequisition, setIsRequisition] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch("http://localhost:3000/tasks");
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        getTasks();
    }, [isRequisition]);
    
    function newTask(event, title, description) {
        event.preventDefault();

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
        .then(resp => resp.json())
        .then(resp => setTasks([...tasks, resp]));

        setShowForm(false);
    }

    function deleteTask(id) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => console.log("Tarefa deletada!"))
        .catch(err => console.error(err));

        const remainingTasks = tasks.filter(task => !(task.id == id));
        setTasks(remainingTasks);
    }

    function searchTasks(searchText) {
        if(searchText != "") {
            const filterTasks = tasks.filter(task => task.title.includes(searchText));
            setTasks(filterTasks)
        }else{
            setIsRequisition(!isRequisition)
        }
    }

    return(
        <>
            <Header searchTasks={searchTasks}/>
            <main>
                <h2>Tarefas <button onClick={() => {
                    setShowForm(true);
                }}>Nova tarefa </button></h2>
                <ul className="list">
                    {tasks.map((task, index) => {
                            return(
                                <TodoItem 
                                key= {index}
                                title={task.title} 
                                description={task.description}
                                id={task.id}
                                deleteTask={deleteTask}
                                />
                            )
                        })}
                </ul>
                <FormTask 
                isVisibility={showForm}  
                onClose={() => setShowForm(false)}
                newTask={newTask}/>
            </main>
        </>
    );
} 

export default TodoList;
