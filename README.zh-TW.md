# CocosCreator 2.4.x 試玩廣告製作

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
build-templates //folder
html_generator  //folder
Makefile    //file
```

對應文件與文件夾到項目中

## 命令執行示例

如果安裝make環境變量的話，從對應項目打開控制台，然後執行命令

```shell
    make run
```

如果沒有安裝make環境變量，從對應項目打開控制台，進入
然後執行對應python命令，最後一個參數對應如下，一般無特殊需求不傳入對應參數即可

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

以上命令成功執行後，會在項目目錄“html_generator/out”文件夾生成對應試玩廣告文件
