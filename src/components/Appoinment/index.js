import React from "react";
import "components/Appoinment/styles.scss";
import Header from "components/Appoinment/Header";
import Show from "components/Appoinment/Show";
import Empty from "components/Appoinment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appoinment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appoinment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

   return (

      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && 
          <Form interviewers={props.interviewers} onCancel={back}/>
        }
      </article>

   );
 }