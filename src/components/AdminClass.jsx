import React, { useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import {
  focusAtom,
  loadingAtom,
  studentsAtom,
  weekAtom,
  classIdAtom,
} from "../atoms/admin";
import { weekNumber } from "weeknumber";
const AdminClass = (props) => {
  const [, setStudents] = useAtom(studentsAtom);
  const [index, setFocus] = useAtom(focusAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [week, setWeek] = useAtom(weekAtom);
  //const [currentWeek, setCurrentWeek] = useAtom(setCurrentWeek);

  const [, setId] = useAtom(classIdAtom);

  const post = () => {
    console.log("AdminClass" + week + " ,  " + weekNumber());

    axios
      .post(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/admin/get-student-detail",
        { class_id: props.id, week_num: weekNumber() }
      )
      .then((response) => {
        console.log(response);
        const body = JSON.parse(response.data.body);
        setStudents(body.students);
        setId(props.id);
      });
  };
  const handleClick = (e) => {
    setWeek(weekNumber());
    setFocus(props.index);
    setLoading(true);
    post();
    setLoading(false);
  };

  // useEffect(() => {
  //   handleClick();
  // }, [week, handleClick])

  // useEffect(() => {
  //   post();
  // }, [week])

  var style =
    "cursor-pointer border-2 rounded-xl shadow-md flex flex-col p-5 hover:bg-gray-50 focus:outline-black  focus:ring-2 focus:border-blue-300 focus:outline-blue";
  if (index === props.index) {
    style += " border-blue-600";
  } else {
    style += " border-gray-300";
  }

  return (
    <div onClick={handleClick} className={style}>
      <h1 className="text-lg md:text-xl font-semibold">{props.class_title}</h1>
      <div className="text-sm md:text-lg">
        <p>
          Teacher: {props.teacher_en_name}, {props.teacher_cn_name}
        </p>
        <p>Room: {props.room_no}</p>
        <p>Session: {props.session}</p>
      </div>
    </div>
  );
};

export default AdminClass;
