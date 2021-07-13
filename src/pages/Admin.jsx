import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminStudents from "../components/AdminStudents";

const Admin = () => {
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
