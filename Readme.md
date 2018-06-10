![dashboard](https://github.com/misslecter/dashboard/blob/master/assets/images/logo.png "Dashboard")

Semestrální práce z předmětu **Vývoj klientských aplikací v Javascriptu**

[Live verze](http://anastasiasurikova.com/dashboard/)

## Použité technologie
* SASS
    * kompilace do CSS pomocí Grunt skriptu
    * [Boostrap media breakpoints](https://github.com/misslecter/dashboard/blob/master/assets/scss/vendor/bootstrap-media-breakpoints.scss) (jinak na tak jednoduchou stránku Boostrap nebyl potřeba)
* ES6
    * kompilace do ES5 pomocí Grunt skriptu
    * Babelify - kompilace do ES5
    * Browserify - pro použítí `require`
* jQuery
    * skoro na všechno
    * [Datepicker UI plugin](https://jqueryui.com/datepicker/)
* FontAwesome
    * na ikony
    
## Tabulka hodnoceni
Validita | :white_check_mark: | [result](https://validator.w3.org/nu/?doc=http%3A%2F%2Fanastasiasurikova.com%2Fdashboard%2F)
Cross browser | :white_check_mark: | testováno ve Firefox, Chrome, Safari
Semantické značky | :white_check_mark: | `header`, `nav`, `main`, `section`
Grafika - SVG / Canvas | :white_check_mark: | [logo](https://github.com/misslecter/dashboard/blob/master/assets/images/logo.svg)
Média - Audio/Video | :cry: | 
Formulářové prvky | :white_check_mark: | například [kontaktní stránka](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/index.php#L80)
Offline aplikace | :no_mouth: | LocalStorage funguje offline, ale není tam žádný manifest
Pokročilé selektory | :white_check_mark: | je jich hodně [tu](https://github.com/misslecter/dashboard/tree/master/assets/scss)
Vendor prefixy | :white_check_mark: | například pro [placeholder](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/assets/scss/layout/_form.scss#L22)
CSS3 transformace 2D/3D | :white_check_mark: | [skrytí sidemenu](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/assets/scss/layout/nav.scss#L9)
CSS3 transitions/animations | :white_check_mark: | [všude stejná](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/assets/scss/_variables.scss#L1)
Media queries | :white_check_mark: | [bez nich se nedá žít](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/assets/scss/modules/module.scss#L11)
OOP přístup | :white_check_mark: | například, [každý modul má svou classu](https://github.com/misslecter/dashboard/tree/master/assets/js/modules)
Použití JS frameworku či knihovny | :white_check_mark: | jQuery
Použití pokročilých JS API | :white_check_mark: | Grunt, Babelify, Browserify
Funkční historie | :white_check_mark: | hashtagová navidace mezi stránkami. Aktivní stránka se zobrazí [pomocí CSS](https://github.com/misslecter/dashboard/blob/ca1009468aa346791d425044cf8bd38362c93505/assets/scss/_defaults.scss#L33)
Ovládání medií | :cry: | 
Offline aplikace | :no_mouth: | LocalStorage funguje offline, ale není tam žádný manifest
JS práce se SVG | :white_check_mark: | [změna barvy loga](https://github.com/misslecter/dashboard/blob/master/assets/js/app/Svg.js)


