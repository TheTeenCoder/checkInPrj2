import React, { useState } from "react";
import { useMount } from "react-use";
import axios from "axios";
import { Check, X } from "react-feather";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAtom } from "jotai";
const Verify = () => {
  const { qr_id } = useParams();
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const renderStatus = () => {
    switch (status) {
      case -1:
      case -2:
        return (
          <div>
            <div>
              <h1>Student: {name}</h1>
              <h1 className="text-red-500">Message: {msg.toUpperCase()}</h1>
              <h1>{checkinTime && convertTime(checkinTime)}</h1>
              <X
                size={200}
                color="red"
                className="mt-5 block ml-auto mr-auto"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div>
              <h1>Student: {name}</h1>
              <h1>Message: {msg.toUpperCase()}</h1>
              <Check
                size={200}
                color="green"
                className="mt-5 block ml-auto mr-auto"
              />
            </div>
          </div>
        );
      default:
        return <h1>Error. Some unexpected thing happen.</h1>;
    }
  };

  const convertTime = (dateStr) => {
    let date = new Date(Date.parse(dateStr));
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString();
  };

  const post = async () => {
    setLoading(true);
    await axios
      .post(
        "https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/checkin-by-qr-code",
        {
          id: qr_id,
        }
      )
      .then((res) => {
        const body = JSON.parse(res.data.body);
        setMsg(body.message);
        setStatus(body.status);
        setCheckinTime(body.checkin_time);
        setName(`${body.en_name}, ${body.cn_name}`);
      });
    setLoading(false);
  };

  useMount(() => {
    post();
  });

  return (
    <div className="m-2">
      <div className=" flex  flex-col px-10 py-20 rounded-lg space-y-2 text-center ">
        {loading ? <BeatLoader /> : <div>{renderStatus()}</div>}
      </div>
    </div>
  );
};

export default Verify;
