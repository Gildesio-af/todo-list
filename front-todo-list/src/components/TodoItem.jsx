import React, { useRef } from "react";

const TodoItem = ({title, description, id, deleteTask}) => {
    const idRef = useRef(null);

    function handleDelete() {
        const taskId = idRef.current;
        deleteTask(taskId.id)
    }

    return (
        <li className="task" id={id} ref={idRef}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="actions">
                <box-icon type='solid' name='trash' size="sm" onClick={handleDelete}></box-icon>
            </div>
        </li>
    );
}

export default TodoItem;