# Salary Calculator

A simple fish salary calculator that shows real-time earnings based on work mode, working hours and hourly rate.

![](https://github.com/Heliner/fish_salary/blob/main/res/demo.gif)

[Try It Online](https://fish-salary.vercel.app/)

## Features
- Support multiple work modes (Weekends, Big/Small Week, 996)
- Customizable working hours and hourly rate
- Real-time earnings update every 10 seconds
- Floating animation when earnings increase
- Responsive design for all devices

## Local Development

### Prerequisites
- Node.js (v14+) and npm

### Installation
1. Clone this repository
```bash
git clone https://github.com/Heliner/fish_salary.git
cd fish_salary
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

4. Visit `http://localhost:1234` in your browser

This is a simple tool to show how much you've earned today, with data updating every 5 seconds.

## Features
1. Calculate earned salary based on today's working hours
2. Support modifying working hours, monthly salary and work mode (Weekends, Big/Small Week, 996)
3. Friendly interface with large earnings display
4. Animation effects when earnings update

## Default Settings
- Working Hours: 9:00 - 18:00
- Monthly Salary: 8000
- Work Mode: Weekends

## Installation & Run
1. Install dependencies
```bash
npm install
```
2. Start development server
```bash
npm start
```
3. Build project
```bash
npm run build
```

## Usage
1. Modify working hours, monthly salary and work mode in settings
2. Click "Update Settings" button to apply new settings
3. Interface automatically updates earnings every 5 seconds

## Notes
- Weekend calendar data is simulated, real data can be obtained from API in actual use
- Calculation results are for entertainment only, not actual salary income

## Tech Stack
- HTML/CSS/JavaScript
- Parcel bundler
- Local Storage (localStorage) for user settings

## License
MIT

[简体中文](./README.md)