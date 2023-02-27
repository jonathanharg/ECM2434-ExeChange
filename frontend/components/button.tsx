import clsx from "clsx";
import React, { FC, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  const buttonClassName = clsx(
    "h-8 flex justify-center items-center hover:bg-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );
  return(
    <button className={buttonClassName} {...props}>
        {children}
    </button>
  );
};

