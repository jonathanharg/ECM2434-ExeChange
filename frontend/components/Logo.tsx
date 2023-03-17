import React, { Ref } from "react";

function Logo({ ...props }, logoRef: Ref<typeof Logo>) {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "#166534",
        viewBox: "0 0 192 192",
        strokeWidth: 1,
        stroke: "currentColor",
        "aria-hidden": "true",
        ref: logoRef
      },
      props
    ),
    React.createElement("path", {
      d: "M66.41,96.19L12.61,9.26h53.16l31.18,58.49h0.97l30.7-58.49H180l-54.13,85.64l53.64,87.58h-51.22l-32.96-59.95h-0.97l-32.48,59.95H12.12L66.41,96.19z",
    })
  );
}

const ForwardRef = React.forwardRef(Logo);
export default ForwardRef;
