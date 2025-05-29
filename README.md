<div align="center">
  <a href="https://snap2sql.app" target="_blank">
    <img src='https://snap2sql.app/banner.jpg' width="100%" alt="App banner" />
  </a>
</div>

## Table of Contents

- [Introduction](#introduction)

- [Requirements](#requirements)

- [Stack](#stack)

- [Setting Up](#setting-up)

- [Run Locally](#run-locally)

- [Contributors](#contributors)

- [License](#license)

## Introduction

Snap2SQL lets you instantly convert database diagrams into clean SQL schemas using AI. Support for MySQL and PostgreSQL.

## Requirements

- Node >= 20
- pnpm >= 9

## Stack

- [next](https://www.npmjs.com/package/next): A framework for server-rendered React applications.
- [shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [monaco-editor/react](https://www.npmjs.com/package/monaco-editor): A Monaco Editor wrapper for React applications.
- [zustand](https://www.npmjs.com/package/zustand): A small, fast, and scalable state management library for React.
- [typescript](https://www.npmjs.com/package/typescript): A typed superset of JavaScript that compiles to plain JavaScript.

## Setting Up

### OPENAI_API_TOKEN

- Go to the [OpenAI web](https://openai.com/).
- Sign in to your account or create a new one.
- Navigate to your [API settings](https://platform.openai.com/account/api-keys).
- Generate an Secret key.
- Copy the generated Secret key.

### GOOGLE_GENERATIVE_AI_API_KEY

- Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
- Sign in to your account or create a new one.
- Generate an Secret key.
- Copy the generated Secret key.

### UPSTASH_REDIS_REST_URL - UPSTASH_REDIS_REST_TOKEN

- Go to the Uptash [console](https://console.upstash.com/).
- Sign in to your account or create a new one.
- Navigate to your database.
- Copy the generated keys.

## Run Locally

1.Clone the snap2sql repository:

```sh
git clone https://github.com/xavimondev/snap2sql
```

2.Install the dependencies:

```bash
pnpm install
```

3.Start the development:

```bash
pnpm dev
```

## Contributors

<a href="https://github.com/xavimondev/snap2sql/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xavimondev/snap2sql" />
</a>

## License

[**MIT**](https://github.com/xavimondev/snap2sql/blob/main/LICENSE).
