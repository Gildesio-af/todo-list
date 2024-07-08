import React, { useRef } from "react";

const FormTask = ({ isVisibility , onClose, newTask}) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        newTask(event, titleRef.current.value, descriptionRef.current.value);
        titleRef.current.value = '';
        descriptionRef.current.value = '';
    }

    return(
        <section id={"overlay"} className={(isVisibility ? "active" : "")}>
            <div className={"modal " + (isVisibility ? "active" : "")}>
                <form onSubmit={handleSubmit}>
                    <h3>Criar tarefa <box-icon name='x' size="md" onClick={onClose}></box-icon></h3>
                    <label htmlFor="title">Título</label>
                    <input type="text" id="title" placeholder="Título" ref={titleRef} required/>
                    <label htmlFor="description">Descrição</label>
                    <textarea name="description" id="description" placeholder="Descrição" ref={descriptionRef} required></textarea>
                    <button>Enviar</button>
                </form>
            </div>
        </section>
    )
}

export default FormTask; 