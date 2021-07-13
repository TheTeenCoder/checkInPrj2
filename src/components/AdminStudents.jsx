import { useAtom } from "jotai";
import React from "react";
import { studentsAtom } from "../atoms/admin";
import { Check, X } from "react-feather";
const AdminStudents = () => {
  const [students] = useAtom(studentsAtom);

  return (
    <div className="items-center text-center p-5">
      <table className="w-full h-1/2">
        <thead>
          <tr>
            <th>#id</th>
            <th>name</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.student_id}</td>
                <td>
                  {element.en_name}, {element.cn_name}
                </td>
                <td>
                  <div className="flex justify-center">
                    {element.fill_questionair ? (
                      <Check color="green" />
                    ) : (
                      <X color="red" />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudents;
