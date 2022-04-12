
export interface IBook {
    name: string;
    author: string;
    price: number;
    rating: number;
    available: boolean;
    publishedDate: string;
}

export interface IBookList {
    books: IBook[];
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

export interface IAppState {
    filters: IFilter;
    books: IBook[];
}

export enum RatingBase {
    equal = '=',
    leq = '<=',
    geq = '>=',
    less = '<',
    greater = '>',
}