#!/usr/bin/python3

import os
import time
import sys
from enum import Enum
from html.parser import HTMLParser
import base64
import simplejson
import math

if sys.getdefaultencoding() != 'utf-8':
    reload(sys)
    sys.setdefaultencoding('utf-8')

settingMatchKey = '{$settings$}'
mainMatchKey = '{$main$}'
engineMatchKey = '{$cocosengine$}'
projectMatchKey = '{$project$}'
resMapMatchKey = '{$resMap$}'
ttfMapMatchKey = '{$ttfMap$}'
indexInternalMatchKey = '{$indexInternal$}'
dapiMatchKey = '{$dapi$}'
dapiScipt = '''
function getScript(e, i) {
      var n = document.createElement("script");
      n.type = "text/javascript", n.async = !0, i && (n.onload = i), n.src = e, document.head.appendChild(n)
    }

    function parseMessage(e) {
      var i = e.data, n = i.indexOf(DOLLAR_PREFIX + RECEIVE_MSG_PREFIX);
      if (-1 !== n) {
        var t = i.slice(n + 2);
        return getMessageParams(t)
      }
      return {}
    }

    function getMessageParams(e) {
      var i, n = [], t = e.split("/"), a = t.length;
      if (-1 === e.indexOf(RECEIVE_MSG_PREFIX)) {
        if (a >= 2 && a % 2 === 0) for (i = 0; a > i; i += 2) n[t[i]] = t.length < i + 1 ? null : decodeURIComponent(t[i + 1])
      } else {
        var o = e.split(RECEIVE_MSG_PREFIX);
        void 0 !== o[1] && (n = JSON && JSON.parse(o[1]))
      }
      return n
    }

    function getDapi(e) {
      var i = parseMessage(e);
      if (!i || i.name === GET_DAPI_URL_MSG_NAME) {
        var n = i.data;
        getScript(n, onDapiReceived)
      }
    }

    function invokeDapiListeners() {
      for (var e in dapiEventsPool) dapiEventsPool.hasOwnProperty(e) && dapi.addEventListener(e, dapiEventsPool[e])
    }

    function onDapiReceived() {
      dapi = window.dapi, window.removeEventListener("message", getDapi), invokeDapiListeners()
    }

    function init() {
      window.dapi.isDemoDapi && (window.parent.postMessage(DOLLAR_PREFIX + SEND_MSG_PREFIX + JSON.stringify({state: "getDapiUrl"}), "*"), window.addEventListener("message", getDapi, !1))
    }

    var DOLLAR_PREFIX = "$$", RECEIVE_MSG_PREFIX = "DAPI_SERVICE:", SEND_MSG_PREFIX = "DAPI_AD:",
            GET_DAPI_URL_MSG_NAME = "connection.getDapiUrl", dapiEventsPool = {}, dapi = window.dapi || {
              isReady: function () {
                return !1
              }, addEventListener: function (e, i) {
                dapiEventsPool[e] = i
              }, removeEventListener: function (e) {
                delete dapiEventsPool[e]
              }, isDemoDapi: !0
            };
    init();'''

linkJSMatchKey = '{$linkJS$}'
pangleLinkJS = "https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js"
fileByteList = ['.png', '.jpg', '.mp3', '.ttf', '.plist', 'txt']

base64PrefixList = {
    '.png': 'data:image/png;base64,',
    '.jpg': 'data:image/jpeg;base64,',
    '.mp3': '',
    '.ttf': '',
    '.plist': 'data:text/plist;base64,'
}


class GenerateType(Enum):
    NONE = "1",
    DAPI = "2",
    MRAID = "3",
    MINDWORKS = "4",
    Pangle = "5"


def read_in_chunks(filePath):
    extName = os.path.splitext(filePath)[1]
    if extName in fileByteList:
        file_object = open(filePath, 'rb')
        base64Str = base64.b64encode(file_object.read())
        base64Prefix = base64PrefixList[extName]
        if base64Prefix != None:
            base64Str = bytes(base64Prefix, 'utf-8') + base64Str
            return base64Str
    elif extName == '':
        return None

    file_object = open(filePath, encoding='utf-8')
    return file_object.read()


def writeToPath(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)


