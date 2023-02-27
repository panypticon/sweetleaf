const useCartData = data => {
    const totalPrice = Object.values(data)
        .reduce(
            (acc, item) =>
                acc + item.amount * (item.item.inventory.find(size => size.size === item.packageSize)?.price || 0),
            0
        )
        .toFixed(2);

    const isEmpty = Object.keys(data).length === 0;

    const cartItems = Object.entries(data);

    return { totalPrice, isEmpty, cartItems };
};

export default useCartData;
