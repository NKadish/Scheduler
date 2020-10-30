import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  function cancel() {
    props.onCancel();
  }

  function confirm() {
    props.onConfirm();
  }

  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button danger onClick={confirm}>Confirm</Button>
      </section>
    </main>
  )
}