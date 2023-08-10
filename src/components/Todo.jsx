import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [input, setInput] = useState("");
  const [store, setStore] = useState([]);
  const [editId, setEditId] = useState(0);
  const inputRef = useRef(null);
  const addTodo = () => {
    if (input !== "") {
      setStore([...store, { list: input, id: Date.now(), status: false }]);
      setInput("");
    }
    if (editId) {
      const editTodo = store.find((todo) => todo.id == editId);

      const upDateTdo = store.map((to) =>
        to.id == editTodo.id
          ? (to = { id: to.id, list: input })
          : (to = { id: to.id, list: to.list })
      );
      setStore(upDateTdo);
      setEditId(0);
      setInput("");
    }
  };
  console.log(store);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleDelete = (id) => {
    setStore(store?.filter((item) => item.id !== id));
  };
  const handleComplete = (id) => {
    let complete = store.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setStore(complete);
  };

  const onEdit = (id) => {
    const editTodo = store.find((data) => data.id === id);
    console.log(editTodo.list);
    setInput(editTodo.list);
    setEditId(editTodo.id);
  };

  useEffect(() => {
    inputRef.current.focus(); // it access input field
  });
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your TODO"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          ref={inputRef}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>

      <div className="todoList">
        <ul className="ulItems">
          {store.map((data) => (
            <li className="listItems">
              <div id={data.status ? "listItem" : ""}>{data.list}</div>
              <span>
                <IoMdDoneAll
                  className="listIcons"
                  id="complete"
                  title="complete"
                  onClick={() => handleComplete(data.id)}
                />
                <FiEdit
                  className="listIcons"
                  id="edit"
                  title="edit"
                  onClick={() => onEdit(data.id)}
                />
                <MdDelete
                  className="listIcons"
                  id="delete"
                  title="delete"
                  onClick={() => handleDelete(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
