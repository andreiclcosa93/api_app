export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    active: boolean;
}


export interface UserCreate {
    name: string;
    email: string;
    age: number;
    active: boolean;
}


export interface UserUpdate {
    name?: string;
    email?: string;
    age?: number;
    active?: boolean;
}

