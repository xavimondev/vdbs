<div align="center">
  <a href="https://x.com/xavimonp/status/1785862861836709980" target="_blank">
    <img src='https://vdbs.vercel.app/medal.png' width="20%" alt="Medal image" />
  </a>
  <a href="https://x.com/xavimonp/status/1785862861836709980" target="_blank">
    <p> Supabase Open Source Hackathon 2024 Winner 🤩</p>
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

- [Troubleshooting](#troubleshooting)

## Introduction

vdbs stands for **"vision database sql"** This project allows you to convert your database diagrams into SQL Schema using the capabilities of [Vision API](https://platform.openai.com/docs/guides/vision). Once your SQL code is ready, you have three integration options for your Supabase projects:

1. Simply copy and paste the SQL schema into your Supabase dashboard.

2. Copy the npm command generated after your SQL schema is ready and paste it into your app. This creates a migration file containing the SQL schema.

3. Use your database connection string, and the SQL schema will be deployed to your remote Supabase project.

vdbs is inspired by [v0.dev from Vercel](https://v0.dev/), which allows you to generate UI based on images or your ideas. You can copy the code or use the npm command and integrate the generated code into your project.

## Requirements

- Node >= 18
- pnpm > 8

## Stack

### web

- [next](https://www.npmjs.com/package/next): A framework for server-rendered React applications.
- [shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [monaco-editor/react](https://www.npmjs.com/package/monaco-editor): A Monaco Editor wrapper for React applications.
- [zustand](https://www.npmjs.com/package/zustand): A small, fast, and scalable state management library for React.
- [typescript](https://www.npmjs.com/package/typescript): A typed superset of JavaScript that compiles to plain JavaScript.

### Cli

- [tsup](https://github.com/egoist/tsup): A TypeScript-focused module bundler.
- [chalk](https://github.com/chalk/chalk): Chalk is a library for styling terminal text with color and formatting options, making console output more visually appealing and readable.
- [commander](https://github.com/tj/commander.js/): Commander is a feature-rich library for creating command-line interfaces (CLIs) in Node.js.
- [execa](https://github.com/sindresorhus/execa): Execa is a package that simplifies running external commands in Node.js, providing a more straightforward and powerful interface than Node.js' built-in child_process module.
- [glob](https://github.com/isaacs/node-glob): Glob is a package used for pattern matching files and directories, enabling developers to easily find and work with sets of file paths using wildcard characters.
- [ora](https://github.com/sindresorhus/ora): Ora is a library that creates elegant terminal spinners and loading indicators.
- [prompts](https://github.com/terkelg/prompts): Prompts is a user-friendly library for creating interactive command-line prompts, allowing developers to easily gather user input in a structured and customizable way. Prompts Repository

## Setting Up

### OPENAI_API_TOKEN

- Go to the [OpenAI web](https://openai.com/).
- Sign in to your account or create a new one.
- Navigate to your [API settings](https://platform.openai.com/account/api-keys).
- Generate an Secret key.
- Copy the generated Secret key.

### UPSTASH_REDIS_REST_URL - UPSTASH_REDIS_REST_TOKEN

- Go to the Uptash [console](https://console.upstash.com/).
- Sign in to your account or create a new one.
- Navigate to your database.
- Copy the generated keys.

## Run Locally

1.Clone the vdbs repository:

```sh
git clone https://github.com/xavimondev/vdbs
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

<a href="https://github.com/xavimondev/vdbs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xavimondev/vdbs" />
</a>

## License

[**MIT**](https://github.com/xavimondev/vdbs/blob/main/LICENSE).

## Troubleshooting

### Using Bun: Could not determine executable to run for package supabase

Upgrade bun's version

```bash
bun upgrade
```

More details: **https://twitter.com/bunjavascript/status/1734470860755566815**
