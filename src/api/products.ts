import type { Product } from "../types";
import fetcher from "./fetcher";
import useMutation from "../hooks/useMutation";

type Filter = {
    field: string,
    value: string | number
}

type Filters = Filter[]

export type FormCreateProduct = {
    name: string,
    price: number,
    oldPrice: number,
    discount: number,
    isNew: boolean,
    category: string,
    brand: string,
    likes: number,
    orders: number,
    sizes: Array<number>,
}

// const FormCreateProductZOD = z.object({ 
//   username: 
//   xp: 
//   name: z.string(),,
//     price: z.number(),
//     oldPrice: z.number(),
//     discount: z.number(),
//     isNew: boolean,
//     category: string,
//     brand: string,
//     likes: z.number(),
//     orders: z.number(),
//     sizes: Array<number>,
// });

function getAll(filters: Filters = []) {
    return fetcher<Product[]>("products", filters)
}

export const productsApi = {
    getAll,
    createProduct
}

function createProduct(url: string) {
    return useMutation<FormCreateProduct, Product>({
       queryFunction: async (productForm: FormCreateProduct) => {
        
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }
  });
}