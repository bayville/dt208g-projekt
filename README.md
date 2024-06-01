# DT208g - Projekt
Det här repot innehåller koden för webbplatsen skapat för projektuppfigten i kursen DT208G - Programmering i TypeScript. Syftet med arbetet har varit att använda sig av programmeringsspråket TypeScript samt frontend ramverket Angular och dess funktioner för att skapa en webbplats som hämtar och läser in data från en extern tjänst.

[Livedemo av webbplatsen](https://rattviksuniv.bayville.se)

## Installation

För att installera och köra projektet lokalt, följ dessa steg:

1. Klona GitHub-repot:

```bash
git clone https://github.com/bayville/dt208g-projekt.git
npm install
ng serve
```


## Kort information om webbplatsen
- Webbplatsen är byggd med 11 komponenter för olika sektioner och ytterligare 4 komponetner för de olika sidorna
- Den implementerar Angulars inbyggda routing
- Den använder local storage för att lagra och hämta kurser sparade i ramschemat
- Den innerhåller startsida, kurssida, ramschema samt en 404-sida.
- Den använder sig Angular Material / Material UI för att visa data i tabeller och implementera filtrering, paginering och sortering

## Modeller
### Course
``` typescript
export interface Course {
    courseCode: string,
    subjectCode: string,
    level: string,
    progression: string,
    courseName: string,
    points: number,
    institutionCode: string,
    subject: string,
    syllabus: string
}
```
### Response
``` typescript
export interface Response {
    message?: string;
    status: boolean;
    error?: Error;
}
```

## Services

### Course
Hämtar data från en extern JSON-fil, och returnerar den som en observable.


### Schedule
Hämtar och skriver sparade kurser till local storage. Innehåller metoder för att lägga till, ta bort och rensa alla  sparade kurser. Innehåller även en metod för att returnerar totalt antal poäng för sparade kurser.

----

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

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
