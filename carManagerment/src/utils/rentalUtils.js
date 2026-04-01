export const calculateRentalDays = (start, end) => {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return diff > 0 ? diff : 0;
};

export const calculateTotalCost = (pricePerDay, days) => {
  return pricePerDay * days;
};