import { baseUrl } from "./config";

type Resource = "categories" | "products" | "brands" | "orders"

type Filter = {
    field: string,
    value: string | number
}

type Filters = Filter[]


export default function fetcher<R>(resource: Resource, filters: Filters = [], options: RequestInit = {}) {
    return new Promise<R>((resolve, reject) => {
        const url = new URL(baseUrl + '/' + resource)

        for (const filter of filters) {
            url.searchParams.append(filter.field, String(filter.value))
        }

        return fetch(url.toString(), options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error with status" + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}