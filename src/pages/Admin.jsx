import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import  AdminStudents  from "../components/AdminStudents";

const Admin = () => {
  return (
    <div>
      <div className="flex  ">
        <div className="w-1/3">
          <AdminSidebar />
        </div>
        <div className="w-2/3">
            <AdminStudents/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
