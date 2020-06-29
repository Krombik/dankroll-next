import axios from "axios";

const fetcher = {
  async get<T>(url: string, token?: string): Promise<T> {
    try {
      return (
        await axios.get<T>(
          url,
          token
            ? {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            : {}
        )
      ).data;
    } catch (error) {
      return error.response.data;
    }
  },
  async delete<T>(url: string, token?: string): Promise<T> {
    try {
      return (
        await axios.delete<T>(
          url,
          token
            ? {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            : {}
        )
      ).data;
    } catch (error) {
      return error.response.data;
    }
  },
  async post<T>(url: string, data: any, token?: string): Promise<T> {
    try {
      const config =
        !!data || !!token
          ? {
              headers: {
                ...(data ? { "Content-Type": "application/json" } : {}),
                ...(token ? { Authorization: `Token ${token}` } : {}),
              },
            }
          : {};
      return (
        await axios.post<T>(url, data ? JSON.stringify(data) : {}, config)
      ).data;
    } catch (error) {
      return error.response.data;
    }
  },
  async put<T>(url: string, data: any, token?: string): Promise<T> {
    try {
      const config =
        !!data || !!token
          ? {
              headers: {
                ...(data ? { "Content-Type": "application/json" } : {}),
                ...(token ? { Authorization: `Token ${token}` } : {}),
              },
            }
          : {};
      return (await axios.put<T>(url, data ? JSON.stringify(data) : {}, config))
        .data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default fetcher;
