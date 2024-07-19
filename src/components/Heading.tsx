import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const Heading: FC<
  PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
> = ({ children, className, ...props }) => {
  return (
    <span {...props} className={`${className} text-7xl`}>
      {children}
    </span>
  );
};
