This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## UI Features

- **Modern Design**: Glassmorphism effects and gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Beautiful loading animations and progress indicators
- **Error Handling**: User-friendly error messages and retry options
- **Copy Functionality**: Copy AI responses to clipboard
- **History Sidebar**: Browse and reload previous conversations
- **Search**: Search through query history
- **Pagination**: Efficient pagination for large query histories

##Project Structure
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Home page
│   │   │   └── globals.css      # Global styles
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx # Main chat component
│   │   │   └── QueryHistory.tsx  # History sidebar
│   │   └── lib/
│   │       └── api.ts           # API utilities
│   ├── package.json             # Node.js dependencies
│   ├── tailwind.config.js       # Tailwind configuration
│   └── .env.local               # Environment variables template
└── README.md                    # This file

## Getting Started on a new project

```bash
npx create-next-app frontend --use-npm

# output
Need to install the following packages:
create-next-app@15.4.5
Ok to proceed? (y) y

✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /Users/patrick/quiz-system/frontend.


```

## Installing packaages
```bash
npm i

# or
npm i lucide-react axios framer-motion react-hot-toast date-fns clsx tailwind-merge 
```

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
