# Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js 16, TypeScript, and Tailwind CSS. Features real-time data visualization, dark mode support, and an intuitive user interface for tracking key business metrics.

## Features

- **Real-time Analytics**: Track revenue, users, orders, and conversion rates with live updates
- **Interactive Charts**: 
  - Revenue trends with line charts
  - Order analytics with bar charts
  - User distribution with pie charts
  - Traffic source visualization
- **Dark Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **State Management**: Redux Toolkit for efficient data handling
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean interface with Tailwind CSS and custom components

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Fonts**: Geist Sans & Geist Mono

## Installation

1. Clone the repository:
```bash
git clone https://github.com/eistiakahmed/analytics_dashboard.git
cd analytics_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory (optional):
```env
NEXT_PUBLIC_API_URL=/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clear-cache` - Clear Next.js cache
- `npm run dev:fresh` - Clear cache and start dev server

## Dashboard Features

### KPI Cards
- Total Revenue with trend indicators
- Active Users count
- Order statistics
- Conversion rate metrics

### Visualizations
- **Revenue Line Chart**: Monthly revenue trends
- **Orders Bar Chart**: Order volume analysis
- **Users Pie Chart**: User distribution by tier (Free, Premium, Enterprise)
- **Traffic Sources**: Visitor breakdown by channel

### UI Components
- Collapsible sidebar navigation
- Theme toggle (Light/Dark mode)
- Loading skeletons for better UX
- Toast notifications
- Responsive header

## Project Structure

```
analytics_dashboard/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── components/       # React components
│   │   │   └── charts/       # Chart components
│   │   ├── dashboard/        # Dashboard page
│   │   └── globals.css       # Global styles
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   └── utils.ts         # Utility functions
│   ├── mock/
│   │   └── db.json          # Mock data
│   └── store/               # Redux store
├── public/                  # Static assets
└── package.json
```

## Customization

### Theme
The dashboard supports light and dark modes. Theme preference is stored in localStorage and persists across sessions.

### Data Source
Currently uses mock data from `src/mock/db.json`. To connect to a real API, update the `NEXT_PUBLIC_API_URL` environment variable.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://analytics-dashboard-adminui.vercel.app/)
3. Deploy with one click

### Other Platforms
```bash
npm run build
npm start
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Developer

**Eistiak Ahmed**

-  Email: [eistiakahmedmeraj@gmail.com](mailto:eistiakahmedmeraj@gmail.com)
-  Phone: +8801560064883
-  Portfolio: [https://eistiakahmed.netlify.app/](https://eistiakahmed.netlify.app/)
-  LinkedIn: [linkedin.com/in/eistiak-ahmed](https://www.linkedin.com/in/eistiak-ahmed/)
- GitHub: [github.com/eistiakahmed](https://github.com/eistiakahmed)

## License

This project is private and proprietary.

## Contributing

This is a personal project. For suggestions or issues, please contact the developer directly.

---

Built with ❤️ by Eistiak Ahmed
