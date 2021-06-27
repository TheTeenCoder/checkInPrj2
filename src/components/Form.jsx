import React from 'react'

const Form = () => {
    return (
        <div>
            <form onSubmit={null}>
                <div className=" flex  flex-col  content-around border-2 border-gray-300 px-10 py-20 rounded-lg space-y-2 text-center">
                    <label className="text-xl">Sign in.</label>
                    <input className="rounded-xl border-2 border-gray-300 p-2 " placeholder="first name..."/>
                    <input className="rounded-xl border-2 border-gray-300 p-2" placeholder="last name..."/>
                    <button className="rounded-md p-2 bg-blue-300 border-2 border-black  ">Submit.</button>
                </div>
            </form>
        </div>
    )
}
 
export default Form;