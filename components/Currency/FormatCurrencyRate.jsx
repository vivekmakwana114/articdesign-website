const FormatCurrencyRate = ({ num }) => {
  // If num is not provided or is not a valid number, default it to zero
  if (!num || isNaN(num)) {
    num = 0;
  } else {
    num = Number(num);
  }

  return "INR " + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export default FormatCurrencyRate;
