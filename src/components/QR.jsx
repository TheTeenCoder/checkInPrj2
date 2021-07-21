import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

import { useAtom } from "jotai";
import { submittedTimeAtom, checkinTimeAtom } from "../atoms/index";
import { Check, X } from "react-feather";
const QR = () => {
  const { student_id } = useParams();
  const [submittedTime] = useAtom(submittedTimeAtom);
  const [checkinTime, setCheckinTime] = useAtom(checkinTimeAtom);

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

  const displayTextAfterCheckin = () => {
    return (
      <div>
        <p>
          You're checked in at the front at{" "}
          <strong>{convertTime(checkinTime)}</strong>!
        </p>
        <div className="flex space-x-2">
          <p>Awesome! You're checked in!</p>
          <Check color="green" />
        </div>
      </div>
    );
  };

  const displayTextAfterSubmitted = () => {
    return (
      <div>
        <p>
          You already submitted your questionaire at{" "}
          <strong>{convertTime(submittedTime)}</strong>!
        </p>
        {!checkinTime && (
          <p className="text-xs">
            Instructions: Let the front desk scan your QR code to be checked in.
            (You can close the tab and can still sign back in)
          </p>
        )}
      </div>
    );
  };

  const displayQrCode = () => {
    return (
      <div>
        <QRCode
          className="block mr-auto ml-auto mt-10"
          value={`https://${window.location.hostname}/qr/${student_id}`}
        />
      </div>
    );
  };

  const applyLogic = () => {
    if (!submittedTime && !checkinTime) {
      return (
        <div className="flex flex-col items-left space-y-2">
          {displayQrCode()}=
        </div>
      );
    }
    if (submittedTime && !checkinTime) {
      return (
        <div className="flex flex-col items-left space-y-2">
          {displayTextAfterSubmitted()}
          {displayQrCode()}
        </div>
      );
    }
    if (submittedTime && checkinTime) {
      return (
        <div className="flex flex-col items-left space-y-2">
          {displayTextAfterSubmitted()}
          {displayTextAfterCheckin()}
        </div>
      );
    }
    return "";
  };

  return (
    <div>
      <div className="Center text-left flex flex-col items-center p-8">
        {applyLogic()}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="Center text-center flex flex-col items-center p-8">
  //       {!checkinTime ? (
  //         <div>
  //           <h1 className="text-xl">
  //             Take a screen shot of this QR code and let the front desk scan it
  //             for verification.
  //           </h1>
  //           <p className="text-xs">
  //             (If you exit out of this tab, your can still sign in and your QR
  //             code will still be there.)
  //           </p>
  //         </div>
  //       ) : (
  //         <div>
  //           <p>You're checked in!</p>
  //           <p>Check in time: <strong>{checkinTime}</strong></p>
  //         </div>
  //       )}
  //       {/* <p className="mt-5">
  //         Filled Questionair: {submittedTime ? <Check /> : <X />}
  //       </p> */}
  //       <div className="flex items-center p-2 mt-5 ">
  //         <p>Checked-in: </p>
  //         {checkinTime ? <Check color="green" /> : <X colors="red" />}
  //       </div>
  //       {!checkinTime && (
  //         <QRCode
  //           className="block mr-auto ml-auto mt-10"
  //           value={`https://${window.location.hostname}/qr/${student_id}`}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
};

export default QR;
