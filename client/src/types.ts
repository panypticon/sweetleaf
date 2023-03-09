import type { ReactElement, Dispatch, SetStateAction } from 'react';

export interface Address {
    city: String;
    country: String;
    firstName: String;
    lastName: String;
    street: String;
    zip: String;
}

export interface User {
    address: Address;
    email: String;
    id: String;
    googleID?: String;
    preferences?: { [x: string]: any };
}

export interface DetailedError extends Error {
    details: object;
}

export interface AppStateState {
    mobileNavOpen: boolean;
    mobileSearchOpen: boolean;
    searchTerm: string;
    cart: {
        [x: string]: CartItem;
    };
}

export interface PackageSize {
    size: string;
    price: number;
    amount: number;
}

export interface Product {
    id: string;
    name: string;
    type: string;
    category: string;
    description: string;
    attributes: {
        origin?: string;
        taste: string[];
        flavored: boolean;
    };
    inventory: PackageSize[];
    image?: string;
    new: boolean;
    recentPurchases: number;
    ratings: {
        count: number;
        average: number;
    };
}

export interface CartItem {
    item: Product;
    amount: number;
    packageSize: string;
    price: number;
    id?: string;
}

export interface Rating {
    rating: number;
    comment: string | null;
    user: User;
    product: object;
    createdAt: Date;
    id: string;
}

export interface LaxProps {
    [x: string]: any;
}

export interface OrderItem {
    amount: number;
    size: string;
    product: { _id: string; name: string };
    price: number;
}

export interface Order {
    id: string;
    items: [OrderItem];
    shippingAddress: Address;
    user: User;
    createdAt: Date;
    totalPrice: number;
}

export interface ModalContext {
    modal: ReactElement | null;
    setModal: Dispatch<SetStateAction<any>>;
}
