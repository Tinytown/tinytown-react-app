# Contributing to Tinytown 🏘️

Thank you for your interest in Tinytown. 

🚧 This document is very much under construction. Feel free to message us on [Discord](http://bit.ly/ttown-discord) if you'd like to add content.

## Your First Code Contribution ##

Work in progress

## Best Practices ##

### Code Style ###
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

### Security ###

1. Whenever you must use confidential credentials (e.g., access tokens), please write these inside _.env_ in the root directory and incorporate it using **react-native-config**. Please look at _config.js_ and how MAPBOX_ACCESS_TOKEN is incorporated for inspiration. Furthermore, for instructions on how the .env file should be written, please look at the _README<span></span>.md_ file in the root repository.

### PR ###

1. Avoid creating dependency chains of PRs (i.e., PRs that share non-negligible overlaps). It's likely that a PR which others depend on in the chain will need changing. This will likely cause repetitive and unnecessary work for a host of reasons: reviewers have to keep track of if they already made a comment in another PR on the chain; developers have to make the change in the parent PR and then execute a non-nullable amount of work to propagate that change to the children PRs.
    - Clarification: _You're more than welcome to have a chain of PR dependencies, so long as the independent PR is the only PR that's an offical PR and the rest are drafts._

# Appendix

1. Another [Branch naming guideline](https://nvie.com/posts/a-successful-git-branching-model/) _(e.g., why only feature and hotfix, not, say, bugfix?)_ <a id="appendix_1"></a>

