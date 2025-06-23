#              EcoWaste~

## Overview
*EcoWaste: Smart Waste Management System*

EcoWaste is a waste management platform that uses technology to identify, manage, and recycle waste automatically. This system helps with:

*User Authentication:*

- Secure user login and sign-up system to ensure authentication.
*Dashboard for Waste Reporting:*

*1] Dashboard for Waste Reporting:*
 Users can report waste through their dashboard and initiate AI-powered analysis.
 
*2] AI-Powered Waste Analysis:* The system analyzes captured or uploaded waste images, identifies the waste type, and provides optimized recycling or reuse solutions.

*3] Large Waste Handling:* If the waste is too large to handle, the system assigns it to a dedicated collection team for proper disposal, ensuring a cleaner environment.

*4] User Rewards & Incentives:* Users who report large waste receive reward points, which can be redeemed for EcoWaste-branded merchandise such as caps, T-shirts, and other exclusive items, encouraging active participation.

*5] Admin & Specialist Dashboard:* Waste management professionals and authorities get a dedicated dashboard where they can access summaries of reported waste, AI-generated insights, and collection request statuses..

# Features
*1. User Authentication*
- Secure Sign-up & Login system to ensure user authentication.

*2. Waste Reporting & Analysis*
- Users can report waste for AI-powered identification and optimized disposal solutions.
- Search & Analyze functionality for understanding waste categories and proper disposal methods.

*3. Educational Resources*
- Access to educational videos about waste management and sustainability.
- Fun Facts section to spread awareness about recycling and environmental conservation.

*4. Community Engagement*
- Community Forum where users can share experiences, tips, and discuss waste management.
- Moderated Community Messages to ensure quality discussions and prevent misinformation.

*5. Recycling Tips*
- Users can explore recycling tips to enhance their knowledge about waste reduction and management.

*6. Admin Panel*
- Manage Videos: Admins can upload, edit, and remove educational videos.
- Manage Recycling Tips: Admins can curate and update recycling tips for users.
- Moderate Community Messages: Ensure a safe and informative space for discussions.
## User Workflow
-  *Landing Page:* Users arrive and can log in or sign up.
-  *Login/Sign Up:* Secure authentication for account creation and access.
 *Dashboard* :
-  Report Waste: Users upload or capture an image for analysis.
-  Waste Analysis & Recycling Tips: Displays waste category, disposal methods, and eco-friendly tips.
-  Community Engagement: Users join forums to discuss waste management, share experiences, and ask questions.
-  Educational Resources: Users access videos on sustainable waste management and fun recycling facts.
-  Admin Panel: Admins manage videos, update recycling tips, and moderate community discussions.
-  User Logout: Users log out securely after their session.



## Installation

### Prerequisites
- Node.js
- MongoDB
- A web browser

### Steps
1. Clone the repository:
   ```bash
    git clone https://github.com/your-username/EcoWaste.git
   
2. Navigate to the project backend directory:
   ```bash
    cd backend
   
3. Install dependencies:
   ```bash
   npm install
   
4. Set up the database:
   - Start MongoDB.
   - Configure the database connection in the .env file.

5. Run the application:
   ```bash
   npm run server
   
6. Access the application backend at http://localhost:4000.

7. Navigate to the project frontend directory:
   ```bash
   cd frontend
   
8. Install dependencies:
   ```bash
   npm install
   
9. Configure the backend URL and Geminia API in the .env file.

10. Run the application:
   ```bash
   npm run dev
   ```

11. Access the application frontend at http://localhost:5173.

## Technology Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- AI Integration: Gemini API

