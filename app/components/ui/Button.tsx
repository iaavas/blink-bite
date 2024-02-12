import Link from "next/link";
import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  handleClick?: (event: MouseEvent) => void;
  type: "primary" | "secondary" | "third" | "auth" | "fourth";
  css?: string;
  to?: string;
  children: ReactNode;
}

function Button({ handleClick, type, css = "", to, children }: ButtonProps) {
  const base = ``;

  const styles = {
    primary:
      base +
      " p-2 max-w-1 my-6 uppercase max-w-sm text-center  rounded-md text-green-600" +
      css,
    secondary: base + "" + css,
    third:
      base +
      "absolute bottom-60 left-0 right-0 mb-2  text-center p-1 uppercase mx-auto bg-white max-w-[100px]" +
      css,
    fourth: "text-center bg-black font-urban p-2 uppercase text-white",

    auth: base + "" + css,
  };

  if (to) {
    return (
      <Link href={to} onClick={handleClick} className={`${styles[type]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={`${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
