import React from "react";

function Container({
  bgColor = "bg-slate-800",
  justify = "",
  children,
}: {
  bgColor?: string;
  justify?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col ${bgColor} ${justify} h-screen items-center`}
    >
      {children}
    </div>
  );
}

export default Container;
