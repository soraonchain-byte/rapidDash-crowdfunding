import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Dashboard.css';

/* ── Mock campaign data (replace with on-chain fetch later) ── */
const CAMPAIGNS = [
    {
        id: '1',
        title: 'Solana DeFi Hub',
        description: 'High-speed trading protocols for the community-driven financial…',
        category: 'DEFI',
        raised: 150,
        target: 200,
        cover: 'https://api.builder.io/api/v1/image/assets/TEMP/6a7de05211b3b29d666135e94b493013c6bba647?width=616',
    },
    {
        id: '2',
        title: 'Cyber Sprint P2E',
        description: 'The fastest racing game on-chain. Compete, win, and earn in…',
        category: 'GAMING',
        raised: 400,
        target: 1000,
        cover: 'https://api.builder.io/api/v1/image/assets/TEMP/5d51638e50a724f1cfb734d0d566122141fc5f71?width=616',
    },
    {
        id: '3',
        title: 'GreenNode Validator',
        description: 'Eco-friendly validator infrastructure powered by…',
        category: 'INFRA',
        raised: 460,
        target: 500,
        cover: 'https://api.builder.io/api/v1/image/assets/TEMP/d2694b373ef3de98cb791b79e805cac7fd930ceb?width=616',
    },
];

/* ── Solana Leaf Logo SVG ── */
const SolanaLogo: React.FC = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
        <g opacity="0.4" filter="url(#glow)">
            <rect width="35" height="35" rx="17.5" fill="url(#lg)" />
        </g>
        <path d="M8.68 19.01s-.003 1.73 3.12 3.3c.57 2.07.61 1.98 1.03 1l1.75-2.89c1.51-1.71 4.77-3.46 4.77-3.46s-4.14 3.41-5.5 6.42c-.88 1.95-2.05 6.55-2.05 6.55s4.57-8.07 12.52-8.31c4.84-5.27 4.01-8.66 4.01-8.66s-4.31-6.54-13.39-1.45c-2.35 2.63-5.4 3.02-5.4 3.02s-1.23-2.99 3.96-4.43c.93-1.54 2.38-5.07 2.38-5.07s-4.46 1.61-6.54 4.03c-1.51 1.39-2.18 3.07-2.18 3.07s-3.63.22-4.62 2.67c-.15 1.98-.71 2.94-.71 2.94s-.3 1.05 2.83 2.25c3.48.07 4.02-1.01 4.02-1.01z" fill="#14F195" stroke="white" strokeWidth=".365" />
        <path d="M20.85 25.85c-1.8-1.76-.81-2.73-.81-2.73s-1.28.59-2.02 1.06c-.89.67-1.52 1.36-1.52 1.36s.73.73 2.59 1.06c2.59.24 3.33 1.76 3.33 1.76s-.6-2.09-1.57-2.51z" fill="#14F195" stroke="white" strokeWidth=".365" />
        <path d="M28.66 13s.74-.97 3.39-.77c.58-.5.97-.9 1.1-1.62.18-.98-1.18-2.61-1.18-2.61s-.31 2.44-1.56 3.15c-1.43.54-1.75 1.85-1.75 1.85z" fill="#14F195" stroke="white" strokeWidth=".365" />
        <defs>
            <filter id="glow" x="-14.58" y="-14.58" width="64.17" height="64.17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="bg" />
                <feBlend in="SourceGraphic" in2="bg" result="shape" />
                <feGaussianBlur stdDeviation="7.29" result="blur" />
            </filter>
            <linearGradient id="lg" x1="0" y1="35" x2="35" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14F195" />
                <stop offset="1" stopColor="#9945FF" />
            </linearGradient>
        </defs>
    </svg>
);

/* ── Circular Progress Component ── */
const CircularProgress: React.FC<{ percent: number }> = ({ percent }) => {
    const r = 28;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="dash-progress-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={r} stroke="rgba(13,242,70,0.1)" strokeWidth="4" fill="none" />
                <circle
                    cx="32" cy="32" r={r}
                    stroke="#0DF246" strokeWidth="4" fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                    className="dash-progress-circle"
                />
            </svg>
            <span className="dash-progress-label">{percent}%</span>
        </div>
    );
};

