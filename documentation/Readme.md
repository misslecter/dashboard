# Dashboard
Semestrální práce z předmětu **Vývoj klientských aplikací v Javascriptu**

![dashboard](https://github.com/misslecter/dashboard/blob/master/documentation/images/dashboard-filled.png "Dashboard")


## Cíl
Cílem aplikace bylo vytvořit Dashboard, který by obsahoval:
* Poznámky
* Seznam úkolů
* Odpočítávač dnů
* ~~Fotografie~~
* ~~Propojení se sociálními sítěmi~~

Funkcionalita jednotlivých modulů:
* přidání
* odebrání
* úpravy
* ~~dragable~~

## Stránky
Aplikace má k dispozici 3 stránky:
- [Welcome screen](http://anastasiasurikova.com/dashboard/#welcome)
  - zobrazí se pouze novému návštěvníkovi (po uzavření se do localStorage uloží hodnota `welcomeClosed = 1`)
  - nabízí uživateli 2 možnosti pokročit:
    - otevřít prázdný Dashboard
    - načíst vzorová data
    
    ![welcome](https://github.com/misslecter/dashboard/blob/master/documentation/images/welcome.png "Dashboard")
    
    
- [Dashboard](http://anastasiasurikova.com/dashboard/#dashborad)
  - hlavní obrázovka aplikace
  - zobrazí se defaultně jako první, když již byl odkliknutý Welcome screen
  
   ![dashboard](https://github.com/misslecter/dashboard/blob/master/documentation/images/dashboard.png "Dashboard")
   
  
- [Contact](http://anastasiasurikova.com/dashboard/#contact)
  - kontaktní formulář na webdevelopera
  
   ![contact](https://github.com/misslecter/dashboard/blob/master/documentation/images/contact.png "Dashboard")
   
## Dashboard - hlavní pracovní plocha
* Hlavička
    * "Burger" tlačítko na otevření sidemenu
        * v menu najdeme seznam všech aktivních modulů
    * Aktuální čas
    * Odkaz na stránku [Contact](http://anastasiasurikova.com/dashboard/#contact)
* Hlavní plocha
    * Místo, kam se přidávají nové moduly
* Tlačítko na přidání nového modulu
    * nová poznámka
    * nový seznam úkolů
    * nový odpočítávač dnů


![dashboard](https://github.com/misslecter/dashboard/blob/master/documentation/images/dashboard-opened.png "Dashboard")