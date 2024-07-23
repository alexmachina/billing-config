# Billing Config App

https://billing-config.vercel.app/

https://github.com/user-attachments/assets/b3588563-6ec8-44c8-9f85-5bbc2e4cf304


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Overview
- This project uses `react-hook-form` to handle form logic
- Tailwind and DaisyUI for styling
- Common UI elements are located at `src/components`
- Components containing state and side effect logic are located in `_components` directory, in each respective page directory.
- Jest with React Testing Library is set up, and there is a simple test to make sure the component is rendering correctly
- It uses yup for schema validation, clsx as a handy utillity for dealing with classNames and lodash.debounce to handle form autocomplete logic


