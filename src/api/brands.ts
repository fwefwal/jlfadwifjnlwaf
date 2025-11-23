import type { Brand } from "../types";
import fetcher from "./fetcher";

export const brandsApi = {
    getAll: () => fetcher<Brand[]>("brands")
}