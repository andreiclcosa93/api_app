import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { User } from "../types/User";
import { getUsers, deleteUser } from "../services/userService";

import "./Users.scss";


export function Users() {

    const [users, setUsers]             = useState<User[]>([]);
    const [loading, setLoading]         = useState<boolean>(true);
    const [deletingId, setDeletingId]   = useState<number | null>(null);
    const [error, setError]             = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null);


    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                setError(null);

                const data = await getUsers(
                    activeFilter === null ? undefined : activeFilter
                );

                setUsers(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [activeFilter]);


    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);
            setError(null);

            await deleteUser(id);

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== id)
            );

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        
        } finally {
            setDeletingId(null);
        }

    }


    if (loading && users.length === 0 && activeFilter === null) {
        return <p>Loading...</p>;
    }


    return (
        <section className="users-page">

            <div className="users-header">
                <div>
                    <h1>Users</h1>
                    <p>Manage your users</p>
                </div>

                <Link to="/users/create" className="users-create-btn">
                    Create User
                </Link>

            </div>

            
            <div className="users-filters">

                <button
                    type="button"
                    className={`users-filter-btn ${
                        activeFilter === true ? "filter-selected" : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(activeFilter === true ? null : true)
                    }
                >
                    Active
                </button>

                <button
                    type="button"
                    className={`users-filter-btn ${
                        activeFilter === false ? "filter-selected" : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(activeFilter === false ? null : false)
                    }
                >
                    Inactive
                </button>

            </div>

            {error && (
                <p className="users-error">{error}</p>
            )}

            {loading && (
                <p className="users-loading">
                    Filtering users...
                </p>
            )}


            {!loading && users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="users-grid">

                    {users.map((user) => (

                        <div className="user-card" key={user.id}>

                            <div className="user-card-inner">

                                <span className="user-card-tag">
                                    User #{user.id}
                                </span>

                                <h3>{user.name}</h3>

                                <p className="user-card-email">
                                    {user.email}
                                </p>

                                <p className="user-card-age">
                                    Age: {user.age}
                                </p>

                                <span className={
                                    user.active
                                        ? "user-status active"
                                        : "user-status inactive"
                                }>
                                    {user.active ? "Active" : "Inactive"}
                                </span>

                                
                                <div className="user-card-bottom">

                                    <Link
                                        to={`/user/${user.id}`}
                                        className="user-details-link"
                                    >
                                        View Details
                                        <span className="arrow">→</span>
                                    </Link>

                                    <div className="user-card-actions">

                                        <Link
                                            to={`/user/${user.id}/edit`}
                                            className="user-edit-btn"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="user-delete-btn"
                                            onClick={() => handleDelete(user.id)}
                                            disabled={deletingId !== null}
                                        >
                                            {deletingId === user.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>

                                    </div>

                                </div>


                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
