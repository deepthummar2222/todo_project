import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Assests/style.css';

function ToDo() {

    let [name, setName] = useState('');
    let [date, setDate] = useState('');
    let [type, setType] = useState('');

    const submitData = (event) => {
        event.preventDefault();
        let todoRecord = {
            name: name,
            date: date,
            type: type
        }
        fetch("http://localhost:3001/todo/", {
            method: "POST",
            body: JSON.stringify(todoRecord),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => { console.log("Record Added") }).catch(err => { console.log(err) })
    }

    return (
        <div align="center">

            <h1>To Do List</h1>

            <form method='post' onSubmit={(e) => submitData(e)}>
                <table>
                    <tr >
                        <td className='tasks'>
                            <tr>
                                <td>
                                    <input type="text" name="name" className='inputs' placeholder='Add your Task' onChange={(e) => setName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="date" name="date" className='inputs' onChange={(e) => setDate(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="type" onChange={(e) => setType(e.target.value)} className='inputs' >

                                        <option>----select----</option>
                                        <option onChange={(e) => setType(e.target.value)}>Family</option>
                                        <option onChange={(e) => setType(e.target.value)}>Personal</option>
                                        <option onChange={(e) => setType(e.target.value)}>Office</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="submit" value="Add" className='btn' />
                                </td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </form>
            <br /><br />
            <NavLink to='/view'><button className='btn1'>View Task</button></NavLink>
        </div>
    )
}
export default ToDo