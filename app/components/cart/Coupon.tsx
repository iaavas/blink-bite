import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
const Coupon = () => {
  const { state } = useCart();
  const { token } = useAuth();
  const router = useRouter();
  const total = state.items.reduce(
    (acc, cur) => acc + (cur.price - cur.discount) * cur.quantity,
    0
  );

  function handleLogin(){ 
    router.push("/login");
  }
  return (
    <div className="border border-green-400 border-dashed rounded-lg p-1.5 px-4  bg-green-600 text-white flex items-center justify-between  ">
      {token ? (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-md font-semibold">Rs. {total}</span>
            <span className="text-md font-normal">TOTAL</span>
          </div>
          <span className="text-lg ">Buy &rarr;</span>
        </>
      ) : (
        <button className="text-md font-normal p-2 flex items-center justify-center mx-auto " onClick={handleLogin}>
          LOGIN TO PURCHASE
        </button>
      )}
    </div>
  );
};

export default Coupon;
