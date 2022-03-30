# CocosCreator 2.4.x demo ad creation

CocosCreator 2.x demo ad production solution, supports CocosCreator 2.4.5 version, the latest version has not been tested yet

## Imprint

-   [English](README.en.md)
-   [简体中文](README.zh-CN.md)
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
build-templates //文件夹
html_generator  //文件夹
Makefile    //文件
```

Corresponding files and folders to the project

## Example of command execution

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

## Playable file generation

After the above command is successfully executed, the corresponding demo ad file will be generated in the project directory "html_generator/out" folder
