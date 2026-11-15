import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../services/userService";
import type { UserCreate } from "../types/User";

import "./CreateUser.scss";

export function CreateUser() {

    const navigate = useNavigate();

    const [form, setForm] = useState<UserCreate>({
        name: "",
        email: "",
        age: 18,
        active: true
    });

    const [error, setError]     = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const user = await createUser(form);
            navigate(`/user/${user.id}`);
        
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


    return (
        <section>

            <div className="create-user-card">

                <div className="create-user-header">
                    <span className="create-user-tag">
                        USER MANAGEMENT
                    </span>

                    <h1>Create User</h1>

                    <p>
                        Add a new user
                    </p>
                </div>

                <form 
                    className="create-user-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label htmlFor="user-name">
                            Full Name
                        </label>

                        <input
                            id="user-name"
                            type="text"
                            placeholder="Enter full name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="user-email">
                            Email Address
                        </label>

                        <input
                            id="user-email"
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="user-age">
                            Age
                        </label>

                        <input
                            id="user-age"
                            type="number"
                            min="0"
                            max="120"
                            value={form.age}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    age: Number(e.target.value)
                                })
                            }
                            required
                        />
                    </div>

                    <div className="form-active">
                        <div>
                            <span className="form-active-title">
                                Active User
                            </span>

                            <p>
                                Enable this user account
                            </p>
                        </div>

                        <label className="form-switch">
                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        active: e.target.checked
                                    })
                                }
                                aria-label="Active user"
                            />

                            <span className="form-switch-slider"></span>
                        </label>
                    </div>

                    {error && <p>{error}</p>}

                    <button
                        type="submit"
                        className="create-user-submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create User"}
                    </button>
                    
                </form>

            </div>

        </section>
    );

}

