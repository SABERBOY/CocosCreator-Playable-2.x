# CocosCreator 2.4.x 试玩广告制作

CocosCreator 2.x 试玩广告制作方案，支持CocosCreator 2.4.5版本，最新版本暂未进行测试

## 版本说明

-   [英语](README.en.md)
-   [简体中文](README.zh-CN.md)
-   [繁体中文](README.zh-TW.md)
-   [印地语](README.hi.md)
-   [法语](README.fr.md)
-   [阿拉伯](README.ar.md)

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
build-templates //文件夹
html_generator  //文件夹
Makefile    //文件
```

对应文件与文件夹到项目中

## 命令执行示例

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

## Playable文件生成

以上命令成功执行后，会在项目目录“html_generator/out”文件夹生成对应试玩广告文件
