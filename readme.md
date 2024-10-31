# Car Booking App

A **car booking application** built with **Next.js**, **Express.js**, **MongoDB**, and **AWS S3**. This application allows users to log in, add vehicle details, upload vehicle images, and view a list of added vehicles. The images are stored in AWS S3, and user authentication is handled using JWT.

## Deployment
The application is deployed on vercel using GitHub Action for CI/CD and can be accessed at [https://car-booking-app-fe.vercel.app/](https://car-booking-app-fe.vercel.app/)


## Getting Started

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** Atlas account or local MongoDB installation
- **AWS S3** bucket for image storage

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jamshaidkhalid/car-booking-app.git
   cd car-booking-app
   ```
2. Install packages for both server and client
   ```bash
   cd car-booking-app
   npm install
   npm run dev
   cd car-booking-app
   npm install
   npm run start
   ```

## Environment Variables
### Server `(server/.env)`
Configure the following environment variables in `server/.env`:
`
#### MongoDB connection
`MONGO_URI`
#### JWT Secret for user authentication
`JWT_SECRET`
#### AWS S3 configuration
`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS_KEY`
`AWS_BUCKET_NAME`
`AWS_REGION`


### Client `(car-booking-app/.env.local)`
#### Backend API base URL
`NEXT_PUBLIC_API_BASE_URL`