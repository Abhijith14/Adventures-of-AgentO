<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>Adventures-of-AgentO</h1>
<h3>◦ Unleash Agent O's coding adventures!</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/Perl-39457E.svg?style&logo=Perl&logoColor=white" alt="Perl" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />
</p>
<img src="https://img.shields.io/github/license/Abhijith14/Adventures-of-AgentO?style&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/Abhijith14/Adventures-of-AgentO?style&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/Abhijith14/Adventures-of-AgentO?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/Abhijith14/Adventures-of-AgentO?style&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Adventures-of-AgentO](#-running-Adventures-of-AgentO)
    - [🧪 Tests](#-tests)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The project is a text-based adventure game called "The Adventures of AgentO" implemented in Prolog. It allows players to navigate through different rooms, pick up and drop objects, and solve puzzles to complete missions. The game also includes a web interface for easy access and provides instructions and guidance for the missions. The project's value proposition lies in providing an immersive and interactive gaming experience while also showcasing the capabilities of Prolog programming for game development.

---

## 📦 Features

Exception: 

---


## 📂 Repository Structure

```sh
└── Adventures-of-AgentO/
    ├── .SmartGitAuto
    ├── .github/
    │   └── workflows/
    ├── agentO.pl
    ├── html/
    │   ├── gameover.html
    │   ├── instructions.html
    │   ├── main.html
    │   ├── s
    │   └── theend.html
    ├── images/
    │   ├── bathroom.png
    │   ├── bedroom.png
    │   ├── del
    │   ├── hall.png
    │   ├── kitchen.png
    │   ├── livingroom.png
    │   └── main.png
    └── static/
        ├── l
        └── script.js
```


---

## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [.SmartGitAuto](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/.SmartGitAuto) | The code in.SmartGitAuto automates Git operations such as adding, committing, and pushing changes to a remote repository. It enhances efficiency by reducing manual intervention in the version control process, improving productivity for developers.                                                                                                                                                                                                                                                             |
| [agentO.pl](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/agentO.pl)         | This code is a Prolog program that implements a text-based adventure game. It defines various predicates and rules for navigating through different rooms, picking up and dropping objects, and using objects in different locations. The program also includes an HTTP server that allows the game to be played through a web browser. It handles requests for getting the time remaining in the game and provides HTML templates for displaying instructions, the main game interface, and game over/end screens. |

</details>

<details closed><summary>Workflows</summary>

| File                                                                                                | Summary                                                                                                                                                                                                                                |
| ---                                                                                                 | ---                                                                                                                                                                                                                                    |
| [main.yml](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/.github/workflows/main.yml) | This code sets up a continuous integration workflow that installs Prolog, ngrok, and starts a Prolog server. It then starts an ngrok tunnel and waits for the tunnel URL to be available. The ngrok URL is then printed as the output. |

</details>

<details closed><summary>Html</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                 |
| ---                                                                                                      | ---                                                                                                                                                                                                                                                                                                                                                                                     |
| [instructions.html](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/html/instructions.html) | The code in'instructions.html' creates a webpage with instructions for a mission. It provides information to an agent on how to retrieve a hidden document from a suspect's home. The instructions include listening to a guide, moving around the home, searching for clues, being stealthy, and escaping undetected. The webpage also has a "Continue" button to proceed to the game. |
| [s](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/html/s)                                 | The code contains the HTML files needed for the user interface of the project. It focuses on presenting visual information to the user, such as text, images, and interactive elements, ensuring a user-friendly experience.                                                                                                                                                            |
| [theend.html](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/html/theend.html)             | The code represents the HTML content for the "The Adventures of AgentO" game's end page. It includes a title, Bootstrap CSS and JS dependencies, and a container with a "Game Over" message and a score of 100.                                                                                                                                                                         |
| [gameover.html](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/html/gameover.html)         | The code in gameover.html is a HTML file that displays a game over message and score. It uses Bootstrap CSS and JS to style and structure the content. The file includes a header, a container with a main content section, and displays the game over message and score.                                                                                                               |
| [main.html](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/html/main.html)                 | The code is an HTML page that creates a user interface for a game called "The Adventures of Agent Omanakuttan." It includes sections for displaying the player's location, picking and using items, moving in different directions, resetting the game, and displaying a map image. It also includes Bootstrap CSS and JS for styling and responsiveness.                               |

</details>

<details closed><summary>Images</summary>

| File                                                                           | Summary                                                                                                                                                                                                                                   |
| ---                                                                            | ---                                                                                                                                                                                                                                       |
| [del](https://github.com/Abhijith14/Adventures-of-AgentO/blob/main/images/del) | The code involves a path "images/del" and contains the file "ha". It's difficult to provide a comprehensive summary with the limited information provided, but it appears to be related to deleting or removing an image file named "ha". |

</details>

---

## 🚀 Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Dependency 1`

`- ℹ️ Dependency 2`

`- ℹ️ ...`

### 🔧 Installation

1. Clone the Adventures-of-AgentO repository:
```sh
git clone https://github.com/Abhijith14/Adventures-of-AgentO
```

2. Change to the project directory:
```sh
cd Adventures-of-AgentO
```

3. Install the dependencies:
```sh
► INSERT-TEXT
```

### 🤖 Running Adventures-of-AgentO

```sh
► INSERT-TEXT
```

### 🧪 Tests
```sh
► INSERT-TEXT
```

---


## 🛣 Roadmap

> - [X] `ℹ️  Task 1: Implement X`
> - [ ] `ℹ️  Task 2: Implement Y`
> - [ ] `ℹ️ ...`


---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the `ℹ️  LICENSE-TYPE` License. See the [LICENSE-Type](LICENSE) file for additional info.

---

## 👏 Acknowledgments

`- ℹ️ List any resources, contributors, inspiration, etc.`

[↑ Return](#Top)

---
