import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useAtom } from "jotai";
import {
  classesAtom,
  idAtom,
  qIdAtom,
  filledAtom,
  firstNameAtom,
  lastNameAtom,
  submittedAtom,
} from "../atoms/index";

const Form = () => {
  const [first, setFirst] = useAtom(firstNameAtom);
  const [second, setSecond] = useAtom(lastNameAtom);
  const [msg, setMsg] = useState("");

  //jotai atoms ->
  const [classes, setClasses] = useAtom(classesAtom);
  const [id, setId] = useAtom(idAtom);
  const [Qid, setQId] = useAtom(qIdAtom);
  const [filled, setFilled] = useAtom(filledAtom);
  const [, setSubmitted] = useAtom(submittedAtom);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (first.trim() === "" || second.trim() === "") {
      setMsg("First Name and Last Name cannot be empty!");
      return;
    }
    axios
      .post(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/student",
        {
          first_name: first.trim(),
          last_name: second.trim(),
        }
      )
      .then((res) => {
        setId('')
        setQId('')
        setClasses([])
        setFilled(false)
        setSubmitted(false)

        const body = JSON.parse(res.data.body);
        if (!body.find_student) {
          setMsg("Cannot find student.");
          return;
        }
        if (body.already_filled_questionaire) {
          setQId(body.questionaire_id);
          setFilled(true);
          return;
        }
        console.log(body);
        setMsg("");
        setClasses(body.class_list);
        setId(body.student_id);
        setSubmitted(true);
        console.log(msg, filled);
      });
    history.push("/dashboard");
  };

  return (
    <div className="m-2">
      <div id="form">
        <form onSubmit={handleSubmit}>
          <div className=" flex  flex-col  content-around m-2 border-2 border-gray-300 px-10 py-20 rounded-lg space-y-2 text-center">
            <label className="text-xl">Sign in.</label>
            <input
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="rounded-xl border-2 border-gray-300 p-2 "
              placeholder="first name..."
            />
            <input
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="rounded-xl border-2 border-gray-300 p-2"
              placeholder="last name..."
            />
            <button className="rounded-md p-2 bg-blue-300 border-2 border-black  ">
              Submit.
            </button>
            {msg ? <label className="text-xl text-red-500">{msg}</label> : null}
          </div>
        </form>

        <hr />
      </div>
    </div>
  );
};

export default Form;
