import * as React from "react";

function Iconup(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 20 20"
      transform={`rotate(${props.rotation})`}
      {...props}
    >
      <path d="M0 15a.5.5 0 00.853.354l8.646-8.646 8.646 8.646a.5.5 0 00.707-.707l-9-9a.5.5 0 00-.707 0l-9 9a.498.498 0 00-.146.354z" />
    </svg>
  );
}

export default Iconup;
