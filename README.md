# Overview
<p align="center">
  <img src="/src/assets/JobCatLogo.png" width='100'> 
<br/>JobCat - a Job application Catalogue to keep track ok all your job applicaitons in one place
</p>

# Features
- Search for job postings based on job title, keyword or company name
- Get list of 25 results from LinkedIn job postings, providing an overview of the jobs (job title, company name + logo, date posted and location)
- Get more details about the job when you click a posting including description, a map to show where it's located and tags related to the job
- Add bookmarks to the job to save it to a database
- Apply to job and update application status (intend to apply, applied, and expired)
- View all bookmarked job postings

# Resources

- [Backend](https://github.com/AhmedSomaan/job-application-tracker-be)
- [Figma Mockups](https://www.figma.com/file/93CsRodOo9qyevOa7qcLhK/Capstone---Job-application-tracker?type=design&mode=design&t=PxBox5RN5vMHxOqT-1)

# Technologies used

- React
- Typescript
- Tailwind 
- Axios

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
