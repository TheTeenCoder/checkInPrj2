import React, {useState} from 'react'
import {useMount} from 'react-use'
import axios from 'axios'
import {Check} from 'react-feather'
import {useParams} from 'react-router-dom'

const Verify = () => {

    const { qr_id } = useParams();
    const [status, setStatus] = useState('');

    const post = () => {
        axios.post("https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/checkin-by-qr-code",
        {
            id: qr_id
        })
        .then(res => {
            const body = JSON.parse(res.data.body);
            setStatus(body.message)
        })
    }

    useMount(() => {
        post();
    })

    return (
        <div className="m-2">
            <div className=" flex  flex-col px-10 py-20 rounded-lg space-y-2 text-center ">
                    {
                        status ?
                        <div>
                            {status}
                            <Check size={200} color="green" className="mt-5 block ml-auto mr-auto"/>
                        </div>
                        :
                        <h1 className="text-red-500">*The id you entered does not work. You have been reported to the server as a potential threat.</h1>
                    }
            </div>
        </div>
    )
}

export default Verify;