import { Link } from "react-router-dom";

export function Page404() {
    return (

        <div>
            <h1>404 - Page Not Found</h1>

            <Link to="/">
                Back to Home
            </Link>
        </div>
    );
}