## Project Structure
```
EcoWaste
├── backend
│  ├── config
│  │  ├── cloudinary.js
│  │  └── mongodb.js
│  │
│  ├── controllers
│  │  ├── adminController.js
│  │  ├── contactController.js
│  │  └── userController.js
│  │
│  ├── middlewares
│  │  ├── authAdmin.js
│  │  └── authUser.js
│  │
│  ├── models
│  │  ├── contactModel.js
│  │  ├── funFactModel.js
│  │  ├── reportModel.js
│  │  ├── tipModel.js
│  │  ├── userModel.js
│  │  └── videoModel.js
│  │  
│  ├── routes
│  │  ├── adminRoute.js
│  │  ├── contactRoute.js
│  │  └── userRoute.js
│  │
│  ├── server.js
│  └── .env
│
├── frontend
│  ├── public
│  │  └── eco-energy.svg
│  │
│  ├── src
│  │  ├── admin
│  │  │  ├── AdminContacts.jsx
│  │  │  ├── AdminDashboard.jsx
│  │  │  ├── AdminOverview.jsx
│  │  │  ├── ManageEducationalVideos.jsx
│  │  │  ├── ManageFunFacts.jsx
│  │  │  └── ManageRecyclingTips.jsx
│  │  │
│  │  ├── components
│  │  │   ├── sections
│  │  │   │    ├── CTA.jsx
│  │  │   │    ├── Features.jsx
│  │  │   │    ├── Footer.jsx
│  │  │   │    ├── Hero.jsx
│  │  │   │    ├── Impact.jsx
│  │  │   │    ├── Navbar.jsx
│  │  │   │    └── Process.jsx
│  │  │   │
│  │  │   └── ui
│  │  │      ├── FeatureCard.jsx
│  │  │      ├── ImpactStat.jsx
│  │  │      └── ProcessStep.jsx
│  │  │ 
│  │  ├── context
│  │  │  └── AppContext.jsx
│  │  │
│  │  ├── pages
│  │  │  ├── Home.jsx
│  │  │  └── Login.jsx
│  │  │
│  │  ├── user
│  │  │  ├── CommunityEngagement.jsx
│  │  │  ├── EducationalVideos.jsx
│  │  │  ├── FunFacts.jsx
│  │  │  ├── ImageSearchSection.jsx
│  │  │  ├── RecyclingTips.jsx 
│  │  │  ├── ReportWaste.jsx
│  │  │  └── UserDashboard.jsx
│  │  │
│  │  ├── App.jsx
│  │  ├── index.css
│  │  └── main.jsx
│  │
│  ├── .env
│  └── index.html
│
└── README.md
```

## Features in Detail

*1. Landing Page*

Provides options to log in or sign up for a personalized experience.

*2. Login or Sign Up.*

- Allows new users to create an account.
- Enables existing users to log in and access their dashboard.
- Implements password encryption for security.

*3. Dashboard (Home Screen)*

  Displays an interactive interface where users can:-
- Report waste for analysis.
- Explore educational resources on waste management.
- Engage in community discussions to learn and share insights.
- Provides quick access to all platform functionalities.

*4. Report Waste*
- Users can capture waste images using their device camera.
- Option to upload images directly from their computer.
- The system processes the image and redirects users to the Waste Analysis page for detailed insights.

*5. Waste Analysis & Recycling Tips :*

   AI-powered waste analysis provides details on:
- Waste category (e.g., plastic, organic, electronic waste).
- Disposal methods for proper waste management.
- Environmental impact of the waste item.
- Users can explore Recycling Tips to learn how to reduce waste and adopt eco-friendly habits.

*6. Community Engagement :*  

   Users can participate in community forums to:
- Discuss waste management strategies.
- Share experiences and recycling techniques.
- Ask questions and get advice from other users.
- Moderators ensure that discussions remain informative and relevant.

*7. Educational Resources*
- Provides access to educational videos on sustainability and waste management.
- A Fun Facts section shares engaging and informative insights about recycling and environmental conservation.

*8. Admin Panel (For Admin Users)*
- Manage Videos: Admins can upload, edit, or delete educational content.
- Manage Recycling Tips: Admins can update and modify recycling guidance to keep information up to date.
- Moderate Community Messages: Admins ensure that community discussions align with platform guidelines and maintain quality interactions.

*9. User Logout*
- Users can log out securely after completing their session.

- Ensures data privacy and security.


---

## Contact
For any queries or support, please contact us at support@ecowaste.com