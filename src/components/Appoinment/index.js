import React from "react";
import "components/Appoinment/styles.scss";
import Header from "components/Appoinment/Header";
import Show from "components/Appoinment/Show";
import Empty from "components/Appoinment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appoinment/Form";
import Status from "components/Appoinment/Status";
import Confirm from "components/Appoinment/Confirm";
import Error from "components/Appoinment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appoinment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(DELETING, true);
    props.deleteInterview(props.id).then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

   return (

      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={edit}
          />
        )}
        {mode === CREATE && 
          <Form interviewers={props.interviewers} onCancel={back} onSave={save} bookInterview={props.bookInterview} deleteInterview={props.deleteInterview}/>
        }
        {mode === EDIT && 
          <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save} bookInterview={props.bookInterview}/>
        }
        {mode === SAVING && <Status message={'Saving'}/>}
        {mode === DELETING && <Status message={'Deleting'}/>}
        {mode === CONFIRM && <Confirm message={'Are you sure?'} onCancel={back} onConfirm={deleteAppointment}/>}
        {mode === ERROR_SAVE && <Error message={'Error saving!'} onBack={back}/>}
        {mode === ERROR_DELETE && <Error message={'Error deleting!'} onBack={back}/>}
      </article>

   );
 }