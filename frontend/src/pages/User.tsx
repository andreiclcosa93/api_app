import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { User as UserType } from "../types/User";
import { getUserById, deleteUser } from "../services/userService";

import {
    FaUser,
    FaEnvelope,
    FaCalendarAlt,
    FaPen,
    FaTrash,
    FaArrowLeft,
    FaIdBadge,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import "./User.scss";


export function User() {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [user, setUser]           = useState<UserType | null>(null);
    const [loading, setLoading]     = useState<boolean>(true);
    const [deleting, setDeleting]   = useState<boolean>(false);
    const [error, setError]         = useState<string | null>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                setLoading(true);
                setError(null);
                setUser(null);

                const userId = Number(id);

                if (!Number.isInteger(userId) || userId <= 0) {
                    throw new Error("Invalid user ID");
                }

                const data = await getUserById(userId);

                setUser(data);

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

        loadUser();
    }, [id]); // !!


    async function handleDelete() {

        if (!user) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            setError(null);

            await deleteUser(user.id);

            navigate("/users");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete user"
            );
        } finally {
            setDeleting(false);
        }
    }


    if (loading) {
        return (
            <div className="user-details-message">
                Loading user...
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="user-details-message">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="user-details-message">
                User not found
            </div>
        );
    }

    const initials = user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((name) => name.charAt(0).toUpperCase())
        .join("");


    return (
        <section className="user-details-page">

            <div className="user-details-container">

                {/* Breadcrumb */}
                <div className="user-breadcrumb">

                    <Link to="/users">
                        <FaArrowLeft />
                        Back to Users
                    </Link>

                    <span>/</span>

                    <span>User #{user.id}</span>

                </div>

                {/* Page Header */}
                <div className="user-details-header">

                    <div className="user-details-heading">

                        <h1>User Details</h1>
                        <p>
                            View detailed information about this user
                        </p>

                    </div>

                    <div className="user-details-actions">

                        <Link
                            to={`/user/${user.id}/edit`}
                            className="user-details-edit"
                        >
                            <FaPen />
                            Edit User
                        </Link>

                        <button
                            type="button"
                            className="user-details-delete"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            <FaTrash />
                            {deleting ? "Deleting..." : "Delete User"}
                        </button>

                    </div>

                </div>


                {/* Main Grid */}
                <div className="user-details-grid">

                    {/* Profile Card */}
                    <div className="user-profile-card">

                        <div className="user-profile-top">

                            <div className="user-profile-avatar">
                                {initials}
                            </div>

                            <h2>{user.name}</h2>

                            <p>{user.email}</p>

                            <span
                                className={`user-profile-status ${
                                    user.active ? "active" : "inactive"
                                }`}
                            >
                                {user.active ? (
                                    <FaCheckCircle />
                                ) : (
                                    <FaTimesCircle />
                                )}

                                {user.active ? "Active" : "Inactive"}
                            </span>

                        </div>

                        <div className="user-profile-bottom">

                            <div className="user-profile-row">

                                <span>
                                    <FaIdBadge />
                                    User ID
                                </span>

                                <strong>#{user.id}</strong>

                            </div>

                            <div className="user-profile-row">

                                <span>
                                    <FaUser />
                                    Account
                                </span>

                                <strong>
                                    {user.active ? "Enabled" : "Disabled"}
                                </strong>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="user-information">

                        <h2 className="user-information-title">
                            User Information
                        </h2>


                        <div className="user-info-grid">

                            {/* Name */}
                            <div className="user-info-card">

                                <div className="user-info-icon purple">
                                    <FaUser />
                                </div>

                                <span>Full Name</span>

                                <h3>{user.name}</h3>

                            </div>


                            {/* Email */}
                            <div className="user-info-card">

                                <div className="user-info-icon orange">
                                    <FaEnvelope />
                                </div>

                                <span>Email Address</span>

                                <h3>{user.email}</h3>

                            </div>


                            {/* Age */}
                            <div className="user-info-card">

                                <div className="user-info-icon purple">
                                    <FaCalendarAlt />
                                </div>

                                <span>Age</span>

                                <h3>{user.age}</h3>

                            </div>

                        </div>


                        {/* Account Status */}
                        <div className="user-account-status">

                            <div className="user-account-status-left">

                                <div
                                    className={`user-account-icon ${
                                        user.active ? "active" : "inactive"
                                    }`}
                                >
                                    {user.active ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <FaTimesCircle />
                                    )}
                                </div>

                                <div>
                                    <h3>Account Status</h3>

                                    <p>
                                        {user.active
                                            ? "This user account is currently active."
                                            : "This user account is currently inactive."}
                                    </p>
                                </div>

                            </div>


                            <span
                                className={`user-account-badge ${
                                    user.active ? "active" : "inactive"
                                }`}
                            >
                                {user.active ? "Active" : "Inactive"}
                            </span>

                        </div>

                    </div>

                </div>

                {error && <p>{error}</p>}

            </div>

        </section>
    );

}
