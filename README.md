# Devkit CLI

Devkit CLI is a Command Line Interface application for superfast scaffolding of any simple Vanilla JavaScript App.

## Installation

Install DevKit CLI globally using [npm](https://www.npmjs.com/package/devkit-js).

```bash
npm install -g devkit-js
```

## Creating a new project

In the terminal run

```bash
devkit create <your new project name>
```

This will create the project folder in your current working directory and take care of installing all the necessary dependencies.

The created project will have the following folder structure:

```bash
├── ...
├── src                 # src directory, where your stuff go
│   ├── js              # JS components and main app.js
│   ├── scss            # SCSS components and main main.scss
│   ├── index.html      # main html
├── .gitignore
├── package-lock.json
├── package.json
├── main.js
├── ...
```

Once the project is created navigate to the project directory and start building your new app. A Dev Server comes out of the box. In order to start the server run:

```bash
npm run dev
```

When ready to deploy/build for production and generate the distribution files, run in the terminal:

```bash
npm run build
```

This will automatically generate all the distribution files and put them in the `dist` directory.

The `.scss` files will be compiled into `CSS` and minified. The `.js` files will be transpiled using [babel](https://babeljs.io/). All the styles and scripts will be automatically injected into your `index.html`.

## Contributing

If you find any issues, feel free to submit a pull request

## Author

[iClusterDev](https://github.com/iClusterDev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