/* ── Bottom Navigation Icons ── */
const HomeIcon = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
        <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16M0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill="currentColor" />
    </svg>
);
const ExploreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5.5 14.5L12.5 12.5L14.5 5.5L7.5 7.5L5.5 14.5M10 11.5C9.583 11.5 9.229 11.354 8.937 11.063C8.646 10.771 8.5 10.417 8.5 10C8.5 9.583 8.646 9.229 8.937 8.937C9.229 8.646 9.583 8.5 10 8.5C10.417 8.5 10.771 8.646 11.063 8.937C11.354 9.229 11.5 9.583 11.5 10C11.5 10.417 11.354 10.771 11.063 11.063C10.771 11.354 10.417 11.5 10 11.5M10 20C8.617 20 7.317 19.737 6.1 19.213C4.883 18.687 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117 .787 13.9C.262 12.683 0 11.383 0 10C0 8.617.262 7.317.787 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1.787C7.317.262 8.617 0 10 0C11.383 0 12.683.262 13.9.787C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.687 4.883 19.213 6.1C19.737 7.317 20 8.617 20 10C20 11.383 19.737 12.683 19.213 13.9C18.687 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.687 13.9 19.213C12.683 19.737 11.383 20 10 20M10 18C12.217 18 14.104 17.221 15.663 15.663C17.221 14.104 18 12.217 18 10C18 7.783 17.221 5.896 15.663 4.337C14.104 2.779 12.217 2 10 2C7.783 2 5.896 2.779 4.337 4.337C2.779 5.896 2 7.783 2 10C2 12.217 2.779 14.104 4.337 15.663C5.896 17.221 7.783 18 10 18Z" fill="currentColor" />
    </svg>
);
const CreateIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15M10 20C8.617 20 7.317 19.737 6.1 19.213C4.883 18.687 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117.787 13.9C.262 12.683 0 11.383 0 10C0 8.617.262 7.317.787 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1.787C7.317.262 8.617 0 10 0C11.383 0 12.683.262 13.9.787C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.687 4.883 19.213 6.1C19.737 7.317 20 8.617 20 10C20 11.383 19.737 12.683 19.213 13.9C18.687 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.687 13.9 19.213C12.683 19.737 11.383 20 10 20M10 18C12.233 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.233 18 10C18 7.767 17.225 5.875 15.675 4.325C14.125 2.775 12.233 2 10 2C7.767 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.767 2 10C2 12.233 2.775 14.125 4.325 15.675C5.875 17.225 7.767 18 10 18Z" fill="currentColor" />
    </svg>
);
const ProfileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 8C6.9 8 5.958 7.608 5.175 6.825C4.392 6.042 4 5.1 4 4C4 2.9 4.392 1.958 5.175 1.175C5.958.392 6.9 0 8 0C9.1 0 10.042.392 10.825 1.175C11.608 1.958 12 2.9 12 4C12 5.1 11.608 6.042 10.825 6.825C10.042 7.608 9.1 8 8 8M0 16V13.2C0 12.633.146 12.113.437 11.637C.729 11.163 1.117 10.8 1.6 10.55C2.633 10.033 3.683 9.646 4.75 9.387C5.817 9.129 6.9 9 8 9C9.1 9 10.183 9.129 11.25 9.387C12.317 9.646 13.367 10.033 14.4 10.55C14.883 10.8 15.271 11.163 15.563 11.637C15.854 12.113 16 12.633 16 13.2V16H0M2 14H14V13.2C14 13.017 13.954 12.85 13.863 12.7C13.771 12.55 13.65 12.433 13.5 12.35C12.6 11.9 11.692 11.563 10.775 11.337C9.858 11.113 8.933 11 8 11C7.067 11 6.142 11.113 5.225 11.337C4.308 11.563 3.4 11.9 2.5 12.35C2.35 12.433 2.229 12.55 2.137 12.7C2.046 12.85 2 13.017 2 13.2V14M8 6C8.55 6 9.021 5.804 9.413 5.413C9.804 5.021 10 4.55 10 4C10 3.45 9.804 2.979 9.413 2.587C9.021 2.196 8.55 2 8 2C7.45 2 6.979 2.196 6.587 2.587C6.196 2.979 6 3.45 6 4C6 4.55 6.196 5.021 6.587 5.413C6.979 5.804 7.45 6 8 6Z" fill="currentColor" />
    </svg>
);

