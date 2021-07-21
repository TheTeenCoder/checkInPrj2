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
  submittedTimeAtom,
  checkinTimeAtom,
} from "../atoms/index";

const Form = () => {
  const [first, setFirst] = useAtom(firstNameAtom);
  const [second, setSecond] = useAtom(lastNameAtom);
  const [, setSubmittedTime] = useAtom(submittedTimeAtom);
  const [checkinTime, setCheckinTime] = useAtom(checkinTimeAtom);

  const [msg, setMsg] = useState("");

  //jotai atoms ->
  const [classes, setClasses] = useAtom(classesAtom);
  const [id, setId] = useAtom(idAtom);
  const [Qid, setQId] = useAtom(qIdAtom);
  const [filled, setFilled] = useAtom(filledAtom);
  const [submitted, setSubmitted] = useAtom(submittedAtom);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    var foundStudent = true;

    setId("");
    setQId("");
    setClasses([]);
    setFilled(false);
    setSubmitted(false);
    setCheckinTime(null);
    setSubmitted(null);

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
        const body = JSON.parse(res.data.body);

        if (!body.find_student) {
          console.log("+++++++" + body.find_student);
          setMsg("Cannot find student.");
          foundStudent = false;
          console.log(foundStudent);
          return;
        } else {
          //find student in request
          if (body.already_filled_questionaire) {
            setQId(body.questionaire_id);
            setFilled(true);
            setSubmittedTime(body.submit_time);
            if (body.checkin_time) {
              setCheckinTime(body.checkin_time);
            }
            history.push("/dashboard");
            return;
          } else {
            //stduent not submit questionaire yet
            setClasses(body.class_list);
            setId(body.student_id);
            setSubmitted(true);
            history.push("/dashboard");
          }
        }
      });
  };

  return (
    <div className="m-2 Center flex flex-col items-center bg-white border-2 border-gray-300 rounded-xl">
      <div id="form">
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col m-2 px-10 py-20 rounded-lg space-y-2 text-center">
            <label className="text-3xl mb-20">Check-in to SLMCS.</label>
            <input
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="rounded-xl border-2 border-gray-300 p-2"
              placeholder="first name..."
            />
            <input
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="rounded-xl border-2 border-gray-300 p-2"
              placeholder="last name..."
            />
            <button className="rounded-md p-2 bg-blue-400 border-2 border-white text-white">
              Submit.
            </button>
            {msg ? (
              <label className="text-md font-mono text-red-500">{msg}</label>
            ) : null}
            <label className="text-xs">Project made by Mark Fang.</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
