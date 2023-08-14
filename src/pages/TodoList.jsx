import { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    return (
        <div className="pt-24 w-full">
            <div className='mx-auto w-[80%] p-4 bg-[#121212] text-white'>
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div className="flex justify-between mb-4 w-full">
                    <input
                        type="text"
                        className="w-[80%] rounded-md font-mono bg-black px-4 py-2 text-white border-2 border-cyan-200 focus:outline-none"
                        placeholder="Search across your blog.."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className='border px-2 py-1 border-cyan-100 rounded-md mr-2 grid items-center md:px-[15px] md:h-9 font-bold text-white hover:bg-gray-900'
                        onClick={addTodo}
                    >
                        Add
                    </button>
                </div>
                <ul className="list-none p-0">
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 border rounded mb-2"
                        >
                            <span>{todo}</span>
                            <button
                                className='border px-2 py-1 border-cyan-100 rounded-md mr-2 grid items-center md:px-[15px] md:h-9 font-bold text-white bg-rose-700 hover:bg-gray-900'
                                onClick={() => deleteTodo(index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
