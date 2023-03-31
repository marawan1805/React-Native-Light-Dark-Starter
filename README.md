
<p align="center">
<a href="https://ibb.co/2ZYMmwT"><img src="https://i.ibb.co/g4FWHGx/image00001.jpg" alt="image00001" border="0"></a>
</p>

### React Native Expo simple starter with full light/dark theme control using async storage and context api.

</br>

## 📷 Screenshots

|    <img width=300 src="https://i.ibb.co/S0YTR17/IMG-7501.png" alt="image" border="0"/><br /> | <img width=300 src="https://i.ibb.co/3kpm6RH/IMG-7500.png" alt="image" border="0"/><br /> |
| - |-  |
|    <img width=300 src="https://i.ibb.co/2sX1Q9C/image.png" alt="image" border="0"/><br />  | <a href="https://ibb.co/C8kYgDQ"><img width=300 src="https://i.ibb.co/b26B7PX/image.png" alt="image" border="0"></a> |

</br>

## Features

- Light/dark mode toggle
- Copying System appearance
- Login and Register Screens
- Settings Screen
- Bottom Tab Navigator
- Cross platform

</br>

## Demo 💥

https://user-images.githubusercontent.com/95961680/228990075-e2797d4c-6fea-419e-bced-8a42653e0ec5.mp4

</br>

## Setting Up

To run this project using Expo, you can download it as a zip or clone this repo, then run

```bash
  npm i
  npx expo start
```
If you have an emulator you can run the app on it, or you can download the Expo Go app on your phone, make sure you're connected to the same network as your computer, and scan the code from the camera app. It might take a while to load initially.

Whenever you want to release android/ios builds, run:

```bash
  npx expo prebuild
```


</br>

## Documentation

### 1. Light/Dark Mode:
In this template, we make use of the<a href="https://reactnative.dev/docs/appearance"> Appearance module </a> provided by react native to set the initial app theme to the system's theme.

      const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

We also create a theme context using the<a href="https://reactjs.org/docs/context.html"> context api </a>provided by React, so that other components can use access it.

We also make use of React <a href="https://reactnative.dev/docs/asyncstorage">AsyncStorage </a> so that the app remembers the last theme that the user chose.

Finally, we make use of the addChangeListener() method provided by the Appearance module in order to update the theme of the app whenever the system's theme is changed.

</br>

### 2. Colors:

Inside the config folder is a file named Theme.js which exports the function "colors". This is the color palette for the app. You can change the colors however you prefer.

<a href="https://m2.material.io/design/color/the-color-system.html#color-theme-creation">Here </a> is a nice guide explaining how to create a nice color palette for your app

</br>


### 3. How to use Light/Dark Mode in your components:

In order to make use of the light/dark mode functionality in every component we create, we need to follow a few steps.

First, we import the following:

    import { colors } from "../config/theme";
    import { ThemeContext } from "../context/ThemeContext";

Then we add the following two lines inside the main function of our component:

    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

Then we style our component using "activeColors". For example, let's say you want to set the background color of a screen to the dark/light (according to what the user chooses). First, in Theme.js, you can set the different colors for each mode, for example:
    
    ...
    light: {
        primary: "#f3f4f6"
        ...
    },

    dark: {
        primary: "#121212"
        ...
    }
    ...

And in our component we do something like this:

    <ScrollView
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
    >
      <StyledText style={styles.sectionTitle} big>
        Home
      </StyledText>
    </ScrollView>

Notice how we use the activeColors to style the ScrollView.

This will result in the background color of the page being #121212 when dark theme is on, and #f3f4f6 when light theme is on. 

Likely, you can call the different colors you set in Theme.js. For example:

    <Text style={activeColors.tint}>
        Hello World!
    </Text>

and so on.

</br>

## Contributing

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.


### Using the issue tracker

The issue tracker is the preferred channel for [bug reports](#bugs),
[features requests](#features) and [submitting pull
requests](#pull-requests), but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests (use the
  [Roots Discourse](https://discourse.roots.io/) to ask the Roots Community for help, or if you want the Roots Team to dedicate some time to your issue, we [offer our services](https://roots.io/services/) as well).

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.


<a name="bugs"></a>
### Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; make sure that the code in the repository is
_definitely_ responsible for the issue.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report.


<a name="features"></a>
### Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the Roots developers of the merits of this feature. Please
provide as much detail and context as possible.


<a name="pull-requests"></a>
### Pull requests

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code), otherwise you risk spending a lot of
time working on something that the developers might not want to merge into the
project.

Please adhere to the coding conventions used throughout the project (indentation,
comments, etc.).

Adhering to the following this process is the best way to get your work
merged:

1. [Fork](http://help.github.com/fork-a-repo/) the repo, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>//React-Native-Light-Dark-Starter
   # Navigate to the newly cloned directory
   cd /React-Native-Light-Dark-Starter
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/<upsteam-owner>//React-Native-Light-Dark-Starter
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

10. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.


