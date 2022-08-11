import React, { Suspense } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});
const SplineObj = (props) => {
  return (
      <Spline className="absolute top-0 right-0 z-1" scene={props.scene} />
  );
};

Spline.propTypes = {};

export default SplineObj;
