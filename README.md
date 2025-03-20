# Meet and Eat

A web application that allows users to connect with people around the world through an interactive map interface.

## Features

- User authentication (registration and login)
- Interactive world map with user markers
- Filter users by distance and languages
- Profile management
- Real-time updates using Supabase

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Technologies

- React.js
- Material-UI
- Leaflet.js
- Supabase
- TypeScript

## Development

This project follows a component-based architecture with React hooks and contexts for state management. The map functionality is built using Leaflet.js, and user data is stored in Supabase.

## Deployment

The application can be deployed to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with `vercel --prod`

## License

MIT
