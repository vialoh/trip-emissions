# About

This app provides core functionality necessary for most user-oriented, data-driven applications:

- Built with [React](https://reactjs.org/) using [`create-react-app`](https://create-react-app.dev/)'s defaults

- Built for web browsers

- Written entirely in [TypeScript](https://www.typescriptlang.org/)
  - Strongly typed
  - Clarity of interfaces and intent
  - Code auto-completion
  - Prevent bugs/mistakes
  - Great tooling

- Code linting with [ESLint](https://eslint.org/)
  - Minimal restrictions while ensuring clean code

- Logging with the native `console`

- Custom fonts
  - Defaults to [Arimo](https://fonts.google.com/specimen/Arimo)
  - Quickly swap with your own

- Images
  - Generate all at once
    - App icons
    - Favicon
    - Logos
    - Splash screens

- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
  - Automatically generated
  - Helps guard against cross-site scripting attacks
  - Production builds are automatically updated with sha256 hashes for known inline scripts

- [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
  - Works offline
  - [Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
  - [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

- Preliminary search engine support
  - `robots.txt`
  - `sitemap.xml`

- Prerequisites for app store submissions
  - Basic privacy policy (both in app and as a static web page)
  - Basic terms of service (both in app and as a static web page)

- Scripts
  - Image generator (logos, icons, splash screens)
  - Generate `version.json` for web updates
  - Generate environment variable file templates

- Environment variables
  - Full list of defaults written to disk (git ignored)
  - Extendable sets of variables for common environments written to disk (git ignored)
  - `process.env.*` type definitions with examples

- Additional type definitions
  - A few convenient globals
    - `JSONValue`, `JSONObject`, and `JSONArray` - Useful when specifying JSON
  - `process.env.*`

- API modules
  - Client as an [`axios`](https://www.npmjs.com/package/axios) instance
  - Seamless authorization handlers
    - Automatic authorization header storage
    - Automatic authorization renewal
    - Automatic authorization expiration
    - Requires an additional cookie in web browsers for increased security
  - [RESTful](https://restfulapi.net/) resources

- Extremely useful React hooks
  - `useAsyncExtendedState` - Same as `setState` but with an additional convenient `extendState` function and the ability to accept promises
    - State can be updated asynchronously, when the promise resolves or rejects
  - `usePromise` - Manage and render the state of any `Promise`
    - `status` - Pending, resolved, or rejected
    - `promise` - The `Promise` instance itself
    - `value` - The resolved value
    - `error` - The caught error
    - `cancel` - Cancels the promise
    - `reset` - Resets the state

- Utilities
  - Get human readable error messages
  - Get human readable times (how long ago)
  - Convert objects to query strings
  - Open external links in system browser

- Core application components
  - Routes rendered using [`react-router`](https://reactrouter.com/)
  - Header
    - Logo
  - Version update indicator with update button

- Layout components
  - Default
    - Hello (World)

- Store component for shared application state as a composition of React hooks
  - `useVersion` - A hook which returns an object describing the current and potentially new version state and a method to update the service worker, if applicable
  - `localState` - Saves/retrieves the state of some resource to/from `localStorage`

The app's codebase is opinionated but adaptable to nearly any architecture/design pattern of choice.

Every module is either a pure function (possibly asynchronous), a plain object, or a composition of both, with every function signature and object interface defined using [TypeScript](https://www.typescriptlang.org/).

The app follows a top-down approach designed to be as simple and easy to follow as possible, where application state is rendered, beginning with the route, as a composition of pure function components using either shared state or internal state managed by hooks. Most API functionality is achieved using CRUD (create, read, update, delete, query) abstractions plus utility functions.

Extensive test coverage and separation of concerns make it easy to update and maintain the app while ensuring that it always works as expected.

Modules are thoroughly documented and organized logically and predictably, with exports structured to help you naturally keep your app documentation up to date with less effort.


# Prerequisites

You will need:

- [Node.js](https://nodejs.org/) (version 16)

The following are recommended:

- [Visual Studio Code](https://code.visualstudio.com/) - Comes with [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) for modern JavaScript and TypeScript by default, plus automatic linting with a little extra setup.

- [ESLint Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#overview) - See the [ESLint Setup](#enable-code-linting-for-vscode-optional) section below for a step-by-step guide to installation and configuration.

- [Git](https://git-scm.com/) - Included with OSX, Linux, and VSCode.

- [React Developer Tools](https://fb.me/react-devtools)


# First steps

## Install the Node.js dependencies

After installing [Node](https://nodejs.org/), navigate to this directory in your terminal and run `npm install` to install the app's dependencies. This will also automatically create `.env` and `.env-cmdrc.json` files with example values which you should update for your project and environment(s).


## Set environment variables

The full list of environment variables specific to the app can be found within the `.env` file. For all of the various builds, the values in `.env` are used as defaults, and we use [`env-cmd`](https://www.npmjs.com/package/env-cmd) to extend these variables per configuration specified within `.env-cmdrc.json`. See `src/types/process.env.d.ts` for the app's environment variables' type definitions and examples, and other modules will extend `process.env` with definitions as needed.

Update the `.env` and `.env-cmdrc.json` files with any known values.

Any environment variables beginning with `REACT_APP` will be included in your application bundle, visible to the public. **Your app's environment variables should not include any private keys or credentials.**


## Update the app name and domains

The app is initially branded as "Molecule". You should change this to match your app.

To quickly update the app's branding, use an IDE (e.g., VSCode) to find all instances of "molecule", "your-api", "your-app", and "Your App" within your app's project directory and replace each instance with your app's name, domain(s), email address(es), etc. It's probably a good idea to review each instance one by one.


## Update logos and icons

It's easiest to start with an SVG (vector) image for your logo. If you do not already have a logo, you can find many premade free and open source vector images on the web.

[Inkscape](https://inkscape.org/) is recommended for editing vector images and saving them in an optimized format compatible with React. To overwrite the `Logo.svg` file included with Molecule in a compatible format:

1. Open your logo in Inkscape.

2. Select "File -> Save As..."

3. Select "Optimized SVG" next to "Save as type".

4. Overwrite `{your-app}/src/App/Logo.svg`.

> It's also probably a good idea to save a copy using the Inkscape format for future editing, like we've done with `{your-app}/src/App/Logo.inkscape.svg`.

To generate your logos/icons and splash images, after replacing `{your-app}/src/App/Logo.svg` with your vector image (using a transparent background), run the following in the terminal within your app's root directory:

```sh
npm run generate-images
```

This generates all of the images necessary (based on your SVG logo) for the web and mobile apps. Feel free to improve and replace the generated images as desired.


## Update fonts

Molecule comes with [Arimo](https://fonts.google.com/specimen/Arimo), a sans serif font metrically compatible with the widely used Arial font.

To replace Arimo with your own choice of font:

1. Copy your font files to your app within the `public/fonts` directory.

2. Update `public/index.html` and replace all instances of "Arimo" within the `@font-face` declaration with the your font's sources. It may require some customization depending on your particular font and how you intend to use it.


## Update Privacy Policy and Terms of Service

Molecule comes with a very generic Privacy Policy and Terms of Service so you have something to start from, but you will probably need to update them depending on your requirements. They exist in two separate locations.

So that you can link to them from app stores via e.g., `https://app.your-app.com/privacy-policy.html`:
  - `{your-app}/public/privacy-policy.html`
  - `{your-app}/public/terms-of-service.html`

So that users can view them directly within the app:
  - `{your-app}/src/App/PrivacyPolicy.tsx`
  - `{your-app}/src/App/TermsOfService.tsx`

> **You should now be ready to start building your app!**


## Enable code linting for VSCode (optional)

Code linting is a great way to keep your code consistently clean and readable, which helps prevent silly mistakes.

1. Install the ESLint extension within VSCode by opening `File (or "Code" on Mac) -> Preferences -> Extensions`, searching for "ESLint", and clicking the "Install" button.

2. Open `File (or "Code" on Mac) -> Preferences -> Settings`, then click the settings icon in the upper right to open your VSCode user `settings.json` file. Add the following settings:

    ```json
    {
      "eslint.alwaysShowStatus": true,
      "javascript.format.enable": false,
      "typescript.format.enable": false,
      "eslint.format.enable": true,
      "eslint.lintTask.enable": true,
      "eslint.validate": [
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact"
      ]
    }
    ```

3. Create a `.vscode/tasks.json` file at the root of the `molecule-app` project directory if it does not already exist and add the following task:

    ```json
    {
      "version": "2.0.0",
      "tasks": [{
        "label": "ESLint",
        "type": "shell",
        "problemMatcher": "$eslint-stylish",
        "command": "npm run lint",
        "windows": {
          "command": "npm run lint"
        }
      }]
    }
    ```

You should now have linting enabled within VSCode as you develop your app. You can view any problems by selecting the `View -> Problems` menu.

For more information on customizing your ESLint configuration, visit [ESLint.org](https://eslint.org/).


# Available scripts

- **`npm install`**

    Installs the necessary dependencies for the app.


- **`npm run write-dotenv-files`**

    Writes the default `.env` and `.env-cmdrc.json` files to disk. This is run automatically after installation and you may want to set any variables you already have values for.


- **`npm run generate-images`**

    You can replace `src/App/Logo.svg` with your own logo and run this command to generate icons and splash images for every platform.


- **`npm run lint`**

    Checks every JavaScript and TypeScript file within the project directory and returns warnings and/or errors for any line of code which doesn't meet our standards.


- **`npm run lint-autofix`**

    Automatically fixes all auto-fixable code based on our linting rules.


- **`npm start`**

    Runs the app in the development mode with hot reloading enabled.

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    You will also see any lint errors in the console.


- **`npm run server`**

    Serves the production app (possibly locally), if necessary. Serves a production build on port 3333, proxying API requests to localhost, port 4000. Useful for testing production builds locally.


- **`npm run snapshot-html`**

    Uses [react-snap](https://www.npmjs.com/package/react-snap) to snapshot the initially rendered HTML to give web users something to see other than a blank page before they've downloaded the application JavaScript.


- **`npm run build`**

    Builds the app for production to the `build` folder, optimized for best performance with minification and hashed filenames.

    Also writes `version.json` to the `build` folder and snapshots the HTML.


- **`npm run eject`**

    **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

    If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

    Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


# Dependencies explained

- `@testing-library/*` - Utilities for testing React components and hooks.

- `@types/*` - Type definitions for popular libraries. See [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for more information.

- [`axios`](https://www.npmjs.com/package/axios) - Handles API requests.

- [`env-cmd`](https://www.npmjs.com/package/env-cmd) - Loads sets of environment variables via `.env-cmdrc.json`.

- [`eslint`](https://www.npmjs.com/package/eslint) - Code linter. Helps ensure structured code.

- [`if-env`](https://www.npmjs.com/package/if-env) - Used for preventing `postinstall` scripts from running when `CI=true` or `NODE_ENV=production`.

- [`react`](https://reactjs.org/) - Using [`create-react-app`](https://create-react-app.dev/)'s defaults.

- [`react-dom`](https://www.npmjs.com/package/react-dom) - Renders React to the DOM.

- [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) - Renders layouts depending on the route.

- [`react-scripts`](https://www.npmjs.com/package/react-scripts) - Scripts included by [`create-react-app`](https://create-react-app.dev/) for managing the React app.

- [`react-snap`](https://www.npmjs.com/package/react-snap) - Snapshots the initially rendered HTML to give web users something to see other than a blank page before they've downloaded the application JavaScript.

- [`react-swipeable`](https://www.npmjs.com/package/react-swipeable) - Used for detecting when the user overscrolls (swipes downward beyond the top of the page) so that we can possibly fetch new data.

- [`typescript`](https://www.npmjs.com/package/typescript) - Necessary for TypeScript support.

- [`web-vitals`](https://www.npmjs.com/package/web-vitals) - Included by [`create-react-app`](https://create-react-app.dev/) for measuring performance.

- [`http-server`](https://www.npmjs.com/package/http-server) - Serves the production app (possibly locally), if necessary.

- [`icon-gen`](https://www.npmjs.com/package/icon-gen) - Generates the favicon.

- [`sharp`](https://www.npmjs.com/package/sharp) - Used for generating the icons and splash screens of various sizes based on the SVG logo.


# Building your app

The app is primarily separated into `API` and `App` component directories, plus common `hooks` and `utilities` directories. Sets of type definitions usually exist as a file or directory alongside the logical grouping of modules/components.

If you would rather use a different architecture, the existing code is designed to be adaptable. Concerns are as separated as possible while using pure, tested functions.


# Hosting your production app on Netlify

## Connect your git repository

> This section assumes you have a git repository for your app on either [GitHub](http://github.com/), [GitLab](https://gitlab.com/), [BitBucket](https://bitbucket.org/), or another git provider supported by [Netlify](https://www.netlify.com/).

1. Log into [Netlify](https://www.netlify.com/) (or sign up).

2. Click the [New site from Git](https://app.netlify.com/start) button.

3. Connect your git provider and choose your app's repository.

4. The default settings should work, so you should be able to immediately deploy the site.


## Set the environment variables for your production builds

1. Open the "Site settings" tab in Netlify.

2. Go to the "Environment" section under "Build & Deploy".

3. Click the "Edit variables" button and set the following environment variables:

  - `NODE_ENV=production`

  - `NODE_VERSION=16`

  - `GENERATE_SOURCEMAP=false`

  - `REACT_APP_URL_SCHEME=com.your-app.app`

  - `REACT_APP_API_ORIGIN=https://api.your-app.com` - Use the same value you used for your API's `API_ORIGIN` environment variable. Also make sure this is set in the `production` section of `{your-app}/.env-cmdrc.json`.

  - `REACT_APP_WEB_ORIGIN=https://app.your-app.com`

You'll set additional environment variables as needed when following the instructions for setting up features specific to your Molecule.


## Rebuilding and redeploying your web app

Your app will be automatically rebuilt and redeployed whenever you push a change to the master/main branch of your git repository. You can manually redeploy at any time by opening the "Deploys" tab selecting "Deploy site" using the "Trigger deploy" button on the right.

After your app has been built and deployed (published), you should be ready to try it out with your production API!


## Set up your app's live domain

Netlify gives you a unique random URL as a Netlify subdomain for your app, but you'll probably want to use your own official domain.

1. Open the "Domain management" section of the "Site settings" tab for your app in Netlify.

2. Click the "Add custom domain" button under the "Custom domains" section.

3. Enter your app's domain and click "Verify".

If you already own the domain, you will need to follow Netlify's instructions to verify your domain. Or if it's an unregistered domain, you can register it through Netlify.

See [Netlify's Custom domains](https://docs.netlify.com/domains-https/custom-domains/#assign-a-domain-to-a-site) documentation for more information on adding your domain.

It is recommended that you use Netlify's DNS, as it's easy to use and nice to manage it all in one place. It also greatly simplifies the process of adding SSL (HTTPS) to your web app.

After you've added your domain, scroll down to the "HTTPS" section of the "Domain management" page and ensure that SSL is enabled. If you've recently switched to Netlify's DNS, it could take some time for the changes to propagate before you're able to provision a TLS certificate, but from experience, it usually takes less than an hour.

See [Netlify's HTTPS documentation](https://docs.netlify.com/domains-https/https-ssl/) for more information on enabling (and troubleshooting) SSL.

> Note: You may need to update your API's environment variables to match your domain if it's different than what you originally set on your production API. You'll want to ensure the `APP_DOMAIN` and `APP_ORIGIN` environment variables are correct, otherwise the [CORS configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) will not allow requests to be made from your web app.


## Set up a subdomain for your API using Netlify's DNS

> If you're using a different DNS for your domain, you can skip this section. Refer to your domain's DNS provider's documentation.

To add your subdomain(s) to Netlify's DNS:

1. Open the "Domains" tab of your Netlify dashboard.

2. Click your domain.

3. Click the "Add new record" button under "DNS records".

4. Choose the "CNAME" record type.

5. If your desired subdomain is `api.your-app.com`, enter `api` for the name.

6. Your API host should provide a DNS target for you to use as the value.

7. Click the "Save" button.


> Note: You may need to update both your app's and API's environment variables to match your domain if it's different than what you originally set. On the API side, you'll want to ensure the `API_ORIGIN` is correct. On the app side (in Netlify), you'll want to ensure the `REACT_APP_API_ORIGIN` is correct.
