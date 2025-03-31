export const FormatPrice = ({ amount }) => {
    return Intl.NumberFormat("en-IN", {
        // style: "currency",
        currency: "INR",
        maximumFractionDigits:2,
    }).format(amount);
};