const InCartItems = ({ cartItems, updateQuantity, removeItem }) => {
  const increaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id); // Remove item from cart if quantity reaches 0
    }
  };

  return (
    <div className="grid gap-5 grid-cols-2 grid-rows-2 ml-2 mr-2">
      {cartItems.map((item, index) => (
        <div key={index} className="border p-4 h-64 ">
          <h3 className="text-xl text-black font-semibold truncate">
            {item.title}
          </h3>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">{item.price * item.quantity}$</p>
          <div className="flex justify-between mt-2">
            <button
              className="text-black"
              onClick={() => decreaseQuantity(item)}
            >
              -
            </button>
            <button
              className="text-black"
              onClick={() => increaseQuantity(item)}
            >
              +
            </button>
          </div>
          <img
            src={item.image}
            alt={item.title}
            className="mt-2 h-24 w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default InCartItems;
