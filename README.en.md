# CocosCreator 2.4.x demo ad creation

CocosCreator 2.x demo ad production solution, supports CocosCreator 2.4.5 version, the latest version has not been tested yet

## Imprint

-   [English](README.en.md)
-   [Simplified Chinese](README.zh-CN.md)
-   [traditional Chinese](README.zh-TW.md)
-   [Hindi](README.hi.md)
-   [French](README.fr.md)
-   [Arab](README.ar.md)

## Preconditions

Need to install python3
After the installation is complete, you need to install third-party library files

```shell
pip install simplejson

```

## optional condition

You need to install the make toolset. After the installation is complete, configure the environment variables, and then execute the commands in the Makefile in batches.

## file copy

Need to copy the sample project

```shell
build-templates //folder
html_generator  //folder
Makefile    //file
```

Corresponding files and folders to the project

## Example of command execution

If the make environment variable is installed, open the console from the corresponding project and execute the command

```shell
    make run
```

If the make environment variable is not installed, open the console from the corresponding project and enter
Then execute the corresponding python command. The last parameter corresponds to the following. Generally, there is no special requirement to pass in the corresponding parameter.

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

## Playable file generation

After the above command is successfully executed, the corresponding demo ad file will be generated in the project directory "html_generator/out" folder
