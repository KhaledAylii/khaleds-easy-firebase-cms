import { FC, InputHTMLAttributes, PropsWithChildren } from "react";

export const Select: FC<
  PropsWithChildren<InputHTMLAttributes<HTMLSelectElement>>
> = ({ children, className, ...props }) => {
  return (
    <select
      {...props}
      className={`${className} text-lg py-2 px-2 rounded-lg text-gray-700`}
    >
      {children}
    </select>
  );
};
