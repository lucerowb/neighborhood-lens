import axios, { AxiosInstance } from "axios";

class DataRepo {
  private client: AxiosInstance;

  constructor() {
    this.client = this.createClient();
  }

  private createClient() {
    return axios.create({
      baseURL: process.env.DATA_REPO_URL,
      timeout: 10000,
      headers: {
        Authorization: `Token ${process.env.DATA_REPO_TOKEN}`,
        "Accept-Encoding": "gzip",
      },
    });
  }

  async getPropertiesById(propertyIds: string[]) {
    const { data } = await this.client.get("/api/properties/v2/by_ids/", {
      params: {
        property_ids: propertyIds?.join(",") || "",
      },
    });

    return data;
  }
}

export const dr_hook = new DataRepo();
