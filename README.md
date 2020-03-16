# Fido

This is a monorepo containing source for a simple platform game made with
JS, HTML, and CSS in 2 implementations.

1. vanilla - vanilla Typescript built with Parcel. Converted from Eloquent Javascript's plain javascript implementation
2. reactified - React + Typescript + Styled Components. (in progress)

Credit to [_Eloquent Javascript 3e_](https://eloquentjavascript.net/16_game.html) as well as [Dark Blue](http://www.lessmilk.com/games/10), the original game inspiration by Thomas Palef.

This repository is a playground for playing with modern web technologies to
create a simple platform game with increasing complexity to explore new tech
step-by-step.

Initially, this repository was simple working through [Eloquent Javascript's Chapter 16](https://eloquentjavascript.net/16_game.html)
but attempting to use es6 classes as a challenge. Partway through that effort, the
codebase was transformed to use [Typescript](https://www.typescriptlang.org/) using [Parcel](https://parceljs.org/) as an exploration of Parcel as a build tool
and also vanilla Typescript(outside of frameworks/libraries).

Later, the repository was split up using [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and the `reactified` workspace
was added to try Parcel with React + Typescript and also to explore [Styled Components](https://styled-components.com/).
