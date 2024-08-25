import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

function GoalProgress(props) {
  return (
    <div>
      <Card.Title>
        <div className="size-title emoji-big">
          <div className="emoji">&#x1F3AF;</div>:{" "}
          <span className="card-title">
            {props.totalMoney.toLocaleString()}€ / {props.goal.toLocaleString()}
            €
          </span>
        </div>
      </Card.Title>
      <ProgressBar
        variant="danger"
        striped="true"
        className="m-3"
        max={props.goal}
        now={props.totalMoney}
        label={`${((props.totalMoney / props.goal) * 100).toFixed(2)}%`}
      ></ProgressBar>
    </div>
  );
}

export default GoalProgress;
