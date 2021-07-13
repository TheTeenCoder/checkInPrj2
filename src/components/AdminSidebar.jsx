import React, { useEffect, useState } from "react";
import axios from "axios";
import { classesAtom } from "../atoms/admin";
import { useAtom } from "jotai";
import AdminClass from "./AdminClass";
const AdminSidebar = () => {
  const [classes, setClasses] = useAtom(classesAtom);
  const [message, setMessage] = useState("");

  const fetchClasses = async () => {
    await axios
      .get(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/admin/get-class-list"
      )
      .then((response) => {
        const body = JSON.parse(response.data.body);
        console.log(body);
        setClasses(body.class_list);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Something went wrong");
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center border-r-2 border-gray-300">
        <h1 className="font-bold mt-10 text-xl">Admin Dashboard</h1>
        <nav
          id="nav"
          className="mt-10 p-2 flex flex-col space-y-4 h-screen overflow-auto"
        >
          {/* <button className="py-2 px-20 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-blue text-black  rounded-xl border-2 border-gray-300 shadow-lg ">
            Classes
          </button>
          <button className="py-2 px-20 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-blue text-black  rounded-xl border-2 border-gray-300 shadow-lg ">
            Settings
          </button> */}
          {classes.map((element) => {
            return (
              <AdminClass
                class_title={element.class_title}
                teacher_en_name={element.teacher_en_name}
                teacher_cn_name={element.teacher_cn_name}
                room_no={element.room_no}
                session={element.session}
                id={element.class_id}
                index={element.class_id}
                key={element.class_id}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
