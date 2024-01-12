"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useFilter } from "@/app/context/FilterContext";

function ProductFilters() {
  const { searchQuery, setSearchQuery, setClicked, sortBy, setSortBy } =
    useFilter();

  function handleSearchClick() {
    if (searchQuery.length < 1) return;
    setSearchQuery(searchQuery);
    setClicked(true);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  return (
    <div className="flex items-center  justify-between mx-10 my-4 ">
      <select
        className="border border-gray-400  bg-white rounded-full p-2"
        onChange={handleSortChange}
        value={sortBy}
      >
        <option value="asc">Sort by Price (Asc)</option>
        <option value="desc">Sort by Price (Desc)</option>
      </select>

      <div className="flex items-center gap-4  ">
        <input
          type="text"
          className="border border-gray-400  items-center rounded-lg p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Here"
        />

        <button
          className="bg-stone-800 text-white p-2 rounded-full"
          onClick={handleSearchClick}
        >
          <IoIosSearch size={25} />
        </button>
      </div>

      <select className="border border-gray-400  bg-white rounded-full p-2">
        <option value="">All Colors</option>

        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
}

export default ProductFilters;
