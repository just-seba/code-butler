# Changelog

## [3.0.2](https://github.com/just-seba/code-butler/compare/dotnet-code-butler-v3.0.1...dotnet-code-butler-v3.0.2) (2024-06-04)


### 🐛 Bug Fixes

* Handle explicit interface implementations by sorting them between `public` and `internal` members ([45b870c](https://github.com/just-seba/code-butler/commit/45b870c1f1867ab75295396b8760203b3f095595))

## [3.0.1](https://github.com/just-seba/code-butler/compare/dotnet-code-butler-v3.0.0...dotnet-code-butler-v3.0.1) (2024-03-16)


### 🐛 Bug Fixes

* Fixes README links. Adds missing documentation on --no-sort-members-by-alphabet. ([f2506b4](https://github.com/just-seba/code-butler/commit/f2506b47181e70a991d2b963876c9bb3289b69fe))

## [3.0.0](https://github.com/just-seba/code-butler/compare/dotnet-code-butler-v2.2.1...dotnet-code-butler-v3.0.0) (2024-03-16)


### ⚠ BREAKING CHANGES

* Publishes CodeButler as a dotnet tool. (see: [a0541a0](https://github.com/just-seba/code-butler/commit/a0541a028d98ca8126ad706c512dfddcc5d2ea09))

### 🚀 Features

* Command line flag `--no-sort-members-by-alphabet` to disable sorting members by alphabet. (see: [2d24189](https://github.com/just-seba/code-butler/commit/2d241899df50e0b0b47339a2b67de0abb41b6aa7)) ([7ca7525](https://github.com/just-seba/code-butler/commit/7ca75252ccf0dcae9f6ed32eb186d7fd184ff447))
* Publishes CodeButler as a dotnet tool. (see: [a0541a0](https://github.com/just-seba/code-butler/commit/a0541a028d98ca8126ad706c512dfddcc5d2ea09)) ([3ed6a5e](https://github.com/just-seba/code-butler/commit/3ed6a5e09d43365417b8c13efd4f8cf4ee75b9db))
* Support for `using`statements below file-scoped `namespace`declaration. (see: [be77618](https://github.com/just-seba/code-butler/commit/be776186cf67aa58fca9c78a807625ccdfef2de1)) ([83b91eb](https://github.com/just-seba/code-butler/commit/83b91eb81d208b041747386577f10b81e03dfc32))


### 📦️ Build System, Dependencies

* Adds Directory.Build.props ([3bae4e5](https://github.com/just-seba/code-butler/commit/3bae4e59582c6c238f506b328332e5b11dfa8b60))

## 2.2.1 (April 26, 2023)

- Fixes README typo 😅

## 2.2.0 (April 26, 2023)

- Adds support for `required` keyword ([#17](https://github.com/Projektanker/code-butler/issues/17))

## 2.1.0 (September 28, 2022)

- Adds support for `global using` ([#14](https://github.com/Projektanker/code-butler/issues/14))

## 2.0.0 (March 07, 2022)

- Adds support for C# 10 record struct ([#13](https://github.com/Projektanker/code-butler/issues/13))
- ⚠️ Breaking change: Required runtime changed from .NET 5 to .NET 6 (LTS)

## 1.4.0 (September 29, 2021)

- New features by [pmahend1](https://github.com/pmahend1)
  - Added same keybinding as Code Maid
    - Ctrl+M Ctrl+Space 🪟 Windows and 📺 Linux
    - Cmd+M Cmd+Space 🍎 Mac
  - Added editor context menu for right click ➔ choose Clean up command
- Available on [open-vsx.org](https://open-vsx.org/extension/projektanker/code-butler)

## 1.3.0 (March 22, 2021)

- Improvements by [loreggia](https://github.com/loreggia)
  - Added the ability to run code cleanup on save
  - Added a configuration switch for the automatic cleanup (disabled by default)

## 1.2.1 (January 31, 2021)

Fixes README typo 😅

## 1.2.0 (January 31, 2021)

- Bug fixes:
  - Removes buggy member padding fix feature. It is replaced by a simpler approach due to lack of time:
    - Removes trailing whitespace.
    - Removes consecutive blank lines. between the members. Adds a blank line between members if there is none.

## 1.1.0 (December 25, 2020)

- Bug fixes:
  - Do not add leading blank line before namespace declaration if no using directives exists.
  - README typo
- Improvements:
  - [VS code extension](https://marketplace.visualstudio.com/items?itemName=projektanker.code-butler): Execute `Format Document` after cleaning C# file ([#1](https://github.com/Projektanker/code-butler/issues/1))
  - [VS code extension](https://marketplace.visualstudio.com/items?itemName=projektanker.code-butler): Better error and information messages.
