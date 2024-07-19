import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const Button: FC<
  PropsWithChildren<HTMLAttributes<HTMLButtonElement> & { variant?: "danger" }>
> = ({ children, className, variant, ...props }) => {
  const variantStyles = (() => {
    if (variant === "danger") {
      return "bg-red-500/20";
    }
  })();
  return (
    <button
      {...props}
      className={`${className} w-fit p-2 px-3 rounded-lg rounded-lg bg-cyan-400/20 ${variantStyles}`}
    >
      {children}
    </button>
  );
};
