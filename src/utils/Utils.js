const Utils = {
  /**
   * needed to work with nested object that should be immutable (state/props)
   * @param {*} object
   * @returns deep copy of object
   */
  copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  },
};

export default Utils;

/**
 * @param {Number} value the number you want to display
 * @param {Integer} digits how many after the decimal point?
 * @param {String} currency for example €, $, %, etc.
 * @param {Boolean} colorize true = use green, black, red. false = use black
 */
export const DivNumber = (
  value,
  digits = 0,
  currency = "",
  colorize = false,
  parentheses = false,
  color
) => {
  var colorClass =
    "number" +
    (colorize ? (value > 0 ? "-positive" : value < 0 ? "-negative" : "") : "");
  digits = digits == "auto" ? (value > 1000 ? 0 : 2) : digits;
  return (
    <div className={colorClass}>
      {parentheses ? "(" : ""}
      {colorize ? (value > 0 ? "+" : "") : ""}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })}
      {currency}
      {parentheses ? ")" : ""}
    </div>
  );
};
