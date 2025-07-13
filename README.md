# Blog Summariser - Web Scraping & AI Summarization Project

A modern web application that scrapes content from websites, generates AI-powered summaries, provides Urdu translations, and stores data in both MongoDB and Supabase databases.

## 🌐 Live Demo

**Deployed Application:** [https://nexium-zayyan-assignment2.vercel.app/](https://nexium-zayyan-assignment2.vercel.app/)

## 📸 Screenshots

### Main Application Interface
![Main Application - Part 1](internship/p1.png)
![Main Application - Part 2](internship/p2.png)

### URL Input and Processing
![URL Input and Processing](internship/p3.png)

### Database Dashboard
![Database Dashboard - Part 1](internship/p4.png)
![Database Dashboard - Part 2](internship/p5.png)

## 🚀 Features

### Core Functionality
- **Web Scraping**: Dynamic content extraction from permitted websites
- **AI Summarization**: Intelligent content summarization (using predefined responses for ethical considerations)
- **Urdu Translation**: Multi-language support with Urdu translations
- **Dual Database Storage**: MongoDB for full text, Supabase for summaries
- **Real-time Dashboard**: Live database monitoring and statistics
- **Rate Limiting**: Built-in protection against abuse (5 requests per minute per user)

### Technical Features
- **Modern UI/UX**: Beautiful gradient design with glassmorphism effects
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Instant feedback and loading states
- **Error Handling**: Comprehensive error management and user feedback
- **Security**: Environment variable protection and input validation

## 🏗️ Architecture

### Project Structure
```
internship/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dashboard/
│   │   │   │   ├── mongodb/route.ts      # MongoDB data retrieval
│   │   │   │   └── supabase/route.ts     # Supabase data retrieval
│   │   │   └── scrape/route.ts           # Web scraping API
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Database dashboard
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Main application
│   ├── components/
│   │   └── ui/                           # Reusable UI components
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── lib/
│       ├── data.ts                       # Predefined data and configurations
│       ├── mongodb.ts                    # MongoDB connection
│       ├── supabase.ts                   # Supabase connection
│       └── utils.ts                      # Utility functions
├── styles/
│   └── globals.css                       # Global styles
├── package.json                          # Dependencies and scripts
├── next.config.ts                        # Next.js configuration
└── tsconfig.json                         # TypeScript configuration
```

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Glassmorphism design, Custom animations
- **Backend**: Next.js API Routes, Serverless functions
- **Databases**: 
  - MongoDB Atlas - Full text storage with indexing
  - Supabase - Summary storage with real-time capabilities
- **Web Scraping**: Cheerio.js with content extraction algorithms
- **Deployment**: Vercel with edge functions
- **Development**: Turbopack, ESLint, TypeScript strict mode

### Data Flow Diagram
```
User Input URL → API Route → Web Scraping → Content Processing
                                    ↓
                            MongoDB (Full Text)
                                    ↓
                            Supabase (Summary)
                                    ↓
                            Dashboard Display
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB Atlas account
- Supabase account

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd internship
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Copy the `.env.local` template above
   - Add your actual database credentials

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Create a database named `fulltext`
3. Create a collection named `fulltext`
4. Add your connection string to environment variables

### Supabase Setup
1. Create a new Supabase project
2. Create a table named `Summary` with columns:
   - `id` (int8, primary key, auto-increment)
   - `url` (text)
   - `summary` (text)
   - `time` (timestamptz)
3. Add your project URL and anon key to environment variables

## 🎯 Usage Guide

### 🚀 Getting Started
1. **Visit the Application**: Navigate to the live demo or run locally
2. **Enter Website URL**: Choose from the permitted websites list
3. **Initiate Scraping**: Click "🚀 Scrape & Summarize" button
4. **View Results**: Examine the generated summary and Urdu translation
5. **Check Dashboard**: Monitor stored data in the database dashboard

### 📋 Step-by-Step Process

#### Web Scraping Workflow
1. **URL Validation**: System checks if the URL is in the permitted list
2. **Content Extraction**: Cheerio.js extracts clean, structured content
3. **Text Processing**: Removes ads, navigation, and unnecessary elements
4. **Summary Generation**: AI-powered summarization (predefined for ethics)
5. **Translation**: Urdu translation using JS dictionary
6. **Data Storage**: Automatic storage in MongoDB and Supabase
7. **User Feedback**: Real-time progress indicators and results display

#### Dashboard Features
- **📊 Real-time Statistics**: Live database metrics and counts
- **🔍 Content Viewer**: Expandable full-text content display
- **📈 Performance Metrics**: Character counts and storage information
- **🔄 Auto-refresh**: Latest data always available
- **📱 Responsive Design**: Works on all device sizes

### 🌐 Permitted Websites
For ethical considerations, scraping is limited to these approved domains:
- `https://nexium-zayyan-assignment2.vercel.app/` - Main project site
- `https://nexium-zayyan-assignment1.vercel.app/` - Previous assignment
- `https://quotes.toscrape.com/` - Public quotes collection

## 🔒 Security & Ethics

### 🤝 Ethical Considerations
- **Limited Scraping**: Only 3 predefined websites allowed for responsible data collection
- **Data Minimization**: Only necessary data is collected and stored

### 📋 Compliance
- **Educational Purpose**: Demonstrates ethical web scraping practices

### 📦 Vercel Deployment
1. **Repository Connection**: Connect your GitHub repository to Vercel
2. **Environment Setup**: Add all required environment variables in Vercel dashboard
3. **Automatic Deployment**: Deploy automatically on push to main branch
4. **Custom Domain**: Optional custom domain configuration
5. **SSL Certificate**: Automatic HTTPS enforcement

### 🔧 Environment Variables for Production
Ensure all environment variables are set in your deployment platform:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fulltext?retryWrites=true&w=majority

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 🔄 CI/CD Pipeline
- **GitHub Integration**: Automatic deployment on code changes
- **Preview Deployments**: Test changes before production
- **Rollback Capability**: Quick rollback to previous versions
- **Environment Management**: Separate staging and production environments

## 🛠️ Development Guide

### 🚀 Available Scripts
```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production with optimization
pnpm start        # Start production server
pnpm lint         # Run ESLint for code quality
pnpm type-check   # Run TypeScript type checking
```

### 📁 Code Structure & Architecture
```
src/
├── app/                          # Next.js 13+ App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── dashboard/            # Dashboard API endpoints
│   │   │   ├── mongodb/          # MongoDB data retrieval
│   │   │   └── supabase/         # Supabase data retrieval
│   │   └── scrape/               # Web scraping API
│   ├── dashboard/                # Dashboard page
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main application page
├── components/                   # Reusable UI components
│   └── ui/                       # Shadcn/ui components
│       ├── alert.tsx             # Alert component
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card component
│       └── input.tsx             # Input component
└── lib/                          # Utility libraries
    ├── data.ts                   # Predefined data & configurations
    ├── mongodb.ts                # MongoDB connection setup
    ├── supabase.ts               # Supabase client setup
    └── utils.ts                  # Utility functions
```

### 🔧 Development Best Practices
- **TypeScript**: Strict type checking for better code quality
- **ESLint**: Code linting and style enforcement
- **Component Architecture**: Reusable and modular components
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations
- **Form Validation**: Client-side and server-side validation

## 🤝 Contributing

This project was developed as part of the **Nexium Internship Assignment**. I am happy to accept contributions and improvements!

### How to Contribute
1. **Fork the repository** to your GitHub account
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** with proper commit messages
4. **Add tests** if applicable to maintain code quality
5. **Submit a pull request** with detailed description

### Contribution Guidelines
- Follow the existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Ensure all tests pass before submitting
- Use conventional commit messages

### Code of Conduct
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

## 📝 License & Legal

### 📄 License
This project is created for **educational and demonstration purposes** as part of the Nexium Internship Assignment.

### 🔒 Terms of Use
- **Educational Purpose**: This project is designed for learning and demonstration
- **Ethical Usage**: All web scraping follows ethical guidelines
- **No Commercial Use**: Not intended for commercial applications
- **Attribution**: Please credit the original author when using this code

---

**Note**: This project demonstrates modern web development practices with ethical data collection. The AI summaries and translations are predefined for demonstration purposes, ensuring responsible use of web scraping technology. Create by Zayyan, during the Nexium Internship Program. 
