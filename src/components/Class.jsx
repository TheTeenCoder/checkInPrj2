
import React from "react";

const Class = (props) => {
    return (
        <div>
            <div className="rounded-md border-2 p-5 border-gray-300 mt-10">
                <h1 className="text-lg md:text-xl">{props.class_title}</h1>
                <div className="text-sm md:text-lg">
                    <p>Teacher: {props.teacher_en_name}, {props.teacher_cn_name}</p>
                    <p>Room: {props.room_no}</p>
                    <p>Session: {props.session}</p>
                </div>
            </div>
        </div>
    )
}

export default Class;
