import React, {FC, RefAttributes} from "react";
import dynamic from "next/dynamic";
import {SplineProps} from "@splinetool/react-spline";
const Spline: React.ComponentType<SplineProps & RefAttributes<HTMLCanvasElement>> = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});
const SplineObj: (props: { scene: string }) => JSX.Element = (props: { scene: string; }) => {
    return (
      <>
          {/* @ts-ignore */}
          <Spline className="absolute top-0 right-0 z-1" scene={props.scene} />
      </>
  );
};

Spline.propTypes = {};

export default SplineObj;
