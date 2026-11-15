import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUserById, updateUser } from "../services/userService";
import type { User, UserUpdate } from "../types/User";

import "./EditUser.scss";

export function EditUser() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<UserUpdate>({
        name: "",
        email: "",
        age: 18,
        active: true
    });

    const [originalUser, setOriginalUser] = useState<User | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving]   = useState<boolean>(false);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {

        async function loadUser() {

            try {
                setLoading(true);
                setError(null);
                setOriginalUser(null);

                const userId = Number(id);

                if (!Number.isInteger(userId) || userId <= 0) {
                    throw new Error("Invalid user ID");
                }

                const user = await getUserById(userId);

                setOriginalUser(user);

                setForm({
                    name:   user.name,
                    email:  user.email,
                    age:    user.age,
                    active: user.active
                });

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
    }, [id]);


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!originalUser) {
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const userId = Number(id);

            const changes: UserUpdate = {};

            if (form.name !== originalUser.name) {
                changes.name = form.name;
            }

            if (form.email !== originalUser.email) {
                changes.email = form.email;
            }

            if (form.age !== originalUser.age) {
                changes.age = form.age;
            }

            if (form.active !== originalUser.active) {
                changes.active = form.active;
            }

            if (Object.keys(changes).length === 0) {
                navigate(`/user/${userId}`);
                return;
            }

            const updatedUser = await updateUser(userId, changes);

            navigate(`/user/${updatedUser.id}`);

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );

        } finally {
            setSaving(false);
        }

    }

    if (loading) {
        return (
            <div className="edit-user-message">
                Loading...
            </div>
        );
    }

    if (!originalUser) {
        return (
            <div className="edit-user-message">
                {error ?? "User not found"}
            </div>
        );
    }


    return (
        <section className="edit-user-page">

            <div className="edit-user-card">

                {/* Header */}
                <div className="edit-user-header">

                    <span className="edit-user-tag">
                        USER MANAGEMENT
                    </span>

                    <h1>Edit User</h1>

                    <p>
                        Update information for {originalUser.name}
                    </p>

                </div>

                <form
                    className="edit-user-form"
                    onSubmit={handleSubmit}
                >

                    <div className="edit-form-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter full name"
                            value={form.name ?? ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    <div className="edit-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={form.email ?? ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    <div className="edit-form-group">

                        <label htmlFor="age">
                            Age
                        </label>

                        <input
                            id="age"
                            type="number"
                            min="0"
                            max="120"
                            value={form.age ?? ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    age: Number(e.target.value)
                                })
                            }
                            required
                        />

                    </div>

                    <div className="edit-form-active">

                        <div>
                            <span className="edit-form-active-title">
                                Active User
                            </span>

                            <p>
                                Enable this user account
                            </p>
                        </div>

                        <label className="edit-form-switch">

                            <input
                                id="active"
                                type="checkbox"
                                checked={form.active ?? false}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        active: e.target.checked
                                    })
                                }
                                aria-label="Active user"
                            />

                            <span className="edit-form-switch-slider"></span>

                        </label>

                    </div>

                    {error && <p>{error}</p>}

                    <button
                        type="submit"
                        className="edit-user-submit"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </form>

            </div>
            
        </section>
    );

}


