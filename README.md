# Maintenance Scheduler

Simple maintenance scheduler web app built with React + Vite.

How to add this project to GitHub:

1. Install Git: https://git-scm.com/downloads
2. (Optional) Install GitHub CLI: https://cli.github.com/
3. In project root run:

```powershell
git init
git add .
git commit -m "Initial commit"
```

4a. Create GitHub repo with GitHub CLI and push:

```powershell
gh repo create <USERNAME>/<REPO-NAME> --public --source=. --remote=origin --push
```

4b. Or create repo on github.com, then add remote and push:

```powershell
git remote add origin https://github.com/<USERNAME>/<REPO-NAME>.git
git branch -M main
git push -u origin main
```

If you'd like, after installing Git I can run the git/gh commands here to push for you.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
