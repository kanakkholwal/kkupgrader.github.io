try{var systemThemeDark,theme=window.localStorage.getItem(""),systemThemeMode=window.localStorage.getItem("system-theme-mode");if(("true"===systemThemeMode||!theme)&&window.matchMedia){var systemTheme=window.matchMedia("(prefers-color-scheme: dark)");systemThemeDark=systemTheme&&systemTheme.matches}var darkTheme='"dark"'===theme||Boolean(systemThemeDark);darkTheme&&document.body.classList.add("dark")}catch(e){}
