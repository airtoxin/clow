{
  tasks: [
    {
      type: "mustache",
      from: "template/**/*",
      to: "$PWD"
    },
    {
      type: "npm",
      dependencies: [
        "react-desktop"
      ],
      devDependencies: [
        "babel-cli",
        "babel-preset-es2015"
      ],
      peerDependencies: [
        "react"
      ]
    },
    {
      type: "shell",
      runs: [
        "git-ignore > .gitignore"
      ]
    }
  ]
}
