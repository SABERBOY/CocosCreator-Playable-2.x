# CocosCreator 2.4.x 试玩广告制作

حل إنتاج الإعلانات التجريبية CocosCreator 2.x ، يدعم إصدار CocosCreator 2.4.5 ، ولم يتم اختبار أحدث إصدار حتى الآن

## بصمة

-   [إنجليزي](README.en.md)
-   [الصينية المبسطة](README.zh-CN.md)
-   [الصينية التقليدية](README.zh-TW.md)
-   [هندي](README.hi.md)
-   [الفرنسية](README.fr.md)
-   [عربى](README.ar.md)

## الشروط المسبقة

需要安装python3
安装完成后需要安装第三方库文件

```shell
pip install simplejson

```

## شرط اختياري

تحتاج إلى تثبيت مجموعة أدوات make. بعد اكتمال التثبيت ، قم بتكوين متغيرات البيئة ، ثم قم بتنفيذ الأوامر في Makefile على دفعات.

## 文件拷贝

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

بعد تنفيذ الأمر أعلاه بنجاح ، سيتم إنشاء ملف الإعلان التجريبي المقابل في مجلد "html_generator / out" في دليل المشروع
