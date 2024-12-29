import { Any } from "@/types";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, getUserFromLS } from "./storage/localStorage";

axios.defaults.baseURL = "http://localhost:4000";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  type: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  apiRoute: string,
  data: Record<string, Any> = {}
) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}${apiRoute}`;
  const token = getItem("token");

  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const options: AxiosRequestConfig = {
    method: type.toUpperCase(),
    url,
    headers,
  };

  if (["POST", "PUT", "PATCH"].includes(type)) {
    options.data = data;
  } else {
    options.params = data;
  }

  try {
    const response: AxiosResponse<T> = await axios(options);

    if (response.data) {
      console.log(response);
      return response.data;
    }
  } catch (err: Error | unknown | AxiosError) {
    console.error("Request failed:", err);
  }
}

const requestHandler = async <R>(
  method: Method,
  url: string,
  data?: unknown,
  options: AxiosRequestConfig = {},
  defaultResponse = false
): Promise<{
  success: boolean;
  status: number;
  payload: R;
  error?: Error;
  message?: string;
}> => {
  debugger;
  let response;
  const headers = {};
  const requestObj = { method, url, headers, ...options };
  const token = getItem("token");
  const user = getUserFromLS();
  if (user && user.id && token) {
    requestObj.headers = {
      ...requestObj.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (data) requestObj.data = data;
  try {
    const res = await axios(requestObj);
    if (res.data && res.data.authError) {
      if (token) window.location.reload();
    }
    if (defaultResponse)
      response = {
        ...res,
        success:
          res.data instanceof ArrayBuffer
            ? res.headers["x-success-status"] === "true"
            : res.data.success,
      };
    else {
      response = {
        ...res.data,
        status: res.status,
        headers: res.headers,
        error: null,
      };
    }
  } catch (error: Any) {
    if (error?.response) {
      response = {
        ...error.response.data,
        status: error.response.status,
        headers: error.response.headers,
        error: "Server responded with an error",
        success: false,
      };
    } else if (error.request) {
      response = {
        ...error.request,
        error: "Request Timeout",
        success: false,
      };
    } else {
      response = {
        errMsg: error.message,
        error: "Client Error: Bad Request",
        success: false,
      };
    }
    if (response.payload && response.payload.authError) {
      window.location.reload();
    }
  }
  return response;
};

export { request, requestHandler };
