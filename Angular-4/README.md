# Angular4
Mes notes sur angular4

## Installation de nodejs

> Si vous êtes fan de *c9.io* pour creer vos projet comme moi
> L'installation de angular4 prend 6 minutes car nous somme sur la version gratuit de c9

```batch
    nvm install node
    nvm use X.X.X
    nvm alias default vX.X.X
    npm install -g npm
    npm install -g @angular/cli
```

### Installer Angular4

On supprimer tout version d'angular 4 avant de mettre à jour.

```batch
npm uninstall -g angular-cli @angular/Cli@latest
npm cache clean
npm install -g @angular/cli
```

### Creation d'un projet

```batch
ng new my-app
cd my-app
```

### Installer bootstrap
```batch
npm install --save bootstrap
```
  - Modifier dans `angular-cli.json` "styles" rajouter le lien complet
  - Modifier dans `app/app.module.ts` bootstrap : [AppComponent]

### Creer un component
```batch
ng g c mycomponent --spec false
```
