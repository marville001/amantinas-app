const priceFormatter = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });

    return formatter.format(price).replace("$", "$ ");
};

export default priceFormatter;
