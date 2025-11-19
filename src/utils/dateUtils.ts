export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isNearExpiry = (expiryDate: string): boolean => {
  const daysLeft = getDaysUntilExpiry(expiryDate);
  return daysLeft <= 90 && daysLeft >= 0;
};

export const isExpired = (expiryDate: string): boolean => {
  return getDaysUntilExpiry(expiryDate) < 0;
};
