import type { User, UserCreate, UserUpdate } from "../types/User";

const API_URL = import.meta.env.VITE_API_URL;



export async function getUsers(
    active?: boolean
): Promise<User[]> {
    const url = new URL(`${API_URL}/users`);

    if (active !== undefined) {
        url.searchParams.set("active", String(active));
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}


export async function getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
        throw new Error("User not found");
    }

    return response.json();
}


export async function createUser(user: UserCreate): Promise<User> {

    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json();
}


export async function updateUser(
    id: number,
    data: UserUpdate
): Promise<User> {

    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json();
}


export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
}





