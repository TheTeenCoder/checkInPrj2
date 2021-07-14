import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { weekAtom } from "../atoms/admin";
import AdminSidebar from "../components/AdminSidebar";
import AdminStudents from "../components/AdminStudents";
import { weekNumber } from "weeknumber";
const Admin = () => {
  const [week, setWeek] = useAtom(weekAtom);

  useEffect(() => {
    setWeek(weekNumber())
  }, []);

  return (
    <div>
      <div className="flex  ">
        <div className="w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-4/5">
          <AdminStudents />
        </div>
      </div>
    </div>
  );
};

export default Admin;
