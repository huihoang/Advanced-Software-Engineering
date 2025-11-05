export const formatCurrency = (value?: number) => {
  if (value == null) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);
};
