import React from 'react'
import Class from './Class'

const ClassList = (props) => {

    return (
        <div className="m-2">
            <h1 className="text-2xl font-bold">Classes:</h1>
            {
                props.classes != null ? 
                    props.classes.map((element, index) => {
                         return <Class
                                key={index}
                                teacher_en_name={element.en_name}
                                teacher_cn_name={element.cn_name}
                                class_title={element.title}
                                room_no={element.room_no}
                                session={element.session}
                                />
                    })
                : null
            }
        </div>
    )
}

export default ClassList;