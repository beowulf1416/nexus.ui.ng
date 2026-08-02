# Nexus UI

Angular frontend for the **Nexus ERP** platform.

Nexus UI is a modern Angular application that provides the user interface for the Nexus ERP ecosystem. It communicates with the Rust-based backend through REST APIs and is designed to be modular, maintainable, and highly scalable for enterprise applications.

## Nexus ERP

The Nexus ERP platform consists of several independent projects:

| Repository | Description |
|------------|-------------|
| https://github.com/beowulf1416/nexus.db | PostgreSQL database |
| https://github.com/beowulf1416/nexus.ws.rust | Rust REST API backend |
| https://github.com/beowulf1416/nexus.ui.ng | Angular frontend |

---

## Features

- Accounting
- Inventory Management
- Manufacturing
- Work Management

---

## Technology Stack

- Angular Framework
- Rust-based backend
- PostgreSQL database

---

## Requirements

- Node.js 20+
- npm 10+
- Angular CLI 19+

---

## Installation

Clone the repository.

```bash
git clone https://github.com/beowulf1416/nexus.ui.ng.git
cd nexus.ui.ng
```

Install dependencies.

```bash
npm install
```

---

## Configuration

Configure the backend API endpoint in the application's environment configuration.

Example:

```typescript
export const environment = {
    production: false,
    apiUrl: "http://localhost:8080"
};
```

---

## Development

Start the development server.

```bash
ng serve
```

Open your browser.

```
http://localhost:4200
```

---

## Production Build

```bash
ng build
```

Production artifacts are generated in the `dist/` directory.

---

## Backend

This application is designed to work with the Nexus Rust backend.

Repository:

https://github.com/beowulf1416/nexus.ws.rust

---

## Database

The backend uses the Nexus PostgreSQL database.

Repository:

https://github.com/beowulf1416/nexus.db

---

## Development Workflow

1. Start PostgreSQL
2. Start the Rust backend
3. Start the Angular development server
4. Open the application in your browser

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a Pull Request.

---

## License

This project is licensed under the AGPL-3.0 License.
https://opensource.org/license/agpl-3-0

---

## Author

**Ferdinand Tomale**

GitHub: https://github.com/beowulf1416
