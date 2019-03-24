workflow "Main" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "docker://node:11"
  runs = "yarn"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "docker://node:11"
  runs = "yarn"
  args = "lint"
}

action "Master" {
  needs = "Lint"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Build" {
  needs = "Master"
  uses = "docker://node:11"
  runs = "yarn"
  args = "build"
  env = {
    NODE_ENV = "production"
    PORT = "80"
    URL = "https://landonschropp.com"
  }
}

action "Validate HTML" {
  needs = "Build"
  uses = "docker://node:11"
  runs = "yarn"
  args = "validate-html"
}

action "Publish" {
  needs = "Validate HTML"
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "build"
  }
  secrets = ["GITHUB_TOKEN"]
}
