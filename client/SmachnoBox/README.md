# SmachnoBox Coursework

## Project Overview

SmachnoBox is an online healthy food subscription service with delivery. This coursework project will demonstrate:
- a React + Vite frontend
- a backend API structure for products, subscriptions, and orders
- a subscription ordering workflow
- a delivery tracking concept

## Coursework Goals

1. Define the problem: busy customers need healthy meals delivered
2. Show how users browse plans, subscribe, and place orders
3. Present a simple frontend/backend architecture
4. Explain how the app would scale with more features

## Proposed Features

- Product / meal plan catalog
- Subscription selection and ordering
- Delivery scheduling concept
- Order/subscription overview page
- Simple UI components for SmachnoBox branding

## Technical Architecture

- Frontend: React, Vite, component-based design
- Backend: server folder with routes, controllers, models
- Data model ideas: user, product, subscription, order, delivery
- Connection: fetch/axios from React to backend endpoints

## Implementation Plan

1. Build homepage UI in `src/components/`
   - `Header.jsx` for branding
   - `Main.jsx` for subscription cards
   - `Footer.jsx` for app info
2. Replace sample data in `src/data.js` with meal plans
3. Add product/subscription components and UI state
4. Create backend API routes under `server/routes/`
5. Connect frontend to backend for product and order data

## Coursework Report Outline

1. Introduction
   - Purpose of SmachnoBox
   - Why healthy food subscriptions are useful
2. System design
   - Frontend and backend roles
   - Data model and routes
3. Implementation details
   - Components built in React
   - Backend controllers and API endpoints
4. Testing and validation
   - How to run the app
   - How to verify core features
5. Future improvements
   - authentication
   - payment integration
   - delivery calendar

## How to Start

- Use this repository as the starting point
- Replace the placeholder list in `Main.jsx` with meal plan cards
- Add sample plans to `src/data.js`
- Build a simple order page and connect it to the backend

> Tip: when writing your coursework, describe the structure you have in code and illustrate it with short screenshots or component diagrams.
