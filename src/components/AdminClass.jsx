import React from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { studentsAtom } from "../atoms/admin";
const AdminClass = (props) => {
  const [, setStudents] = useAtom(studentsAtom)
  const handleClick = async (e) => {
    await axios
      .post(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/admin/get-student-detail",
        { class_id: props.id }
      )
      .then((response) => {
        console.log(response)
        const body = JSON.parse(response.data.body);
        setStudents(body.students)
      });
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-2 border-gray-300 rounded-xl shadow-md flex flex-col p-5 hover:bg-gray-50 focus:outline-black focus:ring focus:border-blue-300 focus:outline-blue"
    >
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
