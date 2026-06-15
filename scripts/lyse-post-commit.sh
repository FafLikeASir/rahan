#!/bin/sh
# ponytail: exit 0/1 covers the logic, no agent needed
if git diff HEAD~1 --name-only | grep -qE '\.(tsx?|jsx?|css)$'; then
  npx lyse audit --no-prompt
  [ $? -ne 0 ] && npx lyse fix --no-prompt
fi
