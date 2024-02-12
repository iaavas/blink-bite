import Image from "next/image";
import Button from "../ui/Button";
import { useEffect, useRef } from "react";

function HeroContent({
  color,
  title,
  subtitle,
  image,
  css,
}: {
  color: string;
  title: string;
  subtitle: string;
  image: string;
  css?: string;
}) {
  const gradStyles = {
    red: `bg-gradient-to-r from-red-600 to-red-700 text-white`,
    yellow: `bg-gradient-to-r from-yellow-400 to-yellow-500 text-black`,
    blue: `bg-gradient-to-r from-blue-600 to-blue-700 text-white`,
    green: `bg-gradient-to-r from-green-600 to-green-700 text-white`,
  };
  const fontStyles: any = {
    red: `text-red-600 bg-white`,
    yellow: `text-white bg-stone-900  `,
    blue: `text-blue-600 bg-white`,
    green: `text-green-600 bg-white `,
  };

  return (
    <div
      // @ts-ignore
      className={`  flex shadow-lg   rounded-2xl my-8  items-center  mx-2 ${gradStyles[color]} ${css}`}
    >
      <div className="flex flex-col-reverse sm:flex-row-reverse justify-between w-full mx-4">
        <Image
          src={image}
          alt={image.toString()}
          width={300}
          height={300}
          className="mt-2"
        />
        <div className="flex flex-col gap-4 justify-center sm:ml-10 ml-4 mt-4 p-4 sm:p-0">
          <h1 className="font-urban uppercase text-4xl font-semibold drop-shadow-lg">
            {title}
          </h1>
          <span className="font-urban uppercase text-xl  tracking-wider drop-shadow-lg">
            {subtitle}
          </span>

          <Button
            to={`/categories/`}
            type="primary"
            css={`
               drop-shadow-lg  font-semibold w-32 h-10 ${fontStyles[color]}
            `}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
