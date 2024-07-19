import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const Button: FC<
  PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`${className} w-fit p-2 border-2 rounded-lg`}>
      {children}
    </button>
  );
};
