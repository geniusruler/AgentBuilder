
  # ContractGuard
  
AI-powered auditing pipeline that helps Web3 teams secure their smart contracts in minutes instead of weeks. It automatically scans Solidity/Vyper contracts, explains vulnerabilities in plain language, generates secure patches, runs tests, and opens a merge-ready pull request.

Features
Multi-tool vulnerability scanning
Uses tools like Slither and Mythril together with AI agents to detect common and advanced smart contract vulnerabilities and exploit patterns.​

Human-readable explanations
Generates clear descriptions of each issue, including severity and potential exploit scenarios, so both engineers and non-security experts can understand the risk.​

Automated code fixes
A coding agent (e.g., Cline CLI) proposes secure patches following best practices while preserving contract intent and interface.​

GitHub PR automation
Runs tests, attaches a structured vulnerability report, and opens a GitHub pull request that can be further reviewed by tools like CodeRabbit before merge.​

Production-ready UI
A polished web dashboard (designed in Figma and deployed on a platform like Vercel) that lets users upload contracts, monitor the audit pipeline, and review results.​

How It Works
Upload your contract
Paste Solidity/Vyper code, upload a file, or provide a GitHub repository URL.

AI audit pipeline runs
Orchestrated workflows trigger vulnerability scanners, AI explanation agents, patch generators, and test runners.

Review and merge
ContractGuard prepares a GitHub PR containing patched code, test results, and a vulnerability report, ready for human review and merge.

Tech Stac:
Frontend: React / Next.js, TypeScript, Tailwind CSS 

Backend / Orchestration: Kestra 
AI / Agents: Oumi for model experimentation, Cline CLI for autonomous coding workflows​

DevOps: Vercel for deployment, GitHub + CodeRabbit for PR review automation

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
