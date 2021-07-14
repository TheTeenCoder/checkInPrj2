import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  loadingAtom,
  studentsAtom,
  weekAtom,
  currentWeekAtom,
  classIdAtom,
} from "../atoms/admin";
import { Check, X } from "react-feather";
import { BeatLoader } from "react-spinners";
import { weekNumber } from "weeknumber";
import axios from "axios";
const AdminStudents = (props) => {
  const [students, setStudents] = useAtom(studentsAtom);
  const [loading] = useAtom(loadingAtom);
  const [week, setWeek] = useAtom(weekAtom);
  const [id] = useAtom(classIdAtom);

  const [currentWeek, setCurrentWeek] = useAtom(currentWeekAtom);

  useEffect(() => {
    setCurrentWeek(weekNumber());
  }, []);
  const post = (week_no) => {
    axios
      .post(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/admin/get-student-detail",
        { class_id: id, week_num: week_no }
      )
      .then((response) => {
        console.log(response);
        const body = JSON.parse(response.data.body);
        setStudents(body.students);
      });
  };
  const handleWeekChange = (e) => {
    setWeek(e.target.value);
    //console.log("week=" + e.target.value);
    post(e.target.value);
  };

  const start_end_date_of_week_number = (week_no) => {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay() + 1; // Monday is the first day
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toISOString().split("T")[0];
    var lastday = new Date(curr.setDate(last)).toISOString().split("T")[0];
    return firstday + " TO " + lastday;
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
            {[
              currentWeek,
              currentWeek - 1,
              currentWeek - 2,
              currentWeek - 3,
              currentWeek - 4,
            ].map((e, i) => (
              <option className="busterCards" value={e} key={e}>
                Week {e} ({start_end_date_of_week_number(e)})
              </option>
            ))}
          </select>
          <table className="w-full h-1/2">
            <thead>
              <tr>
                <th>#id</th>
                <th>name</th>
                <th>Questionaire Submit Time</th>
                <th>Class Checkin Time</th>
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