/* ═══════════════════════════════════════════
   DASHBOARD SCREEN — Flagship Edition
   ═══════════════════════════════════════════ */
const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { publicKey } = useWallet();

    return (
        <div className="dash-root">
            {/* ── Header ── */}
            <header className="dash-header">
                <div className="dash-header-logo">
                    <SolanaLogo />
                </div>
                <div className="dash-header-right">
                    {publicKey ? (
                        <>
                            <div className="dash-balance-badge">
                                <span className="dash-balance-text">12.45 SOL</span>
                            </div>
                            <div className="dash-avatar-ring">
                                <img
                                    src="https://api.builder.io/api/v1/image/assets/TEMP/8136bf9e85b606f7bc6e38be66f35ec997b83ff2?width=72"
                                    alt="Profile"
                                    className="dash-avatar-img"
                                />
                            </div>
                        </>
                    ) : (
                        <WalletMultiButton />
                    )}
                </div>
            </header>

            {/* ── Hero Section ── */}
            <section className="dash-hero">
                <div className="dash-hero-bg">
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/d07f5838c4c03fbdf8910fdc88875f8da50fec90?width=684"
                        alt=""
                        className="dash-hero-bg-img"
                    />
                    <div className="dash-hero-gradient" />
                </div>
                <div className="dash-hero-content">
                    <div className="dash-hero-icon">
                        <div className="dash-hero-icon-inner" />
                    </div>
                    <h1 className="dash-hero-title">
                        <span className="dash-hero-title-white">Level Up the{'\n'}</span>
                        <span className="dash-hero-title-green">Community</span>
                    </h1>
                    <p className="dash-hero-subtitle">
                        Empowering the next generation of decentralized innovation on Solana.
                    </p>
                    <button className="dash-hero-cta">
                        Start a Campaign
                    </button>
                </div>
            </section>

            {/* ── Section Title ── */}
            <div className="dash-section-header">
                <h2 className="dash-section-title">Active Campaigns</h2>
                <button className="dash-section-link">See all</button>
            </div>

            {/* ── Campaign Cards ── */}
            <div className="dash-campaign-grid">
                {CAMPAIGNS.map((c) => {
                    const percent = Math.round((c.raised / c.target) * 100);
                    return (
                        <article key={c.id} className="dash-card">
                            {/* Cover */}
                            <div className="dash-card-cover">
                                <img src={c.cover} alt={c.title} className="dash-card-cover-img" />
                                <span className="dash-card-badge">{c.category}</span>
                            </div>

                            {/* Info Row */}
                            <div className="dash-card-info-row">
                                <div className="dash-card-text">
                                    <h3 className="dash-card-title">{c.title}</h3>
                                    <p className="dash-card-desc">{c.description}</p>
                                </div>
                                <CircularProgress percent={percent} />
                            </div>

                            {/* Footer */}
                            <div className="dash-card-footer">
                                <div className="dash-card-raised">
                                    <span className="dash-card-raised-label">Raised</span>
                                    <span className="dash-card-raised-value">
                                        {c.raised} / {c.target} SOL
                                    </span>
                                </div>
                                <button
                                    className="dash-card-btn"
                                    onClick={() => navigate(`/campaign/${c.id}`)}
                                >
                                    View Project
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* ── Floating Bottom Navigation ── */}
            <nav className="dash-bottom-nav">
                <div className="dash-nav-inner">
                    <button className="dash-nav-link dash-nav-active" aria-label="Home">
                        <HomeIcon />
                    </button>
                    <button className="dash-nav-link" aria-label="Explore">
                        <ExploreIcon />
                    </button>
                    <button className="dash-nav-link" aria-label="Create Campaign" onClick={() => navigate('/manage')}>
                        <CreateIcon />
                    </button>
                    <button className="dash-nav-link" aria-label="Profile">
                        <ProfileIcon />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;
