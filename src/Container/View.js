import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Assests/style.css';

function View() {
    let [todo, setTodo] = useState(null);
    let [search, setNewSearch] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/todo', {
        }).then(res => {
            res.json().then(record => {
                setTodo(record);
            })
        }).catch(err => { console.log(err) })
    })

    // DELETE DATA

    const deleteData = (id) => {
        // console.log(id);
        fetch("http://localhost:3001/todo/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => { console.log("Record Deleted") }).catch(err => { console.log(err) })
    }

    // SEARCH

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    return (
        <div align="center" >
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search Task"  />
            <br /><br />
            <table className='viewmain' border={1}>
                <tr>
                    <td>No</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Type</td>
                    <td>Action</td>
                </tr>
                {todo != null ? todo.filter((v) => {
                    if (search === '') {
                        return v;
                    }
                    else if (v.name.toLowerCase().includes(search.toLowerCase())) {
                        return v;
                    }
                }).map((v, i) => {
                    var colorName = 'green';
                    if (v.type == 'family') {
                        colorName = 'green'
                    }
                    else if (v.type == 'Personal') {
                        colorName = 'yellow'
                    }
                    else if (v.type == 'Office') {
                        colorName = 'pink'
                    }
                    return (
                       
                            <tr style={{backgroundColor:colorName}} id='todo'>
                                <td className='taskes'>{i + 1}</td>
                                <td >{v.name}</td>
                                <td >{v.date}</td>
                                <td>{v.type}</td>
                                <td className='deletebtn'><button onClick={(e) => deleteData(v.id)} className="dbtn">Delete</button></td>
                            </tr>
                        
                    )
                }) : "NOT FOUND"}
            </table>
            <NavLink to='/'><button className='taskbtn'>Add Task</button></NavLink>
        </div>
    )
}
export default View;