# Epoch Time Converter

A modern web application for converting between epoch timestamps and human-readable dates across multiple timezones. Built with Next.js and deployed on Vercel.

## Features

- ✨ **Epoch to Time Conversion**: Convert epoch timestamps to any timezone
- 🌍 **Multiple Timezone Support**: Work with 400+ timezones worldwide
- ⏱️ **Time to Epoch Conversion**: Convert human-readable dates to epoch timestamps
- 📋 **Copy to Clipboard**: Easy copying of results
- ⚡ **Real-time Conversion**: Instant results with client-side processing
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: TypeScript
- **Date Handling**: [date-fns](https://date-fns.org/) & [date-fns-tz](https://github.com/marnusw/date-fns-tz)
- **Styling**: CSS Modules
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jijwang/myweb.git
cd myweb
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Usage

### Epoch to Time Conversion

1. Select the "Epoch → Time" tab
2. Enter an epoch timestamp (in seconds) - use the "Now" button for current time
3. Select which timezones you want to display
4. Click "Convert"
5. View results and copy values with the clipboard button

### Time to Epoch Conversion

1. Select the "Time → Epoch" tab
2. Choose your date and time using the date/time picker
3. Select the timezone your input is in
4. Click "Convert"
5. Get the epoch timestamp and UTC/local time equivalents

## Deployment on Vercel

### One-Click Deploy

Click the button below to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjijwang%2Fmyweb)

### Manual Deployment

1. Push your code to GitHub (or another Git provider)
2. Visit [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

Vercel will automatically:
- Detect the Next.js framework
- Build your application
- Deploy it to a live URL
- Provide SSL certificate and CDN

### Environment Variables

No environment variables required for basic functionality.

## API Reference

### `timeConverter.ts` Functions

#### `epochToUTC(epochSeconds: number): string`
Convert epoch timestamp to UTC time string.

#### `epochToLocal(epochSeconds: number): string`
Convert epoch timestamp to local browser timezone.

#### `epochToTimezonesMap(epochSeconds: number, timezones: string[]): Record<string, string>`
Convert epoch timestamp to multiple timezones.

#### `dateToEpoch(dateString: string, timezone: string): number`
Convert date string in specified timezone to epoch timestamp.

#### `getCurrentEpoch(): number`
Get current time as epoch timestamp.

#### `isValidEpoch(value: number | string): boolean`
Validate if a value is a valid epoch timestamp.

#### `getAllTimezones(): string[]`
Get list of all supported timezones.

## Project Structure

```
myweb/
├── app/
│   ├── layout.tsx          # Main layout
│   ├── page.tsx            # Home page with converter UI
│   ├── page.module.css     # Page styles
│   └── globals.css         # Global styles
├── lib/
│   └── timeConverter.ts    # Conversion utility functions
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Fast**: Client-side processing, no server requests needed
- **Lightweight**: ~15KB gzipped
- **Optimized**: Uses date-fns tree-shaking for minimal bundle size

## Known Limitations

- Epoch values are limited to 0 to 253,402,300,799 (year 9999)
- Requires JavaScript enabled
- Historical timezones with timezone offset changes may vary

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on [GitHub](https://github.com/jijwang/myweb/issues).

## Links

- 🌐 [Live Demo](#) - Deploy your own version
- 📖 [Next.js Docs](https://nextjs.org/docs)
- 📅 [date-fns Docs](https://date-fns.org/docs)
- 🚀 [Vercel Docs](https://vercel.com/docs)

---

Made with ❤️ by [jijwang](https://github.com/jijwang)