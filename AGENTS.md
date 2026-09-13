<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:step-by-step-workflow-rule -->
# Strict Step-by-Step Workflow

When the user provides a step or task:
1. **Do not write code or execute changes immediately.**
2. Explain what the step is about in plain English.
3. Provide a detailed list of the files that will be modified during this step.
4. Explicitly ask the user for permission to proceed (e.g., "Ready to proceed?").
5. **Wait for the user's explicit authorization** before taking any coding action.
6. Once authorized, only execute the exact step requested, and do not jump ahead to subsequent tasks.
<!-- END:step-by-step-workflow-rule -->
