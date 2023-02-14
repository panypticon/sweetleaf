export interface User {
    address: {
        city: String;
        country: String;
        firstName: String;
        lastName: String;
        street: String;
        zip: String;
    };
    email: String;
    id: String;
}

export interface DetailedError extends Error {
    details: object;
}

export interface AppStateState {
    mobileNavOpen: boolean;
    searchTerm: string;
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
