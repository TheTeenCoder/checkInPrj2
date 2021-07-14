import { useAtom } from "jotai";
import React from "react";
import { loadingAtom, studentsAtom, weekAtom } from "../atoms/admin";
import { Check, X } from "react-feather";
import { BeatLoader } from "react-spinners";
const AdminStudents = () => {
  const [students] = useAtom(studentsAtom);
  const [loading] = useAtom(loadingAtom);
  const [week, setWeek] = useAtom(weekAtom);

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
  };
  // const renderWeeks = () => {
  //   const n = 10;
  //   [...Array(n)].map((e, i) => <span className="busterCards" key={i}>♦</span>)

  // };

  return (
    <div className="items-center text-center p-5">
      {loading ? (
        <div className=" flex flex-col items-center ">
          <BeatLoader color="blue" loading={loading} />
        </div>
      ) : (
        <div>
          <select
            className="flex items-start"
            onChange={handleWeekChange}
            value={week}
          >
            <option value={28}>28</option>
            {[...Array(10)].map((e, i) => (
              <option className="busterCards" value={i + 1} key={i + 1}>
                Week {i + 1}
              </option>
            ))}
          </select>
          <table className="w-full h-1/2">
            <thead>
              <tr>
                <th>#id</th>
                <th>name</th>
                <th>Submit Time</th>
                <th>Check-in Time</th>
                <th>Status</th>
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
                    <td>{element.submit_time}</td>
                    <td>{element.checkin_time}</td>
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
      )}
    </div>
  );
};

export default AdminStudents;
