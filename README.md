# 🌌 create-universal-app (CUA)

### Video Demo
https://user-images.githubusercontent.com/36214945/211167187-347b87ce-1c03-4678-9904-542aa78ab131.mp4


## 🌌 What is this?
**create-universal-app (CUA)** is an opinionated template for creating fullstack universal (mobile + web codeshare) apps with built in auth for both mobile and web using **Expo** (mobile), **Nextjs** (web), **tRPC**, **Prisma**, **Tamagui** (ui/styling), and **Clerk** (mobile + web auth).



[Here's](https://youtu.be/aTEv0-ZBbWk) a 20 minute Youtube tutorial going over everything if that's more of your style!

Live Demo: https://cua-demo.vercel.app/

If you have any question while using this, feel free to join our [👾👾Discord👾👾](https://discord.gg/5HvtckjyYb), we are all pretty active in there!

`npx create-t3-universal-app` - you can also run this to start your project!([by albbus](https://github.com/albbus-stack/create-t3-universal-app))

**This repo is made on top of**

- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) (expo, next, trpc, prisma, nextauth - all in one, but no UI code share, no mobile auth)
- [t3-turbo-and-clerk](https://github.com/clerkinc/t3-turbo-and-clerk) (t3 turbo, but with auth for mobile + web, still no code share for UI)
- [tamagui + solito starter](https://github.com/tamagui/tamagui/tree/master/starters/next-expo-solito) (expo + next code share, but no tRPC, no built in auth)

## 🌟 How it works
### Folder Structure
- apps
  - next
  - expo
- packages
  - ui (your reusable components/tamagui)
  - db (db schema, prisma stuff)
  - app
    - features (basically all of your frontend code in React Native will go here ⭐️⭐️⭐️) 
    - navigation (unifying web + mobile nav)
    - provider (unifying providers)
    - utils (your utils ie. auth/trpc)
  - api (all of your tRPC/backend code)

### In a bit more detail
- Your **frontend** code will be coded in React Native, meaning that you're going to write Views instead of divs. (Note: since we are using Tamagui, we're gonna write Stacks instead Views)
  - apps/expo and apps/next are practically empty folders that are simply _referencing_ your packages/app folder.
  - If you're familiar with React Native, it's going to feel as if you're writing a React Native app, that just happens to also run really well on the web (with SSR and all of those goodies).
  - Your code will get rendered as HTML/CSS on the NextJS side and normal React Native on the Native side.
- Your **backend** code is gonna be in "packages/api". This code is actually gonna get ran by NextJS in a serverless environment. If you're a little confused about how that works, [here's](https://www.youtube.com/watch?v=2cB5Fh46Vi4&t=1017s) a good video by Theo that talks about NextJS as a backend framework.
- Your backend and frontend will communicate with tRPC.
- Your backend and your DB will communicate with Prisma (ORM).
- Mobile auth is done with Clerk Expo, and web auth is done with Clerk React and Clerk Next.

_Note: you don't need to understanding how everything works in detail before you can start using something like this. As someone that wants to know how every bolt and nut works, I often get "blocked" by my own perfectionism, so I'm just throwing this out there in case you're feeling the same about something._

## 💭 Behind the decisions

**Why Tamagui for style/ui?**

- what is Tamagui? -> TLDR: it's for making things look pretty on both web and mobile while being really really fast and easy to work with.
- In a bit more detail, Tamagui has 3 things.
  - **1. Compiler**: Their unique way of turning your "style related code" into pure CSS faster. Most important thing here is probably this tree flattening thing they do.
  - **2: Core**: A small set of components they built aimed to replace View and Text that you one uses in RN, with some advantages.
  - **3. UI** A set of UI components that the tama team built using Core.
  > If you want a bit more detail, either visit their website or join their Discord channel or ask ChatGPT (I admit it's not the simplest thing out there)
- why not Nativewind/Tailwind?
  - What I like about Tamagui is that it's simultaneously Tailwind and DaisyUI that's built from the ground up designed for universal apps with its own compiler and core components.
  - Feel free to use Nativewind/Tailwind instead of Tamagui! You should be able to set things up there fairly easily.

**Why Clerk for auth?**
- On a high level, clerk promises an overall user management solution instead of just authentication with things like User Profile, Banning, Device management and stuff all built in. But in practice, I've just personally had an great time using Clerk for Expo compared to Firebase/Supabase auth for my projects.
- practical things I like about Clerk:
  - Really nice hooks/components (SignedIn/SignedOut) that work for both Expo and NextJs
  - SDKs for all 3 sides: Expo frontend, NextJs frontend, NextJs serverside
  - Fantastic support/help from their team (personal experience)
- downside:
  - doesn't do SMS unless you pay: big negative for mobile, but imo makes up for it with easy oauth.
  - premium plan is also expensive compared to the alternatives
  - double edged sword of being a start up


**Which DB?**
- I recommend either spin up a postgres instance on Railway or use Supabase, doesn't matter too much IMO.


## 🔨 How to use this? Step by step tutorial.
### 1. Set up project
- `yarn` install packages and build the project
- set up your environment variables properly by duplicating the `.env.example` file, removing `.example`, and entering your environment variables.
  - Clerk API: sign up clerk
  - <s>DATABASE_URL: spin up a postgres instance with Railway or Supabase(we're using SQLlite by default now, so you don't have to do this unless you're ready to go prod!)</s> 
- you'll also need to manually enter your clerk frontend api into /packages/app/provider/auth/index.tsx
- `yarn db-push` push our schema to our DB


### 2. Start up your project!
- `yarn web` for web dev
- `yarn native` to run on iOS or Android(PS: for this to work, you'll need your web app running on 3000. Your nextjs app is also your backend!)
- `yarn studio` to start up your prisma studio
PS: the tRPC query will show nothing unless you manually open up Prisma and add a "post", or query an user info in the db!

### 3. Adding a new screen!
- Put your screens in `packages/app/features`
- For smaller components, feel free to put them in `/packages/ui`
- For new routes, add them in `/packages/api/src/router`, and make sure you merge them in `index.ts`
- When you add a new page or screen, you'll need to add the page into both Expo and Next by
  - Expo
    - Go to `packages/app/navigation/native/index.tsx` and add the page in there following the example
    - Go to `packages/app/provider/navigation/index.tsx` and add the page in there following the example
  - Next
    - Go to `apps/next/pages`, create the folder with the name being your route, and an `index.tsx` that's importing your element from `/app/feature/home`

## Deploying the web app to Vercel
After you create a new project, and link it with your github repo, you'll have to
- <s> Override the default install command with `yarn set version stable && yarn install`(not shown in the photo, but do this as well) no need, added Vercel config file</s>
- <s> Override the default build command with `cd ../.. && yarn run build --filter=nextjs...` no need, added Vercel config file</s>
- Enter your environment variables
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `DATABASE_URL`
  - `CLERK_SECRET_KEY`


Photo reference 👇👇

<img width="704" alt="Screenshot 2023-01-14 at 12 06 17 AM" src="https://user-images.githubusercontent.com/36214945/212462681-f6cc448b-d24b-4541-a350-290a6985ad85.png">
(ignore the install command one now)
