#!/usr/bin/env python3
"""Claude Code PreToolUse hook: separation of duties for the career agent.

The agent may draft, commit to a branch and open a pull request.
It may NOT publish: no push to main/master, no force push, no merging
its own pull request, no changing repo visibility or settings.
Paulo merges. That merge is the approval.

Exit code 2 blocks the tool call and shows the reason to the agent.
"""
import json
import re
import subprocess
import sys

BLOCKED = [
    (r"\bgh\s+pr\s+merge\b", "merging a pull request is Paulo's approval step"),
    (r"\bgh\s+api\b.*\b/merge\b", "merging through the API is Paulo's approval step"),
    (r"\bgh\s+repo\s+(edit|delete|rename|archive)\b", "repository settings are Paulo's call"),
    (r"\bgit\s+push\b.*(--force\b|-f\b|--force-with-lease\b)", "force push rewrites history"),
    (r"\bgit\s+push\b.*\b(main|master)\b", "main is the live branch; open a pull request"),
    (r"\bgit\s+push\b.*\s:\S", "deleting remote branches is not allowed"),
]


def current_branch() -> str:
    try:
        return subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"],
                              capture_output=True, text=True, timeout=5).stdout.strip()
    except Exception:
        return ""


def main() -> int:
    try:
        event = json.load(sys.stdin)
    except Exception:
        return 0
    if event.get("tool_name") != "Bash":
        return 0
    cmd = (event.get("tool_input") or {}).get("command", "")
    for pattern, why in BLOCKED:
        if re.search(pattern, cmd):
            print(f"Blocked by career-agent guard: {why}. Command: {cmd}", file=sys.stderr)
            return 2
    # A bare "git push" from main would publish too.
    if re.search(r"\bgit\s+push\b", cmd) and current_branch() in ("main", "master"):
        print("Blocked by career-agent guard: you are on main. Create a branch "
              "and open a pull request for Paulo to merge.", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
