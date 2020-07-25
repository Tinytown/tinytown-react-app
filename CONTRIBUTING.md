# Contributing to Tinytown 🏘️

Welcome to Tinytown! Thanks for taking the time to check us out. 

🚧 This document is very much under construction. Feel free to edit or ping us on [Slack](https://tinytownhq.slack.com/archives/C013BMG6LV9) if you'd like to add content.

## Your First Code Contribution ##

1. Open [Linear](https://linear.app/tinytown/team/TIN/board) and click on the code item you’re working on. In the top right corner you should see a branch icon, click on it to copy a default branch name to your clipboard. Prepend the former branch name with either 'feature' (including bugs) or 'hotfix'. For instance, feature/**[linear username|initials]/[(tin-issue number)]-[short task description]**. A situation where it's acceptable to use initials and omit the *tin-issue number* part is appropriate, for instance, when performing a chore, such as editing this contribution markdown file.
    * <a href="#appendix_1">branch name reasoning</a>

![Image](https://i.imgur.com/rRV1lja.png)

2. While in the *tinytown-react-app* directory, create and switch to your new branch.

> git checkout -b new-branch name

3. Stage desired file(s), commit, and push your changes.

> git add file-name 
> git commit -m “commit-message-here”
> git push origin HEAD: new-branch-name

4. On GitHub, [create a new pull request](https://yangsu.github.io/pull-request-tutorial/), and assign the appropriate reviewer.
5. On [Linear](https://linear.app/tinytown/team/TIN/board), move your task from “In Progress” to “In Review.”

## Best Practices ##

### Security ###

1. Whenever you must use confidential credentials (e.g., access tokens), please write these inside _.env_ in the root directory and incorporate it using **react-native-config**. Please look at _config.js_ and how MAPBOX_ACCESS_TOKEN is incorporated for inspiration. Furthermore, for instructions on how the .env file should be written, please look at the _README<span></span>.md_ file in the root repository.

# Appendix

1. Another [Branch naming guideline](https://nvie.com/posts/a-successful-git-branching-model/) _(e.g., why only feature and hotfix, not, say, bugfix?)_ <a id="appendix_1"></a>

