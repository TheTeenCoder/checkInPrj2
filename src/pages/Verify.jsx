import React, { useState } from "react";
import { useMount } from "react-use";
import axios from "axios";
import { Check } from "react-feather";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Verify = () => {
  const { qr_id } = useParams();
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const renderStatus = () => {
    switch (status) {
      case -1:
      case -2:
        return (
          <div>
            <h1 className="text-red-500">{msg}</h1>
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
        return <h1>Error.</h1>;
    }
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
        console.log(body);
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
