'use client';
import React, { useState } from 'react';
import '@/app/globals.css'; // If you have the `@` alias set up

interface ListItem {
    id: number;
    value: string;
}

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [list, setList] = useState<ListItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const updateInput = (value: string) => {
        setUserInput(value);
    };

    const handleAction = () => {
        if (userInput.trim() === '') return;

        if (editIndex !== null) {
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null);
        } else {
            const newItem: ListItem = {
                id: Math.random(),
                value: userInput,
            };
            setList([...list, newItem]);
        }
        setUserInput('');
    };

    const deleteItem = (id: number) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    const startEdit = (index: number) => {
        setUserInput(list[index].value);
        setEditIndex(index);
    };

    return (
        <div className="container">
            <div className="header">Todo List</div>
            <div className="input-container">
                <input
                    className="input-field"
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button className="add-button" onClick={handleAction}>
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div className="list-container">
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={item.id} className="list-item">
                            <span className="item-text">{item.value}</span>
                            <span>
                                <button className="delete-button" onClick={() => deleteItem(item.id)}>
                                    Delete
                                </button>
                                <button className="edit-button" onClick={() => startEdit(index)}>
                                    Edit
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="empty-message">No items in the list</div>
                )}
            </div>
        </div>
    );
};

export default App;