def getResMap(jsonObj, path, resPath):
    fileList = os.listdir(path)
    for fileName in fileList:
        absPath = path + '/' + fileName
        if (os.path.isdir(absPath)):
            getResMap(jsonObj, absPath, resPath)
        elif (os.path.isfile(absPath) and absPath.find("main/index.js") == -1):
            dataStr = read_in_chunks(absPath)
            if dataStr != None:
                absPath = absPath.replace(resPath + '/', '')
                jsonObj[absPath] = dataStr


def getResMapScript(resPath):
    jsonObj = {}
    getResMap(jsonObj, resPath, resPath)
    jsonStr = simplejson.dumps(jsonObj)
    resStr = str("window.resMap = ") + jsonStr
    return resStr


# This issue is fixed in Cocos Creator 2.x
def fixEngineError(engineStr):
    newEngineStr = engineStr.replace("t.content instanceof Image", "t.content.tagName === \"IMG\"", 1)
    return newEngineStr


def addPlistSupport(mainStr):
    newMainStr = mainStr.replace("json: jsonBufferHandler,", "json: jsonBufferHandler, plist: jsonBufferHandler,", 1)
    return newMainStr


def integrate(projectRootPath, ct):
    currentType = gettype(ct)
    htmlPath = projectRootPath + '/build/web-mobile/index.html'
    newHtmlPath = './out/index.html' if currentType == GenerateType.Pangle else './out/{}_index.html'.format(
        str(currentType).replace('.', '_'))
    settingScrPath = projectRootPath + '/build/web-mobile/src/settings.js'
    mainScrPath = projectRootPath + '/build/web-mobile/main.js'
    engineScrPath = projectRootPath + '/build/web-mobile/cocos2d-js-min.js'
    projectScrPath = projectRootPath + '/build/web-mobile/assets/main/index.js'
    resPath = projectRootPath + '/build/web-mobile/assets'
    indexInternalScrPath = projectRootPath + '/build/web-mobile/assets/internal/index.js'

    htmlStr = read_in_chunks(htmlPath)
    settingsStr = read_in_chunks(settingScrPath)
    htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)

    projectStr = read_in_chunks(projectScrPath)
    htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)

    mainStr = read_in_chunks(mainScrPath)
    mainStr = addPlistSupport(mainStr)
    htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)

    engineStr = read_in_chunks(engineScrPath)
    engineStr = fixEngineError(engineStr)
    htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

    resStr = getResMapScript(resPath)
    htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

    resStr = read_in_chunks(indexInternalScrPath)
    htmlStr = htmlStr.replace(indexInternalMatchKey, resStr, 1)
    if currentType == GenerateType.DAPI:
        htmlStr = htmlStr.replace(dapiMatchKey, dapiScipt, 1)
    else:
        htmlStr = htmlStr.replace(dapiMatchKey, "", 1)
    if currentType == GenerateType.Pangle:
        # 添加linkJS
        htmlStr = htmlStr.replace(linkJSMatchKey, pangleLinkJS, 1)

    writeToPath(newHtmlPath, htmlStr)

    targetFileSize = os.path.getsize(newHtmlPath)
    targetFileSizeInMegabyte = math.ceil(targetFileSize * 1000 / (1024 * 1024)) / 1000

    print("===================  All Done! =================== ")
    print("Target file = {}, with size {}M".format(newHtmlPath, targetFileSizeInMegabyte))


def gettype(current_type):
    if current_type == "1":
        return GenerateType.NONE
    if current_type == "2":
        return GenerateType.DAPI
    if current_type == "3":
        return GenerateType.MRAID
    if current_type == "4":
        return GenerateType.MINDWORKS
    if current_type == "5":
        return GenerateType.Pangle
    return GenerateType.NONE


if __name__ == '__main__':
    # workDir = os.getcwd() + "/.."
    # integrate(workDir)
    # print("args:len:{},ps:{}".format(len(sys.argv), sys.argv))
    # print(type(sys.argv[1:][0]))
    # typeMember = sys.argv[1:][0]
    typeMember = "4"
    #
    #
    # def gettype():
    #     for generateType in GenerateType:
    #         if int(typeMember) == generateType.value[0]:
    #             return generateType
    #     return GenerateType.NONE
    #
    #
    # print(gettype())
