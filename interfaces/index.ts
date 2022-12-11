
export interface ClientType {
    name: string;
    lastname: string;
    email: string;
    company: string;
    id: string;
    phone?: string;
}

export interface OrderState {
    client:  ClientType,
    products: Product[],
    total: 0
} 
export interface Product {
    name: string;
    price: number;
    id: string;
    existence: number;
    qty? :number
    __typename?: string

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
