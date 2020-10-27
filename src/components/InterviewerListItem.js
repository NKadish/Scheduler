import React from "react";
import "components/InterviewerListItem.scss";

const classnames = require('classnames');

export default function InterviewerListItem(props) {

  const InterviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const InterviewerListItemImageClass = classnames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  });

   return (
    <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
    <img
      className={InterviewerListItemImageClass}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
   );
 }

