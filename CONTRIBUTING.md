# Contributing to Tinytown 🏘️

Thank you for your interest in Tinytown. 

🚧 This document is very much under construction. Feel free to message us on [Discord](https://ttown.app/discord) if you'd like to add content.


## Your First Code Contribution

Work in progress


## Best Practices

### Code Style
* Make explicit side-effects in arrow functions by using braces and to prevent returning of unused values:
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

* Bias towards TouchableOpacity instead of the native Button component since the latter is not very compatible with Android.

* Make sure you're using **Tabs with 2 Spaces** to indent your code.

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


# Appendix

1. Another [Branch naming guideline](https://nvie.com/posts/a-successful-git-branching-model/) _(e.g., why only feature and hotfix, not, say, bugfix?)_ <a id="appendix_1"></a>

