import React from 'react'
import QRCode from 'qrcode.react'
import {useParams} from 'react-router-dom'

const QR = (props) => {

    const { student_id } = useParams();

    return (
        <div>
            <div className="mt-10"><h1 className="text-center">Take a screen shot of this QR code and let the front desk scan it for verification.</h1><QRCode className="block mr-auto ml-auto mt-10" value={`${window.location.hostname}/qr/${student_id}`}/></div>
        </div>
    )
}

export default QR;
