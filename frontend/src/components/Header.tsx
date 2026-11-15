import { Link } from "react-router-dom";
import "./Header.scss";

export function Header() {

    return (
        <header className="site-header">

            <nav className="navbar">

                <Link to="/" className="navbar__logo">
                    My<span>App</span>
                </Link>

                <input
                    type="checkbox"
                    id="navbar-toggle"
                    className="navbar__toggle"
                />

                <label
                    htmlFor="navbar-toggle"
                    className="navbar__burger"
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                </label>

                <ul className="navbar__menu">

                    <li>
                        <Link
                            to="/"
                            className={`navbar__link ${
                                location.pathname === "/" ? "is-active" : ""
                            }`}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/users"
                            className={`navbar__link ${
                                location.pathname.startsWith("/user")
                                    ? "is-active"
                                    : ""
                            }`}
                        >
                            Users
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/about"
                            className={`navbar__link ${
                                location.pathname === "/about"
                                    ? "is-active"
                                    : ""
                            }`}
                        >
                            About
                        </Link>
                    </li>

                </ul>

            </nav>

        </header>
    )
}