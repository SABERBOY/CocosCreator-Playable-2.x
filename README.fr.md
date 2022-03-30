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

## 可选条件

需要安装make工具集，安装完成后配置环境变量，后可以批量执行Makefile文件中的命令

## copie de fichier

Besoin de copier l'exemple de projet

```shell
build-templates //文件夹
html_generator  //文件夹
Makefile    //文件
```

Fichiers et dossiers correspondants au projet

## Exemple d'exécution de commande

```shell
    // 如果安装make环境变量的话，从对应项目打开控制台，然后执行命令
    make run
```

```shell
    //如果没有安装make环境变量，从对应项目打开控制台，进入
    cd ./html_generator
    // 然后执行对应python命令，最后一个参数对应如下，一般无特殊需求不传入对应参数即可
    NONE = "1",//默认
    DAPI = "2",//DAPI平台
    MRAID = "3",//MARID平台
    MINDWORKS = "4",//MINDWORKS平台
    Pangle = "5"//Pangle平台
```

```shell
    python ./generate_single_html.py
```

## Génération de fichiers lisibles

Une fois la commande ci-dessus exécutée avec succès, le fichier d'annonce de démonstration correspondant sera généré dans le dossier "html_generator/out" du répertoire du projet.
