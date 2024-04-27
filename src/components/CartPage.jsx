import InCartItems from "./InCartItems";

const CartPage = ({ cartItems, removeItem, updateQuantity }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkout = () => {
    alert("This is just a fake store, you can't actually buy these things!");
  };

  return (
    <>
      <div className="h-24 ">
        <h2 className="font-bold text-2xl text-black mt-2">Your Cart</h2>
        <InCartItems
          cartItems={cartItems}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
        />
        <div>
          <p className="font-semibold text-black text-xl mt-4">
            Total Price: {totalPrice}$
          </p>
          <button
            className="fle border-none select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-cyan-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
