<div align="center">

<img src="web/src/assets/logo.svg" width="160" alt="habits logo" />

# habits

**Habit tracker with a web app, a mobile app and a shared API, built during Rocketseat's NLW Setup.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

</div>

**English** · [Português](README.pt-BR.md)

> [!NOTE]
> Built during [Rocketseat](https://www.rocketseat.com.br/)'s **Next Level Week #11 (NLW Setup)**, held January 16–22, 2023, following the event's classes. The UI is in Portuguese.

![Web app main screen](web/src/assets/main-screen.png)

---

## About

You create habits, pick which days of the week each one should happen on, and check them off day by day. The home screen shows every day since the start of the year as a grid of squares, and each square gets brighter as you complete more of that day's habits, much like GitHub's contribution graph.

The same API serves two clients: a web app built with React and a mobile app built with React Native.

## Features

- **New habit:** title plus the days of the week it repeats on.
- **Yearly summary:** a grid of every day since January 1st, colored by the percentage of habits completed.
- **Day details:** clicking a day (popover on web, separate screen on mobile) lists that day's habits, with a progress bar and checkboxes.
- **Only today can be changed:** the API only toggles habits for the current day, and the web app locks the checkboxes on past days.

<table>
<tr>
<td><img src="web/src/assets/add-habit.png" alt="New habit modal" /></td>
<td width="35%"><img src="web/src/assets/mobile-screen.png" alt="Mobile app" /></td>
</tr>
</table>

## Technical highlights

- **Summary in a single query:** the `/summary` route uses raw SQL (`$queryRaw`) with subqueries to compute, for each day, how many habits were possible and how many were completed, instead of loading everything and counting in JavaScript.
- **Relational modeling:** habits, days, completions (a `day_habits` pivot table) and repeat days (`habit_week_days`), with unique constraints to prevent duplicates. The diagram is generated automatically by `prisma-erd-generator` ([`server/prisma/ERD.svg`](server/prisma/ERD.svg)).
- **Validation with Zod** on every API input.
- **Shared visual identity between web and mobile:** Tailwind on web and NativeWind (Tailwind for React Native) on mobile.
- **Accessible components** on web with Radix UI (Dialog, Popover and Checkbox).

## Stack

| Layer | Technologies |
|---|---|
| API | Node.js, Fastify, Prisma, SQLite, Zod, Day.js |
| Web | React, Vite, Tailwind CSS, Radix UI, Axios |
| Mobile | React Native, Expo, NativeWind, React Navigation |

## Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/habits` | Creates a habit with its days of the week |
| `GET` | `/day?date=` | Habits possible and completed on a given day |
| `PATCH` | `/habits/:id/toggle` | Checks or unchecks a habit for today |
| `GET` | `/summary` | Completion percentage for every day with a record |

## Running locally

Requirements: Node.js 18+. For the mobile app, the Expo Go app on your phone.

```bash
git clone https://github.com/giobroliatto/habits.git
cd habits

# API (http://localhost:3333)
cd server
npm install
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma migrate dev
npm run dev

# Web (in another terminal)
cd web
npm install
npm run dev

# Mobile (in another terminal)
cd mobile
npm install
npx expo start
```

> On mobile, change `baseURL` in [`mobile/src/lib/axios.ts`](mobile/src/lib/axios.ts) to your machine's IP on the local network.

## Structure

```
server/   # Fastify API + Prisma (schema, migrations, seed and ERD)
web/      # React app with Vite
mobile/   # React Native app with Expo
```

---

## Author

Made by **Giovani Broliatto** during NLW Setup, with classes from [Rocketseat](https://www.rocketseat.com.br/).

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
