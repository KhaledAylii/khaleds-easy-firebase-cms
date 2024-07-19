import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const ListCard: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
  return (
    <div {...props} className={`${props.className} p-4 rounded-lg bg-white/5`}>
      {children}
    </div>
  );
};
