import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * DonationDetail — Screen 2 (Detail Donasi)
 * TODO: Waiting for Figma design input from user.
 */
const DonationDetail: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6"
            style={{ background: 'var(--gradient-bg)', fontFamily: 'var(--font-main)' }}>
            <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                    style={{ border: '2px solid var(--color-accent)', background: 'var(--color-accent-bg-strong)' }}>
                    <span className="text-3xl">💎</span>
                </div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    Donation Detail
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Screen awaiting Figma design input.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 rounded-full font-bold text-sm"
                    style={{
                        background: 'var(--color-accent-bg-strong)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-border-strong)',
                    }}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default DonationDetail;
