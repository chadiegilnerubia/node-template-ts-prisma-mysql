# Node template

## Installation

### 1. Install [Node Version Manager](https://github.com/nvm-sh/nvm)

### 2. Install Node v18.18.0

```
nvm install v18.18.0
```

### 3. Use Node v18.18.0

```
nvm use v18.18.0
```

### 4. Navigate to the project directory

```
cd note_template
```

### 5. Install the project dependencies using npm (Node Package Manager)

```
npm install
```

## Usage

### 1. Create a .env file

```
APP_ENV=local
APP_URL=http://localhost:3000

PORT=5000

DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE


ACCESS_TOKEN_SECRET=access token secret here
ACCESS_TOKEN_EXPIRATION=5s

```

### 2. Start the development server

```
npm run dev
```
