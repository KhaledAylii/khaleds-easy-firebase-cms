import { FC, InputHTMLAttributes, PropsWithChildren } from "react";

export const Input: FC<
  PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>
> = ({ children, className, ...props }) => {
  return (
    <input
      {...props}
      className={`${className} text-lg py-2 px-2 rounded-lg text-gray-700`}
    >
      {children}
    </input>
  );
};
