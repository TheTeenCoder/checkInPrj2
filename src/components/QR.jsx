import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

const QR = () => {
  const { student_id } = useParams();

  return (
    <div>
      <div className="Center text-center flex flex-col items-center p-8">
        <h1 className="text-xl">
          Take a screen shot of this QR code and let the front desk scan it for
          verification.
        </h1>
        <p className="text-xs">
          (If you exit out of this tab, your can still sign in and your QR code
          will still be there.)
        </p>
        <QRCode
          className="block mr-auto ml-auto mt-10"
          value={`https://${window.location.hostname}/qr/${student_id}`}
        />
        
      </div>
    </div>
  );
};

export default QR;
