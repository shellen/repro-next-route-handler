# repro-next-route-handler

Invalid Type Error for Route Handler's Second Argument in Next.js 15

## Bug Report: Invalid Type Error for Route Handler's Second Argument in Next.js 15

### Description

Route handlers in Next.js 15 are throwing a TypeScript error for the second argument's type, even when using the documented pattern.

### Reproduction

Repository: https://github.com/shellen/repro-next-route-handler

Steps to reproduce:

1. Create a new Next.js 15 project with TypeScript
2. Add a route handler with PATCH method
3. Run `npm run build`

### Current Behavior

Build fails with error:

`src/app/api/test/[id]/route.ts`
`Type error: Route "src/app/api/test/[id]/route.ts" has an invalid "PATCH" export:`
`  Type "{ params: { id: string; }; }" is not a valid type for the function's second argument.`

# To repro, I've this new Next.js project

`npx create-next-app@latest repro-next-route-handler`

# Select options:

- TypeScript: Yes
- ESLint: Yes
- Tailwind: No
- src/ directory: Yes
- App Router: Yes
- Custom import alias: No

`cd repro-next-route-handler`

Make sure to set React versions to:

`  "react": "18.2.0",`
`    "react-dom": "18.2.0",`

`npm run build`

# Attempted fixes

Here are things I've tried to fix it.

| Approach                     | Description                             | Result | Note                      |
| ---------------------------- | --------------------------------------- | ------ | ------------------------- |
| Custom Props Type            | Used Props interface for params         | Failed | Type error                |
| Props Interface              | Added interface for parameters          | Failed | Type error                |
| Next.js Types                | Used NextRequest and return types       | Failed | Same type error persisted |
| Base Request Type            | Used standard Request type              | Failed | Type error remained       |
| Record Type                  | Used Record<string, string \| string[]> | Failed | No improvement            |
| Remove Dependencies          | Removed @hello-pangea/dnd               | Failed | Not dependency related    |
| Disable TypedRoutes          | Removed from next.config                | Failed | Not config related        |
| RouteSegment Type            | Created custom RouteSegment type        | Failed | Type error persisted      |
| Runtime Specification        | Added nodejs runtime                    | Failed | No effect on type error   |
| Middleware Approach          | Added type validation                   | Failed | Same issue                |
| RouteContext Type            | Custom context interface                | Failed | Invalid second argument   |
| NodeJS Runtime + NextRequest | Combined runtime with NextRequest       | Failed | Same type error           |
| Handler Function Pattern     | Separated business logic                | Failed | ESLint any error          |
| Type Assertion Pattern       | Used 'as unknown as'                    | Failed | Type error remained       |
| Custom Route Context         | Created RouteContext type               | Failed | Not accepted by Next.js   |

This table shows systematic attempts to resolve the issue through various typing approaches and configurations, all resulting in the same core type error with the route handler's second argument.

Running React 18 or React 19 does not seem to affect it. We're using a dependency that still needs React 18 but as mentioned, rolling the react version forward didn't seem to fix either.

# Boilerplate stuff from the Next create

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

### Fixed!

- Removed the second argument from route handler function.
- Extracted the dynamic route parameter id from the request URL.You can use the `request.nextUrl` property to access the URL and extract parameters.

Updated route.ts file:

```
// src/app/api/test/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  // Extract the 'id' from the request URL
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const id = segments[segments.length - 1]; // Assuming 'id' is the last segment

  return NextResponse.json({ id });
}
```
