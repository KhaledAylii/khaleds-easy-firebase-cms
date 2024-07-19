import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const Text: FC<
  PropsWithChildren<HTMLAttributes<HTMLSpanElement> & { variant?: "error" }>
> = ({ children, className, variant, ...props }) => {
  const variantStyles = (() => {
    if (variant === "error") {
      return "text-red-500";
    }
  })();
  return (
    <span {...props} className={`${className} text-lg ${variantStyles}`}>
      {children}
    </span>
  );
};
