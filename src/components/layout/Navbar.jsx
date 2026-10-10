"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    ShoppingCart,
    ChevronDown,
    ChevronRight,
    UserRound,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import Container from "@/components/shared/Container";

// Product categories
const categories = [
    { name: "Rice", slug: "chal", icon: "🍚" },
    { name: "Lentils", slug: "dal", icon: "🫘" },
    { name: "Oil", slug: "tel", icon: "🛢️" },
    { name: "Vegetables", slug: "shobji", icon: "🥬" },
    { name: "Fish", slug: "mach", icon: "🐟" },
    { name: "Meat", slug: "mangsho", icon: "🍗" },
    { name: "Eggs & Dairy", slug: "dim-dudh", icon: "🥛" },
    { name: "Spices", slug: "mosla", icon: "🌶️" },
];

// Date & Time
function getCurrentDate() {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());
}

// Reusable user avatar
function UserAvatar({ user, size = 38 }) {
    const initials =
        user?.name
            ?.trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase() || "U";

    return (
        <span
            className="flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#e6f2e9] text-[13px] font-semibold text-[#008a45]"
            style={{
                width: size,
                height: size,
                backgroundImage: user?.image
                    ? `url("${user.image}")`
                    : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            role={user?.image ? "img" : undefined}
            aria-label={user?.image ? `${user.name} profile photo` : undefined}
        >
            {!user?.image && initials}
        </span>
    );
}

export default function Navbar({ user = null, onSignOut }) {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState("");

    const profileRef = useRef(null);
    const drawerCloseRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Update the current date
    useEffect(() => {
        const updateDate = () => setCurrentDate(getCurrentDate());

        updateDate();

        const interval = setInterval(updateDate, 60_000);

        return () => clearInterval(interval);
    }, []);

    // Close desktop profile dropdown
    useEffect(() => {
        if (!profileOpen) return;

        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [profileOpen]);

    useEffect(() => {
        if (!mobileOpen) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        drawerCloseRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
            }

            if (event.key === "Tab") {
                const drawer = document.getElementById("mobile-navigation");

                const focusable = drawer?.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                if (!focusable?.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === last
                ) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileOpen]);

    const isActive = (slug) => pathname === `/category/${slug}`;

    const closeMobile = () => {
        setMobileOpen(false);
    };

    const handleSignOut = async () => {
        setProfileOpen(false);
        setMobileOpen(false);

        if (onSignOut) {
            await onSignOut();
        }
    };

    return (
        <header className="relative z-50 w-full bg-[#fafcfb] font-sans">
            {/* ======================================
                MAIN HEADER
            ====================================== */}

            <div className="border-b border-[#e8eee9]">
                <Container className="flex h-18.5 items-center justify-between">
                    {/* Brand */}
                    <Link
                        href="/"
                        onClick={closeMobile}
                        className="group flex shrink-0 items-center gap-2.75"
                    >
                        <span className="flex h-10.5 w-10.5 items-center justify-center rounded-[11px] bg-[#008a45] text-white transition-colors duration-300 group-hover:bg-[#00763a]">
                            <ShoppingCart size={22} strokeWidth={1.8} />
                        </span>

                        <span className="flex flex-col justify-center">
                            <span className="text-[22px] leading-[1.1] font-bold tracking-[-0.7px] text-[#202b23]">
                                Bazar Dor
                            </span>

                            <span className="mt-1.5 min-h-3 text-[11px] leading-none text-[#657168] sm:text-[12px]">
                                {currentDate || "\u00a0"}
                            </span>
                        </span>
                    </Link>

                    {/* ======================================
                        DESKTOP AUTHENTICATION
                    ====================================== */}

                    <div className="hidden items-center gap-7 lg:flex">
                        {user ? (
                            <div ref={profileRef} className="relative">
                                <button
                                    type="button"
                                    aria-label="Open account menu"
                                    aria-expanded={profileOpen}
                                    aria-haspopup="menu"
                                    aria-controls="profile-dropdown"
                                    onClick={() => setProfileOpen((prev) => !prev)}
                                    className="flex items-center gap-2.75 rounded-[10px] px-2.25 py-1.5 transition-colors duration-200 hover:bg-[#edf4ef]"
                                >
                                    <UserAvatar user={user} />

                                    <span className="max-w-35 truncate text-[14px] font-medium text-[#202b23]">
                                        {user.name?.split(" ")[0] || "Account"}
                                    </span>

                                    <ChevronDown
                                        size={15}
                                        className={`text-[#69746c] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Profile Dropdown */}
                                {profileOpen && (
                                    <div
                                        id="profile-dropdown"
                                        role="menu"
                                        className="profile-pop absolute top-[calc(100%+10px)] right-0 z-50 w-67.5 rounded-2xl border border-[#e1e8e2] bg-[#fafcfb] p-4.75 shadow-[0_15px_40px_rgba(20,43,27,0.14)]"
                                    >
                                        <div className="border-b border-[#e8eee9] pb-3.75">
                                            <h3 className="truncate text-[15px] font-semibold text-[#202b23]">
                                                {user.name}
                                            </h3>

                                            <p className="mt-1.25 truncate text-[12px] text-[#69746c]">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="pt-2.25">
                                            <Link
                                                href="/profile"
                                                role="menuitem"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-2.75 rounded-[9px] px-2.5 py-2.75 text-[13px] font-medium text-[#26352b] transition-colors hover:bg-[#edf5ef] hover:text-[#008a45]"
                                            >
                                                <UserRound size={17} />
                                                My Profile
                                            </Link>

                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={handleSignOut}
                                                className="mt-0.75 flex w-full items-center gap-2.75 rounded-[9px] px-2.5 py-2.75 text-left text-[13px] font-medium text-[#ef4444] transition-colors hover:bg-[#fff0f0]"
                                            >
                                                <LogOut size={17} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="text-[14px] font-semibold text-[#202b23] transition-colors duration-200 hover:text-[#008a45]"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/signup"
                                    className="inline-flex h-10.5 items-center justify-center rounded-[10px] bg-[#008a45] px-5.75 text-[14px] font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00763a]"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ======================================
                        MOBILE MENU BUTTON
                    ====================================== */}

                    <button
                        ref={menuButtonRef}
                        type="button"
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMobileOpen(true)}
                        className="flex h-10.5 w-10.5 items-center justify-center rounded-[10px] border border-[#dce7de] bg-white text-[#202b23] transition-colors duration-200 hover:border-[#008a45] hover:text-[#008a45] lg:hidden"
                    >
                        <Menu size={22} strokeWidth={1.8} />
                    </button>
                </Container>
            </div>

            {/* ======================================
                DESKTOP CATEGORY NAVIGATION
            ====================================== */}

            <nav
                aria-label="Product categories"
                className="hidden border-b border-[#e1e8e2] lg:block"
            >
                <Container className="flex h-13.5 items-center gap-2">
                    {categories.map((category) => {
                        const active = isActive(category.slug);

                        return (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                aria-current={active ? "page" : undefined}
                                className={`inline-flex h-9.25 shrink-0 items-center justify-center gap-2 rounded-[9px] px-3.5 text-[14px] font-medium tracking-[-0.2px] whitespace-nowrap transition-colors duration-200 ${active
                                    ? "bg-[#008a45] text-white"
                                    : "text-[#29352c] hover:bg-[#eaf3ed] hover:text-[#008a45]"
                                    }`}
                            >
                                <span className="text-[16px] leading-none">
                                    {category.icon}
                                </span>

                                <span>{category.name}</span>
                            </Link>
                        );
                    })}
                </Container>
            </nav>

            {/* ======================================
                MOBILE DRAWER BACKDROP
            ====================================== */}

            <div
                aria-hidden="true"
                onClick={closeMobile}
                className={`fixed inset-0 z-70 bg-[#122019]/45 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${mobileOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />

            {/* ======================================
                PREMIUM MOBILE DRAWER
            ====================================== */}

            <aside
                id="mobile-navigation"
                role="dialog"
                aria-modal={mobileOpen}
                aria-labelledby="mobile-menu-title"
                aria-hidden={!mobileOpen}
                inert={!mobileOpen}
                className={`fixed inset-y-0 right-0 z-80 flex h-dvh w-[min(380px,calc(100vw-20px))] flex-col overflow-hidden border-l border-[#e4ebe5] bg-[#fafcfb] shadow-[-15px_0_45px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${mobileOpen
                    ? "translate-x-0"
                    : "translate-x-full"
                    }`}
            >
                {/* ======================================
                    DRAWER HEADER
                ====================================== */}

                <div className="shrink-0 border-b border-[#e8eee9] px-5.5 pt-[max(24px,env(safe-area-inset-top))] pb-5.5">
                    <div className="flex items-center justify-between gap-3">
                        {/* Brand */}
                        <Link
                            href="/"
                            onClick={closeMobile}
                            className="flex items-center gap-2.75"
                        >
                            <span className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-[11px] bg-[#008a45] text-white">
                                <ShoppingCart size={21} strokeWidth={1.8} />
                            </span>

                            <span className="flex flex-col">
                                <span className="text-[20px] leading-[1.2] font-bold tracking-[-0.6px] text-[#202b23]">
                                    Bazar Dor
                                </span>

                                <span className="mt-0.75 text-[11px] text-[#718076]">
                                    Daily Market Prices
                                </span>
                            </span>
                        </Link>

                        {/* Close Button */}
                        <button
                            ref={drawerCloseRef}
                            type="button"
                            aria-label="Close navigation menu"
                            onClick={() => {
                                closeMobile();
                                menuButtonRef.current?.focus();
                            }}
                            className="flex h-9.75 w-9.75 shrink-0 items-center justify-center rounded-[10px] border border-[#e2e9e3] bg-white text-[#4c5a50] transition-all duration-200 hover:border-[#008a45] hover:bg-[#f0f7f2] hover:text-[#008a45]"
                        >
                            <X size={20} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                {/* ======================================
                    SCROLLABLE NAVIGATION
                ====================================== */}

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6.25">
                    {/* Section Heading */}
                    <div className="mb-4.25 px-1.25">
                        <span className="text-[11px] font-semibold tracking-[1.5px] text-[#008a45] uppercase">
                            Navigation
                        </span>

                        <h2
                            id="mobile-menu-title"
                            className="mt-1.25 text-[22px] font-bold tracking-[-0.6px] text-[#202b23]"
                        >
                            Browse Categories
                        </h2>
                    </div>

                    {/* Category Links */}
                    <nav
                        aria-label="Mobile product categories"
                        className="flex flex-col gap-1"
                    >
                        {categories.map((category) => {
                            const active = isActive(category.slug);

                            return (
                                <Link
                                    key={category.slug}
                                    href={`/category/${category.slug}`}
                                    onClick={closeMobile}
                                    aria-current={active ? "page" : undefined}
                                    className={`group flex min-h-13.25 items-center justify-between rounded-[10px] px-3 transition-all duration-200 ${active
                                        ? "bg-[#008a45] text-white"
                                        : "text-[#29352d] hover:bg-[#eef5f0]"
                                        }`}
                                >
                                    {/* Category */}
                                    <span className="flex items-center gap-3.25">
                                        <span
                                            className={`flex h-8.75 w-8.75 shrink-0 items-center justify-center rounded-[9px] text-[18px] ${active
                                                ? "bg-white/15"
                                                : "bg-[#eff4f0]"
                                                }`}
                                        >
                                            {category.icon}
                                        </span>

                                        {/* Category Name */}
                                        <span className="text-[14px] font-semibold">
                                            {category.name}
                                        </span>
                                    </span>

                                    {/* Arrow */}
                                    <ChevronRight
                                        size={17}
                                        strokeWidth={1.8}
                                        className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${active
                                            ? "text-white/90"
                                            : "text-[#a0aea4]"
                                            }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ======================================
                        LOGGED-IN USER PROFILE
                    ====================================== */}

                    {user && (
                        <div className="mt-7.5 border-t border-[#e8eee9] pt-5.75">
                            <p className="mb-3.75 px-1.25 text-[11px] font-semibold tracking-[1.4px] text-[#829087] uppercase">
                                Your Account
                            </p>

                            {/* User Information */}
                            <div className="flex items-center gap-3 rounded-xl border border-[#e5ebe6] bg-white p-3.25">
                                <UserAvatar user={user} size={43} />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[14px] font-semibold text-[#202b23]">
                                        {user.name}
                                    </p>

                                    <p className="mt-1 truncate text-[12px] text-[#718076]">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* My Profile Link */}
                            <Link
                                href="/profile"
                                onClick={closeMobile}
                                className="mt-2.5 flex h-12 items-center justify-between rounded-[10px] px-3 text-[13px] font-medium text-[#29352d] transition-colors hover:bg-[#eef5f0] hover:text-[#008a45]"
                            >
                                <span className="flex items-center gap-2.75">
                                    <UserRound size={18} />
                                    My Profile
                                </span>

                                <ChevronRight size={17} />
                            </Link>
                        </div>
                    )}
                </div>

                {/* ======================================
                    DRAWER FOOTER / AUTHENTICATION
                ====================================== */}

                <div className="shrink-0 border-t border-[#e8eee9] bg-white px-5.5 pt-4.75 pb-[max(22px,env(safe-area-inset-bottom))]">
                    {user ? (
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex h-11.5 w-full items-center justify-center gap-2.25 rounded-[10px] border border-[#ffd8d8] bg-[#fff5f5] text-[14px] font-semibold text-[#ef4444] transition-colors duration-200 hover:bg-[#ffecec]"
                        >
                            <LogOut size={17} />
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <p className="mb-3.25 text-center text-[12px] text-[#78867c]">
                                Sign in to explore detailed market prices.
                            </p>

                            <div className="grid grid-cols-2 gap-2.75">
                                {/* Sign In */}
                                <Link
                                    href="/signin"
                                    onClick={closeMobile}
                                    className="flex h-11.25 items-center justify-center rounded-[9px] border border-[#dce6de] bg-white text-[13px] font-semibold text-[#29352d] transition-colors duration-200 hover:border-[#008a45] hover:text-[#008a45]"
                                >
                                    Sign In
                                </Link>

                                {/* Sign Up */}
                                <Link
                                    href="/signup"
                                    onClick={closeMobile}
                                    className="flex h-11.25 items-center justify-center rounded-[9px] bg-[#008a45] text-[13px] font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-[#00763a]"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </header>
    );
}