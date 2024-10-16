# GitHub Search App

## Overview

This is a simple web application built using Next.js, React, TypeScript, and Tailwind CSS. The application allows users to search GitHub for both users and organizations, displaying relevant information such as names, avatars, and repositories. The app features a responsive and user-friendly interface and leverages React Query for efficient API data fetching and state management.

## Features

- Search for GitHub Users and Organizations using the GitHub search API 
- A responsive form with text input for the search query and radio buttons for selecting between users or organizations.
- Search results with basic information such as name, avatar, and a link to view repositories.
- Visual feedback while API requests are in progress.
- A message displayed when no results match the search criteria.
- Persist state of the search is maintained in the URL
- React Query for handling search requests and caching the results.

## Task Requirements

## Fallback Image Handling
During development, an issue was encountered where some GitHub avatar_urls would fail to load, causing errors in the UI. To handle this, a fallback image is used in place of broken avatar_urls. This ensures that even if there are issues with the provided avatar URLs, the application continues to display a default image and maintains its functionality.

## Installation and Running the App

1. Install dependencies and start the development server:

`npm install`
`npm run dev`

2. Open http://localhost:3000 to view it in the browser.