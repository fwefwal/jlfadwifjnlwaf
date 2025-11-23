export type Category = {
    id: number,
    category_name: string
}

export type Brand = {
    id: number,
    brand_name: string
}

export type Product = {
    id: number,
    name: string,
    current_price: number,
    raw_price: number,
    discount: number,
    likes_count: number,
    is_new: boolean,
    orders_count: number,
    sizes: number[],
    category_id: number,
    brand_id: number
}

export type Order = {
    id: number,
    firstName: string,
    lastName: string,
    delivery: "pickup" | "courier",
    productId: number,
    createdAt: number
}

export type CreateOrder = Omit<Order, 'id' | 'createdAt'>


export type CreateProduct = {
    name: '',
    price: 0,
    oldPrice: 0,
    discount: 0,
    isNew: true,
    category: 'sneakers',
    brand: 'nike',
    likes: 0,
    orders: 0,
    sizes: [35, 36, 37],
}
