# Solana Crowdfunding — Rapid Dash Edition

A decentralized RapidDash lifestyle app crowdfunding platform built on Solana with an Anchor smart contract and a React + Vite frontend.

## 📁 Project Structure

```
rapidDash-solana-crowdfunding/
├── contract/          # Anchor Framework (Solana Smart Contract)
│   └── programs/
│       └── crowdfunding/
│           └── src/lib.rs
├── frontend/          # React + Vite + TypeScript (UI)
│   └── src/
│       ├── screens/
│       ├── hooks/
│       └── providers/
├── package.json       # Monorepo root (npm workspaces)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **Rust** + **Solana CLI** + **Anchor CLI** (for smart contract)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Smart Contract (requires Solana toolchain)

```bash
# Install Solana toolchain
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
cargo install --git https://github.com/coral-xyz/anchor avm --force
avm install latest
avm use latest

# Build & test
cd contract
anchor build
anchor test
```

## 🔗 Integration

The frontend automatically reads the program IDL from `contract/target/idl/crowdfunding.json` after building the contract. You can also set `VITE_PROGRAM_ID` in the frontend `.env` to override.

## 👤 Author

Built by Sora.Onchain — Architecture and Narrative Conceptual who can Prototype.
Portfolio project for proof of concept.

figma link : https://www.figma.com/proto/MXEHt94PJcIZpb4vvAM6yk/Rapid-Dash?page-id=0%3A1&node-id=89-344&p=f&viewport=351%2C-96%2C0.2&t=NyMBsWrUyW2ZgUjE-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=89%3A344
