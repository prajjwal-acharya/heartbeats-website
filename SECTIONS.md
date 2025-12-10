# Project Sections and Functions

This document outlines the structure of the **HeartBeats** application, explaining the purpose of each page, component, and feature.

## Pages (Route Structure)

The application uses `react-router-dom` for navigation between these main views:

*   **Home (`/`)**: The main landing page. It serves as the primary experience, showcasing the band's identity, music, members, and tour dates in a single scrolling feed.
*   **Schedule (`/schedule`)**: A dedicated page for upcoming tour dates, venue details, and ticket links.
*   **Management (`/management`)**: A restricted or informational area for band management, press kits, or contact info (Staff Access).
*   **Join (`/join`)**: A community or recruitment page where fans or musicians can apply to join the "tribe" or newsletter.
*   **Merch (`/merch`)**: The official store for band merchandise.

## Home Page Sections

The Home page is composed of several stacked components, designed to be revealed as the user scrolls:

1.  **Hero (`Hero.tsx`)**:
    *   **Function**: The first impression. Features an interactive 3D background (`ThreeHero`) and the main brand title "HeartBeats".
    *   **Interactvity**: Users can see "The Fusion Era" intro and "Join The Tribe" call-to-actions.
    *   **ThreeHero**: The background component containing the **Particle Visualizer**. It reacts to mouse movement, creating a fluid, futuristic effect representing "fusion".

2.  **Best Performances (`BestPerformances.tsx`)**:
    *   **Function**: A video showcase section highlights past live shows to build social proof and excitement.

3.  **Music Section (`MusicSection.tsx`)**:
    *   **Function**: An embedded audio player or playlist allowing users to listen to the band's tracks directly on the site.

4.  **Members (`Members.tsx`)**:
    *   **Function**: Profiles of the band members. Likely includes photos, names, and their roles/instruments (e.g., Sitar, Synth, Drums).

5.  **Ghostwriter (`Ghostwriter.tsx`)**:
    *   **Function**: An AI-powered feature (using Gemini API) that generates fusion lyrics or poetry based on user input (mood/genre). It demonstrates the "tech" side of the band's fusion identity.

6.  **Join CTA**:
    *   **Function**: A final call-to-action at the bottom prompting users to "Apply for Audition".

## Global Components

These components appear across multiple pages or handle application-wide logic:

*   **Navbar (`Navbar.tsx`)**:
    *   **Function**: Top navigation bar. It is transparent at the top and becomes solid/blurred when scrolling. Contains links to all pages and a mobile hamburger menu.
*   **Preloader (`Preloader.tsx`)**:
    *   **Function**: A full-screen loading animation that plays when the app first starts, giving time for assets (and 3D scenes) to initialize.
*   **Footer**:
    *   **Function**: Standard footer with copyright info, social media links, and secondary navigation.

## Technical Features

*   **Particle Visualizer**: A custom Three.js/React Three Fiber system (`ThreeHero.tsx`) that renders thousands of interactive particles.
*   **AI Integration**: The `services/geminiService.ts` handles communication with Google's Gemini API for the Ghostwriter feature.
*   **Scroll Animations**: The app uses `IntersectionObserver` to trigger "reveal" animations (`.reveal-text`, `.reveal-stagger`) as elements enter the viewport.
