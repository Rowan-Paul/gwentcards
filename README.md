# GWENTcards - Witcher 3 Card Tracker

A modern web application to help you track your Gwent card collection from The Witcher 3: Wild Hunt. Keep track of which cards you've collected, where to find missing ones, and manage your complete Gwent collection across all expansions.

## 🎴 Features

- **Complete Card Database**: All Gwent cards from The Witcher 3, including Hearts of Stone and Blood and Wine expansions
- **Collection Tracking**: Mark cards as collected and track your progress
- **Advanced Filtering**: Filter by faction, location, abilities, and more
- **Search Functionality**: Quickly find specific cards by name
- **Location Information**: Detailed information about where to find each card
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **PWA Support**: Install as a progressive web app for offline access
- **Dark/Light Theme**: Toggle between themes for comfortable viewing

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom components
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rowan-Paul/gwentcards.git
cd gwentcards
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Installation

GWENTcards can be installed as a Progressive Web App:

1. Visit the application in your browser
2. Look for the "Install" prompt or use your browser's install option
3. The app will be available on your home screen/desktop

## 🎮 Card Data

The application includes comprehensive data for all Gwent cards:

- **Factions**: Scoia'tael, Monsters, Nilfgaard, Northern Realms, Neutral, Skellige
- **Card Types**: Unit cards, Special cards, Leader cards
- **Abilities**: Hero, Medic, Morale boost, Muster, Spy, Tight bond
- **Locations**: Detailed information about where to obtain each card
- **Expansions**: Base game, Hearts of Stone, Blood and Wine

## 🗂️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── images/           # Card images
│   └── *.json           # Card data files
├── styles/               # Additional styles
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎯 Features in Detail

### Card Collection

- Mark cards as collected with a simple click
- Visual indicators for collected/uncollected cards
- Progress tracking across all factions

### Filtering & Search

- Filter by faction (Scoia'tael, Monsters, etc.)
- Filter by location type
- Filter by card abilities
- Search by card name
- Filter by expansion (base game, DLCs)

### Location Information

- Detailed location data for each card
- Information about NPCs, territories, and specific locations
- Notes about acquisition methods

### Responsive Design

- Mobile-first approach
- Touch-friendly interface
- Optimized for various screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
