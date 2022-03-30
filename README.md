# CocosCreator 2.4.x 试玩广告制作

CocosCreator 2.x 试玩广告制作方案，支持CocosCreator 2.4.5版本，最新版本暂未进行测试

## 版本说明

- [English](README.en.md)
- [简体中文](README.zh-CN.md)
- [繁体中文](README.zh-TW.md)
- [हिंदी](README.hi.md)
- [Française](README.fr.md)
- [عربى](README.ar.md)

## 前提条件

需要安装python3
安装完成后需要安装第三方库文件

```shell
pip install simplejson

```

## 可选条件

需要安装make工具集，安装完成后配置环境变量，后可以批量执行Makefile文件中的命令

## 文件拷贝

需要拷贝该示例项目的

```shell
build-templates //folder
html_generator  //folder
Makefile    //file
```

对应文件与文件夹到项目中

## 命令执行示例

如果安装make环境变量的话，从对应项目打开控制台，然后执行命令

```shell
    make run
```

如果没有安装make环境变量，从对应项目打开控制台，进入
然后执行对应python命令，最后一个参数对应如下，一般无特殊需求不传入对应参数即可

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

## Playable文件生成

以上命令成功执行后，会在项目目录“html_generator/out”文件夹生成对应试玩广告文件
