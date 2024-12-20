export const splitCamelCase = (str = "") => {
  return str?.replace(/([a-z])([A-Z0-9])/g, "$1 $2");
};

export const capitalizeFirstLetter = (str = "") => {
  const strArr = str.split(" ");
  if (strArr.length > 1) {
    return strArr.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const snakeToCamel = (str = "") => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const snakeToPascal = (str = "") => {
  const camelCase = snakeToCamel(str);
  const pascalCase = capitalizeFirstLetter(camelCase);
  return pascalCase;
};

export const snakeToSplittedLowerCase = (str = "") => {
  return splitCamelCase(snakeToCamel(str))?.toLowerCase();
};

export const formatToUSD = (val: number | string, fraction = 0, options: Intl.NumberFormatOptions = {}) => {
  let numberValue;
  try {
    numberValue = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fraction,

      ...options,
    }).format(numberValue);
  } catch (_e) {
    return val;
  }
};

export const revertFormattedUSD = (formattedValue: string): number => {
  // Remove the dollar sign and commas, then parse the number
  const cleanedValue = formattedValue.replace(/[$,]/g, "").trim();
  const numberValue = parseFloat(cleanedValue);

  // Handle cases where the conversion fails
  return isNaN(numberValue) ? 0 : numberValue;
};

export const formatToPercentage = (val: number | string, fraction = 2) => {
  let numberValue;
  try {
    numberValue = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    }).format(numberValue / 100);
  } catch (_e) {
    return val;
  }
};

export const pluralize = <C extends number, N extends string, P extends string = `${N}s`>(
  count: C,
  noun: N,
  plural?: P
): C extends 1 ? N : P => {
  return (count === 1 ? noun : plural || `${noun}s`) as C extends 1 ? N : P;
};

export const formatNumberWithCommas = (num: number) => {
  if (num === undefined || num === null) return "0";
  return new Intl.NumberFormat("en-US").format(num);
};

export const removeCommas = (num: string) => {
  return num.replace(/,/g, "");
};

export const checkForNumeric = (value: string): number => {
  const numericValue = parseInt(value.replace(/,/g, ""), 10);
  const isNumeric = !isNaN(numericValue);
  return isNumeric ? numericValue : 0;
};

export const checkPercentage = (value: string) => /^\d*\.?\d*$/.test(value) || value === "";

export const formatNumberToCommas = (value: number): string => {
  if (!value) return "0";
  return value.toLocaleString("en-US");
};

export const isNumber = (value: string): boolean => value === "" || /^\d*\.?\d*$/.test(value);

export const getOAuthErrorMessage = (err: string) => {
  if (!err) return;
  if (err.startsWith("PreSignUp failed with error")) {
    return err.replace("PreSignUp failed with error", "").trim();
  }
  return err;
};

export const constructUrl = (baseUrl: string, ...path: string[]) => {
  // if baseUrl has trailing shashes, remove it
  // if path has leading slashes, remove it

  const base = baseUrl.replace(/\/+$/, "");
  const paths = path.map((p) => p.replace(/^\/+/, ""));

  return `${base}/${paths.join("/")}`;
};

export const getRoundValueFromCommaNumber = (value: string) => {
  const num = value.replace(/,/g, "");
  return Math.round(parseFloat(num));
};

export const sanitizeDomain = (domain: string) => {
  if (!domain) return "";
  return domain.replace(/^(https?:\/\/)?(www\.)?/, "");
};

export const getDomainFromEmail = (email: string) => {
  if (!email) return "";
  return email.split("@")[1];
};
