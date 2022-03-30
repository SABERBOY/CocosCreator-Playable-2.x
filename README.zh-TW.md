# CocosCreator 2.4.x 试玩广告制作

CocosCreator 2.x 試玩廣告製作方案，支持CocosCreator 2.4.5版本，最新版本暫未進行測試

## 版本說明

-   [英語](README.en.md)
-   [簡體中文](README.zh-CN.md)
-   [繁體中文](README.zh-TW.md)
-   [印地語](README.hi.md)
-   [法語](README.fr.md)
-   [阿拉伯](README.ar.md)

## 前提條件

需要安裝python3
安裝完成後需要安裝第三方庫文件

```shell
pip install simplejson

```

## 可選條件

需要安裝make工具集，安裝完成後配置環境變量，後可以批量執行Makefile文件中的命令

## 文件拷貝

需要拷貝該示例項目的

```shell
build-templates //文件夹
html_generator  //文件夹
Makefile    //文件
```

對應文件與文件夾到項目中

## 命令執行示例

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

以上命令成功執行後，會在項目目錄“html_generator/out”文件夾生成對應試玩廣告文件
