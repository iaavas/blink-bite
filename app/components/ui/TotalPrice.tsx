import { useCart } from "@/app/context/CartContext";

function TotalPrice() {
  const { state } = useCart();

  const totalPrice = state.items.reduce(
    (acc, cur) => acc + (cur.price - cur.discount) * cur.quantity,
    0
  );
  return totalPrice;
}

export default TotalPrice;
