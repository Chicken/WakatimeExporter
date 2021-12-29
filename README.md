# WakatimeExporter

Random script to export exported Wakatime coding activity to MariaDB for Grafana display.

## External Requirements

- MariaDB
- Grafana

## Usage

1. Export your daily coding activity from [Wakatime settings](https://wakatime.com/settings/account)
2. Rename the file to `wakatime.json` and put to the project root.
3. Run `npm install` or `yarn`
4. Copy `.env.example` to `.env` and fill in the values with your database credentials
5. Run `npm start` or `yarn start`
6. Wait
7. Go to Grafana and make your panel with the data
