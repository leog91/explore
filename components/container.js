import React from "react";

function Container({ bgColor = "bg-slate-800", justify = "", children }) {
  return (
    <div
      className={`flex flex-col ${bgColor} ${justify} h-screen items-center`}
    >
      {children}
    </div>
  );
}

export default Container;
