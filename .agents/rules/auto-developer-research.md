# Autonomous Real-World Developer Research Rule

## Directive
Whenever the user asks questions about:
- Technical approaches or architecture (e.g. "How should I structure real-time video sync?")
- Library or framework comparisons (e.g. "Should we use Zustand or Jotai?", "LiveKit vs Agora?")
- Best practices and patterns (e.g. "How are modern teams handling watch party rooms?")
- Tricky debugging or elusive errors that might affect other teams

**DO NOT answer with isolated theoretical advice.** 
Proactively use `agent-reach` (checking GitHub code/discussions, Reddit r/webdev / r/reactjs, Twitter/X dev discussions, and technical articles) to research how production engineering teams and developers are actually solving it in the wild today.

## Behavior Guidelines
1. **Autonomous Invocation**: The user does NOT need to type `/agent-reach`. The agent automatically invokes `agent-reach` methods to gather real-world intelligence.
2. **Community Grounding**: Reference real developer findings in the answer:
   - What the general developer consensus is in 2025/2026.
   - Battle-tested patterns vs. traps/gotchas others have already warned about.
   - Actual production libraries and tools commonly paired together.
3. **Smart Exceptions**: Do NOT query the internet for trivial, purely local workspace questions (e.g., "Where is variable X declared in Footer.tsx?"). Reserve external research for decisions, architectures, library choices, and engineering strategies.
