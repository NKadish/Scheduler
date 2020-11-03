import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

const formatSpots = (spots) => {
  if (spots === 0) {
    return 'no spots remaining';
  } else if (spots === 1) {
    return `${spots} spot remaining`;
  } else {
    return `${spots} spots remaining`;
  }
  // return spots ? `${spots} spots remaining` : 'No spots remaining';
}

export default function DayListItem(props) {

  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayListItemClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}