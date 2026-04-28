"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Close menu on route change / Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    // Prevent body scroll while menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <div
            role="banner"
            className={`navbar w-nav${menuOpen ? " navbar--open" : ""}`}
        >
            <div className="nav-content-grid">
                {/* ── LEFT: burger + desktop links ── */}
                <div className="nav-link-left">
                    {/* Hamburger button */}
                    <button
                        id="nav-burger-btn"
                        className="menu-button-lower-desktop w-nav-button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <div className="nav-burger-icon" aria-hidden="true">
                            <span className={`nav-burger-line${menuOpen ? " nav-burger-line--open" : ""}`} />
                            <span className={`nav-burger-line${menuOpen ? " nav-burger-line--open" : ""}`} />
                        </div>
                    </button>

                    {/* Desktop nav links (hidden on mobile via CSS) */}
                    <div className="nav-link-wrap">
                        <div className="link-block-wrap border-r">
                            <Link href="/category" className="links w-inline-block">
                                <div className="link-text">Shop</div>
                                <div className="link-text">Shop</div>
                            </Link>
                        </div>
                        <aside className="link-block-wrap">
                            <Link href="#contacts-SECTION" className="links w-inline-block">
                                <div className="link-text">Contact</div>
                                <div className="link-text">Contact</div>
                            </Link>
                        </aside>
                    </div>

                    <div className="plug-w100" />
                </div>

                {/* ── RIGHT: cart icon + sign-in / cart links ── */}
                <div className="nav-link-right">
                    <div className="plug-w100" />

                    {/* Cart icon — mobile only */}
                    <div className="cart-button-lower-desktop">
                        <img
                            src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/649c824defd18fb4cfaba780_svg.svg"
                            loading="lazy"
                            height="Auto"
                            width="Auto"
                            alt="cart"
                            className="icon24"
                        />
                    </div>

                    {/* Desktop nav links (hidden on mobile via CSS) */}
                    <nav role="navigation" className="nav-link-wrap w-nav-menu">
                        <div className="link-block-wrap">
                            <Link href="/login" className="links w-inline-block">
                                <div className="link-text">Sign in</div>
                                <div className="link-text">Sign in</div>
                            </Link>
                        </div>
                        <div className="link-block-wrap border-l">
                            <Link href="#" className="links w-inline-block">
                                <div className="link-text">Cart</div>
                                <div className="link-text">Cart</div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* ── MOBILE DRAWER ── */}
            {menuOpen && (
                <div
                    id="nav-mobile-overlay"
                    role="button"
                    tabIndex={0}
                    aria-label="Cerrar menú"
                    className="nav-mobile-overlay"
                    onKeyDown={(e) => {
                        if (e.key === 'Escape' || e.key === 'Enter') {
                            setMenuOpen(false);
                        }
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setMenuOpen(false);
                    }}
                            >
                    <nav className="nav-mobile-drawer" aria-label="Mobile navigation">
                        {/* Primary links */}
                        <Link
                            href="/login"
                            className="nav-link-copy-100 burger_mobile"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/category"
                            className="nav-link-copy-100 burger_mobile"
                            onClick={() => setMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/subscriptions"
                            className="nav-link-copy-100 burger_mobile"
                            onClick={() => setMenuOpen(false)}
                        >
                            Service
                        </Link>
                        <Link
                            href="#contacts-SECTION"
                            className="nav-link-copy-100 burger_mobile"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/about-us"
                            className="nav-link-copy-100 burger_mobile"
                            onClick={() => setMenuOpen(false)}
                        >
                            About us
                        </Link>

                        {/* Legal links */}
                        <div className="wrap-hide-desktop">
                            <Link href="#" className="caption" onClick={() => setMenuOpen(false)}>Shipping &amp; returns</Link>
                            <Link href="#" className="caption" onClick={() => setMenuOpen(false)}>Terms &amp; conditions</Link>
                            <Link href="#" className="caption" onClick={() => setMenuOpen(false)}>Privacy policy</Link>
                        </div>

                        {/* Social icons */}
                        <div className="icon-wrap-hide-desktop">
                            <img src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e144ecf86c56_Instagram.svg" loading="lazy" width="24" height="24" alt="Instagram" className="icon24" />
                            <img src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e1d70bf86c58_Pinterest.svg" loading="lazy" width="24" height="24" alt="Pinterest" className="icon24" />
                            <img src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e16d07f86c59_Facebook.svg" loading="lazy" width="24" height="24" alt="Facebook" className="icon24" />
                            <img src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e1cb4ef86c57_Twitter.svg" loading="lazy" width="24" height="24" alt="Twitter" className="icon24" />
                            <img src="https://cdn.prod.website-files.com/6400d82951450021c2d1eb7b/6433f820e186e17d93f86c5a_Telegram.svg" loading="lazy" width="24" height="24" alt="Telegram" className="icon24" />
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}
