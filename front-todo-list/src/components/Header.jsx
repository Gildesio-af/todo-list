import React, { useRef, useState, useEffect } from "react";

const Header = ({searchTasks}) => {
    const searchText = useRef(null);
    const [searchState, setSearchState] = useState('');

    useEffect(() => {
        if (searchState.trim() === '') {
            handleSearchTasks();
        }
    }, [searchState]);


    function handleSearchTasks() {
        searchTasks(searchState);
    }
    
    function watchSearchText() {
        setSearchState(searchText.current.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') 
            handleSearchTasks();
    }

    return(
        <header className="header">
            <h1>Todo list</h1>
            <div>
                <input type="text" placeholder="Pesquisar tarefa" ref={searchText} onChange={watchSearchText} onKeyDown={handleKeyDown}/>
                <box-icon name='search-alt-2' size="md" onClick={handleSearchTasks}></box-icon>
            </div>
        </header>
    )
}

export default Header;
