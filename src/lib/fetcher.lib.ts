import qs from "qs";

import env from "@/config/env.config";

function getServerURL(path = "") {
  const baseUrl = new URL(env.appUrl!)?.origin;
  return `${baseUrl}${path}`;
}

export async function fetcher<ResponseType>(path: string, urlParamsObject = {}, options: RequestInit = {}) {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
      strictNullHandling: true, // Handle null values correctly
      encode: false,
    });
    const requestUrl = `${getServerURL(`${path}${queryString ? `?${queryString}` : ""}`)}`;
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data as ResponseType;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
