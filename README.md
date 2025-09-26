# Jam Jar - Frontend
## Overview
Jam Jar is a full-stack web application that helps musicians track practice sessions, record audio, set goals, and visualize progress through an analytics dashboard.

The frontend demonstrates modern architecture, performance optimization, UI/UX design, authentication flows, API integration, and third-party services (Stripe, NextAuth, analytics, email).

Check out the [Django Rest Framework backend](https://github.com/danmolloy/jam-jar-backend).

## Features
### User Experience
* Practice Tracking: Log sessions with metadata (duration, instrument, tags, notes).
* Audio Recording & Playback: Record practice sessions directly in the app.
* Analytics Dashboard: Charts, heatmaps, and streak tracking for actionable insights.
* Responsive & Accessible UI: Mobile-first, dark/light themes, smooth transitions, and WCAG-conscious design.
* Interactive Feedback: Loading states and error handling.

### Technical Highlights
* Authentication Flow: NextAuth.js with JWT tokens, email verification, and password reset.
* Subscription Management: Stripe integration for premium features.
* RESTful API Integration: Strongly typed requests/responses with TypeScript and Axios queries.
* Error Monitoring: Sentry integration for real-time error tracking.

## Technologies
* Framework & Language: Next.js 15, TypeScript
* Styling: Tailwind CSS, Google Font integration
* Authentication: NextAuth.js integrated with Django backend
* Forms & Email: Formik, Yup, AWS SES
* Charts & Data: Recharts
* Payments: Stripe
* Analytics & Monitoring: Vercel Analytics, Google Analytics, Sentry
* HTTP Client: Axios
* Code Quality: ESLint, Prettier, Github Actions

## Under Development
* Dashboard interactivity 
* Accessibility
* Test coverage (Jest, Playwright)
* CI/CD pipelines

## License
Please respect the intellectual property and don't use this code for commercial purposes without permission.

## Credits
Designed and developed by Daniel Molloy.