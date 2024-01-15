# KHStory

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Description

Ce site a pour projet de proposer un résumé de la série de jeux Kingdom Hearts. Plus qu'un simple texte, l'objectif est de proposer les fonctionnalités suivantes:
-Possibilité de filtrer le contenu du texte en fonction des jeux sélectionnés par l'utilisateur afin qu'il ne se spoile pas certains contenus. Cela implique une modification dynamique du texte en fonction des filtres choisis, mais aussi la création de paragraphes alternatifs (un même événement pouvant être présent dans plusieurs jeux mais avec un niveau de détail différent)
-Possibilité d'ajouter des annotations au texte
-Possibilité d'exporter le texte (en respectant les filtres choisis par l'utilisateur)

Pour arriver à ce résultat, en plus des options de navigation visible pour l'utilisateur, le site propose à un utilisateur authentifié de rédiger directement des titres et des paragraphes en indiquant à chaque fois à quels jeux ils sont relatifs, s'ils sont illustrés par des images, et la présence éventuelle de textes alternatifs (ainsi que les jeux relatifs)

Le site se constitue d'une application Angular communiquant avec une API. Aucune base de données n'est utilisée, les éléments étant sauvegardés dans des fichiers json.
