# إنشاء إعلان تجريبي CocosCreator 2.4.x

حل إنتاج الإعلانات التجريبية CocosCreator 2.x ، يدعم إصدار CocosCreator 2.4.5 ، ولم يتم اختبار أحدث إصدار حتى الآن

## بصمة

-   [إنجليزي](README.en.md)
-   [الصينية المبسطة](README.zh-CN.md)
-   [الصينية التقليدية](README.zh-TW.md)
-   [هندي](README.hi.md)
-   [الفرنسية](README.fr.md)
-   [عربى](README.ar.md)

## الشروط المسبقة

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
build-templates //文件夹
html_generator  //文件夹
Makefile    //文件
```

الملفات والمجلدات المقابلة للمشروع

## مثال على تنفيذ الأوامر

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

## جيل ملف للعب

بعد تنفيذ الأمر أعلاه بنجاح ، سيتم إنشاء ملف الإعلان التجريبي المقابل في مجلد "html_generator / out" في دليل المشروع
