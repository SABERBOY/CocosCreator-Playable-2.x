# إنشاء إعلان تجريبي CocosCreator 2.4.x

CocosCreator 2.x 试玩广告制作方案，支持CocosCreator 2.4.5版本，最新版本暂未进行测试

## بصمة

-   [إنجليزي](README.en.md)
-   [الصينية المبسطة](README.zh-CN.md)
-   [الصينية التقليدية](README.zh-TW.md)
-   [هندي](README.hi.md)
-   [الفرنسية](README.fr.md)
-   [عربى](README.ar.md)

## 前提条件

تحتاج إلى تثبيت python3
بعد اكتمال التثبيت ، تحتاج إلى تثبيت ملفات مكتبة الجهات الخارجية

```shell
pip install simplejson

```

## شرط اختياري

تحتاج إلى تثبيت مجموعة أدوات make. بعد اكتمال التثبيت ، قم بتكوين متغيرات البيئة ، ثم قم بتنفيذ الأوامر في Makefile على دفعات.

## نسخة الملف

تحتاج إلى نسخ نموذج المشروع

```shell
build-templates //folder
html_generator  //folder
Makefile    //file
```

الملفات والمجلدات المقابلة للمشروع

## مثال على تنفيذ الأوامر

إذا تم تثبيت متغير البيئة ، فافتح وحدة التحكم من المشروع المقابل وقم بتنفيذ الأمر

```shell
    make run
```

إذا لم يتم تثبيت متغير البيئة ، فافتح وحدة التحكم من المشروع المقابل وادخل
ثم نفّذ أمر python المطابق. تتوافق المعلمة الأخيرة مع ما يلي. بشكل عام ، لا يوجد متطلب خاص لتمرير المعلمة المقابلة.

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

## جيل ملف للعب

以上命令成功执行后，会在项目目录“html_generator/out”文件夹生成对应试玩广告文件
