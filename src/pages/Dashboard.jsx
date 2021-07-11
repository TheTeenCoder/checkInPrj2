import React, { useState } from "react";
import axios from "axios";
import ClassList from "../components/ClassList";
import Questionaire from "../components/Questionaire";
import { Redirect } from "react-router-dom";

import { useAtom } from "jotai";
import {
  classesAtom,
  idAtom,
  qIdAtom,
  filledAtom,
  firstNameAtom,
  lastNameAtom,
  submittedAtom,
} from "../atoms/index";

const Dashboard = () => {
  const [firstName] = useAtom(firstNameAtom);
  const [lastName] = useAtom(lastNameAtom);

  const [classes, setClasses] = useAtom(classesAtom);
  const [id, setId] = useAtom(idAtom);
  const [Qid, setQId] = useAtom(qIdAtom);
  const [filled, setFilled] = useAtom(filledAtom);
  const [submitted] = useAtom(submittedAtom);

  return (
    <div className="m-2">
      {filled ? <Redirect to={`/userqr/${Qid}`} /> : null}
      {submitted ? (
        <div>
          <div className=" flex flex-col m-2 content-around py-6 rounded-lg space-y-2 text-center">
            <h1 className="text-3xl">
              Hi {firstName.toUpperCase()}, {lastName.toUpperCase()}!
            </h1>
          </div>
          <ClassList classes={classes} />
          <hr />
          <Questionaire student_id={id} />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
