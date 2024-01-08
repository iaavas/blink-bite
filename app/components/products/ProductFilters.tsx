import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

function ProductFilters() {
  return (
    <div className="flex items-center justify-between gap-2 p-4 my-4 sm:flex-row flex-col">
      <div className="flex justify-normal items-center gap-2 sm:flex-row flex-col">
        <h3 className="text-xl font-semibold font-urban">Filter Products : </h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color</SelectLabel>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              <SelectItem value="s">S</SelectItem>
              <SelectItem value="m">M</SelectItem>
              <SelectItem value="l">L</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
              <SelectItem value="2xl">2XL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-normal items-center gap-2">
        <h3 className="text-xl font-semibold font-urban">Sort Products : </h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="asc">Price (asc)</SelectItem>
              <SelectItem value="desc">Price (desc)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ProductFilters;
