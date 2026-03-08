import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

// After running `anchor build`, the IDL will be generated at:
// contract/target/idl/crowdfunding.json
// For now, we use a placeholder. Replace with actual IDL import after build.
const PROGRAM_ID = new PublicKey(
    import.meta.env.VITE_PROGRAM_ID || '11111111111111111111111111111111',
);

// Placeholder IDL — replace with actual IDL after `anchor build`
const IDL: Idl = {
    version: '0.1.0',
    name: 'crowdfunding',
    instructions: [],
    accounts: [],
};

export function useProgram() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet.publicKey || !wallet.signTransaction) return null;
        return new AnchorProvider(connection, wallet as any, {
            commitment: 'confirmed',
        });
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;
        return new Program(IDL, PROGRAM_ID, provider);
    }, [provider]);

    return { program, provider, programId: PROGRAM_ID };
}
