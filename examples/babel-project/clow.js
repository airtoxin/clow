module.exports = [
  {
    type: "clow-template",
    templates: [
      "https://github.com/airtoxin/clow-template-babel/archive/master.zip"
    ]
  },
  {
    type: "shell",
    commands: [
      "echo 'start clowing...'"
    ]
  },
  {
    type: "template",
    src: {
      cwd: "templates",
      pattern: "**/*"
    },
    dest: ".",
    args: {
      name: null,
      description: null,
      auther: null,
      year: (new Date()).getFullYear()
    }
  },
  {
    type: "npm-install",
    dependencies: [
      "babel-polyfill"
    ],
    devDependencies: [
      "babel-cli",
      "babel-eslint",
      "babel-preset-es2015",
      "babel-preset-es2016",
      "babel-preset-es2017",
      "babel-preset-stage-2",
      "babel-preset-stage-3",
      "babel-register",
      "eslint",
      "eslint-config-airbnb",
      "eslint-plugin-async-await",
      "eslint-plugin-babel",
      "eslint-plugin-import",
      "eslint-plugin-jsx-a11y",
      "eslint-plugin-react",
      "mocha"
    ]
  },
  {
    type: "shell",
    commands: [
      "git init",
      "git add .",
      "git commit -m 'Initialized by clow'"
    ]
  }
];
