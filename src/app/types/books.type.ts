export interface IBook {
    name: string;
    author: string;
    price: number;
    rating: number;
    available: boolean;
    publishedDate: string;
}

export interface IFilter {
    name?: string;
    from?: Date;
    to?: Date;
    priceFrom?: number;
    priceTo?: number;
    rating?: number;
    available?: boolean;
    ratingBase?: string;
}

// Interface for whole app state after login.
export interface IAppState {
    filters: IFilter;
    books: IBook[];
}

// RatingBase enum/
export enum RatingBase {
    equal = '=',
    leq = '<=',
    geq = '>=',
    less = '<',
    greater = '>',
}
