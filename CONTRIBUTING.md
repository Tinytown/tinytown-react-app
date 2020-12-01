# Contributing to Tinytown 🏘️

Thank you for your interest in Tinytown. 

🚧 This document is very much under construction. Feel free to message us on [Discord](https://ttown.app/discord) if you'd like to add content.


## Your First Code Contribution

Work in progress


## Best Practices

### Code Style

Except in a handful of cases, we try to adhere to the Airbnb JavaScript Style Guide. Please refer to it for more information: https://github.com/airbnb/javascript/blob/master/README.md

#### Arrow Functions
Make explicit side-effects in arrow functions by using braces and to prevent returning of unused values:
```
someFunction()
  .then((result) => {
    console.log(result);
  });
```
or using Ramda for a more point-free syntax
```
someFunction().then(R.tap(console.log))
```
#### Whitespace 
Use soft tabs (space character) set to **2 spaces**. eslint: [`indent`](https://eslint.org/docs/rules/indent.html)
```
function baz() {
∙∙let name;
}
```

#### Trailing Commas
Use additional trailing commas. eslint: [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle.html)
```
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];
```

#### Quotes
Use single quotes for strings. eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)
```
const name = 'Capt. Janeway';
```

#### Naming Conventions
You may optionally **uppercase a constant** only if it (1) is exported, (2) is a const (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change. 
```
// allowed
export const API_KEY = 'SOMEKEY';
```

Use **camelCase** when naming objects, functions, and instances and use **PascalCase** only when naming constructors or classes. eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html) [`new-cap`](https://eslint.org/docs/rules/new-cap.html)
```
// camelCase
const thisIsMyObject = {};
function thisIsMyFunction() {}

// PascalCase
class User {
  constructor(options) {
    this.name = options.name;
  }
}
```

### Security

#### Keys and Tokens
Our team uses [Doppler](https://doppler.com/) to manage environment variables but you can use your own keys and tokens by running `yarn setup` and then editing the _src/library/utils/config.js_ file. This file is already in .gitignore to keep you from accidentally sharing it with others.

### Pull Requests

#### Branch Naming Convention

**Format**
`<type>/<issue#>-<initials>-<description>`

**Type**
```
feature  -  New features and improvements.
bugfix   -  Code changes linked to a known issue.
hotfix 	 -  Quick fixes to the codebase.
```

**Examples**
```
feature/i23-av-splash-screen
bugfix/i5-ha-mapbox-error
hotfix/i8-ck-requestAuth-error
```

#### Commit Titles
When adding commits to a branch, please include the GitHub issue number from the branch at the beginning of the commit title.  For example, commits to the `feature/i23-av-splash-screen` branch should look like this:
```
i23: Remove logo / color from current splash screen
i23: Add splash screen to iOS
i23: Update splash icon filename
i23: Add splash screen to Android
i23: Add new Android assets
```

#### Dependencies
Avoid creating dependency chains of PRs (i.e., PRs that share non-negligible overlaps). It's likely that a PR which others depend on in the chain will need changing. This will likely cause repetitive and unnecessary work for a host of reasons: reviewers have to keep track of if they already made a comment in another PR on the chain; developers have to make the change in the parent PR and then execute a non-nullable amount of work to propagate that change to the children PRs.
  - Clarification: _You're more than welcome to have a chain of PR dependencies, so long as the independent PR is the only PR that's an offical PR and the rest are drafts._

### React Native
#### Buttons
Bias towards TouchableOpacity instead of the native Button component since the latter is not very compatible with Android.

# Appendix

1. Another [Branch naming guideline](https://nvie.com/posts/a-successful-git-branching-model/) _(e.g., why only feature and hotfix, not, say, bugfix?)_ <a id="appendix_1"></a>