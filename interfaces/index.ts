export interface OrderState {
    client: {},
    products: [],
    total: 0
}

export interface Client {
    name: string;
    lastname: string;
    email: string;
    company: string;
    id: string;
    phone?: string;
}
export interface Product {
    name: string;
    price: number;
    id: string;
    existence: number;
    qty? :number
    __typename?: string

}

export interface Products {
    products: Product[];
}

export type OrderType = {
    id: string;
    client:{
        id: string,
        name: string,
        lastname: string,
        company: string,
        email: string,
        phone: string
    };
      order:[
        id: string,
        qty :number,
        name :string,
        price :number
      ];
      total: number
      seller : string
      createdAt : string
      status: string
      __typename?: string
}
