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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Manually deploy on Vercel

As we are in the hobby plan of the vercel, we cannot deploy the project automatically( `auto-deploy` of project ), as this option is disabled for private repository.

### Workaround to Hobby Plan issue of Vercel

We are using `Vercel CLI` to deploy the project to vercel
To deploy, follow the below steps:
1. Install vercel CLI in your local system using:

`npm install -g vercel`

2. Link your frontend project to vercel using:

`vercel link`

Demo:

```
(.venv) aakashmac@Aakashs-MacBook-Air dodofe % vercel
Vercel CLI 44.4.3
? Set up and deploy “~/Dodo/Gitlab/dodofe”? **yes**
? Which scope should contain your project? Dodo club's projects
? Link to existing project? **yes**
? What’s the name of your existing project? **dodo-frontend**

##### DEPLOYMENT STARTS NOW #####
🔗  Linked to dodo-clubs-projects/dodo-frontend (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/dodo-clubs-projects/dodo-frontend/7XkSgrNR3aP9v3KgMqxmLBTHvNgM [9s]
✅  Preview: https://dodo-frontend-qu38w8ifm-dodo-clubs-projects.vercel.app [9s]
```
