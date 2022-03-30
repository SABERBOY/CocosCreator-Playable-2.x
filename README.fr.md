# Création d'annonces de démonstration CocosCreator 2.4.x

Solution de production d'annonces de démonstration CocosCreator 2.x, prend en charge la version CocosCreator 2.4.5, la dernière version n'a pas encore été testée

## Imprimer

-   [Anglais](README.en.md)
-   [Chinois simplifié](README.zh-CN.md)
-   [chinois traditionnel](README.zh-TW.md)
-   [hindi](README.hi.md)
-   [Française](README.fr.md)
-   [arabe](README.ar.md)

## Conditions préalables

Besoin d'installer python3
Une fois l'installation terminée, vous devez installer les fichiers de bibliothèque tiers

```shell
pip install simplejson

```

## condition facultative

Vous devez installer le jeu d'outils make.Une fois l'installation terminée, configurez les variables d'environnement, puis exécutez les commandes dans le Makefile par lots.

## copie de fichier

Besoin de copier l'exemple de projet

```shell
build-templates //folder
html_generator  //folder
Makefile    //file
```

Fichiers et dossiers correspondants au projet

## Exemple d'exécution de commande

Si la variable d'environnement make est installée, ouvrez la console depuis le projet correspondant et exécutez la commande

```shell
    make run
```

Si la variable d'environnement make n'est pas installée, ouvrez la console à partir du projet correspondant et entrez
Exécutez ensuite la commande python correspondante. Le dernier paramètre correspond à ce qui suit. Généralement, il n'y a pas d'exigence particulière pour passer le paramètre correspondant.

```shell
    cd ./html_generator
    NONE = "1",//NORMAL 
    DAPI = "2",//DAPI Platform
    MRAID = "3",//MARID Platform
    MINDWORKS = "4",//MINDWORKS Platform
    Pangle = "5"//Pangle    Platform
```

```shell
    python ./generate_single_html.py
```

## Génération de fichiers lisibles

Une fois la commande ci-dessus exécutée avec succès, le fichier d'annonce de démonstration correspondant sera généré dans le dossier "html_generator/out" du répertoire du projet.
