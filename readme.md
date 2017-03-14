# gulp-lab

## 原始檔
```
-src
|---css
|---images
|---javascripts
|---scss
-html
```

## 輸出
```
-assets
|---css
|---img
|---js
-build (修正路徑等)
```

##目前問題
主要是在壓縮js部分，
我打算分成兩部分，
常用的會壓成`main.min.js`
並透過
```
<!-- build:js -->
    <script src="../src/javascripts/main/1-jquery-2.2.4.min.js"></script>
    <script src="../src/javascripts/main/2-global.js"></script>
<!-- endbuild -->
```
```
.pipe(htmlreplace({
    'js': '../assets/js/main.min.js'
}))
```

可以置換原始html中的路徑
但是其他plugin
```
slick
|---slick.js
|---slick-ui.js
```
我會將它壓縮並更名為`資料夾名.min.js`
原先html中路徑為`<script src="../src/javascripts/slick/slick.js"></script>`
但是到build後
正確路徑應該為`<script src="../assets/js/slick.min.js"></script>`
目前我試過將`src / javascripts / js`分別取代為`assets / js / min.js`
###但是我無法處理如何將`slick/slick.min.js`變成`/slick.min.js`









