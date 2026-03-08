import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import CSS bawaan wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

function CrowdfundingUI() {
  const { publicKey } = useWallet();

  return (
    <div style={{ backgroundColor: '#0D0D0D', color: '#00FFA3', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>🐰 Rapid Dash <span style={{ fontSize: '0.8rem', color: '#666' }}>Crowdfunding Edition</span></h1>
        <WalletMultiButton />
      </header>

      <main style={{ marginTop: '3rem', textAlign: 'center' }}>
        {publicKey ? (
          <div style={{ background: '#1A1A1A', padding: '2rem', borderRadius: '15px', border: '1px solid #00FFA3' }}>
            <h2>Welcome, Architect!</h2>
            <p>Wallet Connected: {publicKey.toBase58().slice(0, 8)}...</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button style={{ padding: '10px 20px', backgroundColor: '#00FFA3', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                Create Campaign
              </button>
              <button style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #00FFA3', color: '#00FFA3', borderRadius: '5px' }}>
                Donate SOL
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '5rem' }}>
            <h2 style={{ color: '#FFF' }}>Connect your wallet to start the mission.</h2>
            <p style={{ color: '#666' }}>Final Test: Solana Crowdfunding Flagship Product</p>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '5rem', fontSize: '0.7rem', color: '#444', textAlign: 'center' }}>
        Built for Mancer Final Review - Rapid Dash Case Study
      </footer>
    </div>
  );
}

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CrowdfundingUI />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}