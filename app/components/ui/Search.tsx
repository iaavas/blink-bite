import { useState, ChangeEvent, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const Search: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        router.push(`/s?q=${encodeURIComponent(query.trim())}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router]);

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <div className="flex items-center justify-center  mr-32 w-full relative">
      <input
        type="text"
        placeholder='Search "chips"'
        value={query}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg bg-[#f8f8f8]  placeholder:text-stone-400 text-center"
      />
      <div className="absolute left-3">
        <CiSearch size={25} />
      </div>

      {query && query.length > 0 && (
        <button className="absolute right-3" onClick={clearQuery}>
          <RxCross1 size={15} />
        </button>
      )}
    </div>
  );
};

export default Search;
