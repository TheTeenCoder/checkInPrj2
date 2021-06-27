import React, {useState} from 'react'
import axios from 'axios'
import ClassList from '../components/ClassList';
import Questionaire from '../components/Questionaire';
import {Redirect} from 'react-router-dom'
const Dashboard = () => {

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [msg, setMsg] = useState('');
    const [classes, setClasses] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [filled, setFilled] = useState(false);
    const [id, setId] = useState('');
    const [Qid, setQId] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (first.trim() === "" || second.trim() === ""){
            setMsg("First Name and Last Name cannot be empty!")
            return;
        }


        axios.post("https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/student", {
            first_name: first.trim(),
            last_name: second.trim()
        })
        .then(res => {
            const body = JSON.parse(res.data.body);
            if(!body.find_student){
                setMsg('Cannot find student.')
                return;
            }
            if(body.already_filled_questionaire){
                setQId(body.questionaire_id)
                setFilled(true);
                return;
            }
            console.log(body)
            setMsg('');
            setClasses(body.class_list);
            setId(body.student_id);
            setSubmitted(true);            

            console.log(submitted, msg, filled)


        })
    }

    return (
        <div className="m-2">
            {filled ? <Redirect to={`/userqr/${Qid}`}/> : null}

            <div id="form">
                { !submitted ?
                    <form onSubmit={onSubmit}>
                        <div className=" flex  flex-col  content-around m-2 border-2 border-gray-300 px-10 py-20 rounded-lg space-y-2 text-center">
                            <label className="text-xl">Sign in.</label>
                            <input  value={first} onChange={(e) => setFirst(e.target.value)} className="rounded-xl border-2 border-gray-300 p-2 " placeholder="first name..."/>
                            <input  value={second} onChange={(e) => setSecond(e.target.value)}className="rounded-xl border-2 border-gray-300 p-2" placeholder="last name..."/>
                            <button className="rounded-md p-2 bg-blue-300 border-2 border-black  ">Submit.</button>
                            {msg ? <label className="text-xl text-red-500">{msg}</label> : null}
                        </div>
                    </form>

                    :
                    <div className=" flex flex-col m-2 content-around border-2 border-gray-300 py-6 rounded-lg space-y-2 text-center">
                        <h1 className="text-3xl">Hi {first.toUpperCase()}, {second.toUpperCase()}!</h1>
                    </div>
                }   
                <ClassList
                    classes={classes}
                />
                <hr/>
            </div>
            {
                submitted ? 
                 <Questionaire student_id={id}/>
                : null
                    
            }
        </div>
    )
}

export default Dashboard;