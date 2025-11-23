import type { Category } from "../types";
import fetcher from "./fetcher";

export const categoriesApi = {
    getAll: () => fetcher<Category[]>("categories")
}