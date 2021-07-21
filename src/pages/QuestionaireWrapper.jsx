import { useAtom } from 'jotai'
import React from 'react'
import { submittedTimeAtom } from '../atoms'
import Questionaire from '../components/Questionaire'

const QuestionaireWrapper = (props) => {

  const hook = useAtom(submittedTimeAtom)

  return (
    <div>
      <Questionaire student_id={props.student_id} hook={hook} />
    </div>
  )
}


export default QuestionaireWrapper;