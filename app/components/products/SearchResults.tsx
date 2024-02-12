"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../homepage/ProductCard";
import { URL } from "@/constants/constant";

import { useFilter } from "@/app/context/FilterContext";
import Loading from "../ui/Loading";
import { useSearch } from "@/app/context/ProductsContext";
import NoResult from "../ui/NoResult";

function SearchResults({ limit = null }) {
  const { searchResults } = useSearch();
  console.log("ram");

  return (
    <div className="">
      <div className="flex overflow-x-auto gap-1">
        {searchResults.length > 0 ? (
          searchResults.map((product) => "<h1>sad</h1>")
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
