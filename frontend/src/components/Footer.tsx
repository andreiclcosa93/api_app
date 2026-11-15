
import { Link } from "react-router-dom";
import "./Footer.scss";

import {
    FaInstagram,
    FaFacebookF,
    FaTiktok,
} from "react-icons/fa";


export function Footer() {

    return (
        <footer className="section-footer">

            <div className="footer-container">

                {/* Logo */}
                <div className="footer-brand">

                    <h2 className="footer-logo">
                        AN
                        <span>DREI</span>
                    </h2>

                    <p>APP IN React.js</p>

                </div>


                {/* Separator */}
                <div className="footer-divider">
                    <span>SOCIAL MEDIA</span>
                </div>


                {/* Navigation */}
                <div className="footer-navigation">

                    <div className="footer-column">

                        <h3>NAVIGATION</h3>

                        <Link to="/">
                            <p>HOME</p>
                        </Link>

                        <Link to="/about">
                            <p>ABOUT</p>
                        </Link>

                        <Link to="/users">
                            <p>USERS</p>
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h3>INFORMATION</h3>

                        <Link to="/posts">
                            <p>POSTS</p>
                        </Link>

                        <p>FAQS</p>
                        <p>CONTACT</p>

                    </div>


                    <div className="footer-column">

                        <h3>COMMUNITY</h3>

                        <p>BLOG</p>
                        <p>NEWS</p>
                        <p>EVENTS</p>

                    </div>

                </div>


                {/* Social Media */}
                <div className="footer-social">

                    <h3>FOLLOW ME</h3>

                    <div className="social-icons">

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok />
                        </a>

                    </div>


                    <a
                        className="footer-email"
                        href="mailto:contact@andrei.com"
                    >
                        contact@andrei.com
                    </a>

                </div>


                {/* Copyright */}
                <div className="footer-bottom">

                    <p>
                        © {new Date().getFullYear()} ANDREI
                        <span>ALL RIGHTS RESERVED</span>
                    </p>

                </div>

            </div>

        </footer>
    );
}
