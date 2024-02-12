"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { URL } from "@/constants/constant";
import Link from "next/link";

function CatNav({ nav }: { nav: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}categories`);
        const data = await response.json();

        setIsLoading(false);
        setCategories(data.categories);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col border-r">
      <h4 className="mb-8 text-3xl  font-bold leading-none text-center mt-8 ">
        Categories
      </h4>
      <ScrollArea className="h-[450px] w-[350px]  border-r ">
        <div className="p-0 flex flex-col gap-2">
          {categories.map((ct) => (
            <React.Fragment key={ct}>
              <Link
                className={`text-md p-4 ${
                  nav === encodeURI(ct) && "bg-green-300/20 w-full "
                }`}
                href={`/categories/${ct}`}
              >
                {ct}
              </Link>
              {/* <Separator className="my-8" /> */}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CatNav;
