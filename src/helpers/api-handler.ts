import { AxiosError } from "axios";

export function apiHandler(callback: (...args: any) => Promise<any>) {
  return async (...args: any) => {
    try {
      return callback(...args);
    } catch (e) {
      console.error(e);
      let statusCode = 500;
      let error = e;
      if (e instanceof AxiosError) {
        statusCode = e.response?.status || 500;
        error = e.response?.data || e.message || e;
      }

      return new Response(JSON.stringify({ error }), {
        status: statusCode,
      });
    }
  };
}
