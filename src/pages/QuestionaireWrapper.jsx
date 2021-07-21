import { useAtom } from 'jotai'
import React from 'react'
import { checkinTimeAtom, submittedTimeAtom } from '../atoms'
import Questionaire from '../components/Questionaire'

const QuestionaireWrapper = (props) => {

  const submittedTimeHook = useAtom(submittedTimeAtom)
  const checkinTimeHook = useAtom(checkinTimeAtom)

  return (
    <div>
      <Questionaire student_id={props.student_id} submittedTimeHook={submittedTimeHook} checkinTimeHook={checkinTimeHook} />
    </div>
  )
}


export default QuestionaireWrapper;