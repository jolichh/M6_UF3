# Buscador de pisos
## Introducció
Com a culminació de les activitats individuals fetes fins ara, es demana juntar tot el que s’ha fet en un projecte més gran que tingui la suma de molt del que s’ha fet fins ara.

## Enunciat
Les entitats que es tractaran són:
**Immobles**
- Latitud
- Longitud
- Preu
- Carrer (nom)
- No
- Pis
- Porta
- Via (tipus: carrer, torrent, avinguda...)
- Escala
- Codi postal
- Població
- Característiques
- Barri
- Districte

**Usuaris**
- Username
- DNI
- Nom
- Cognom
- Email
- Telèfon

Descarrega’t la carpeta del projecte, hi trobaràs dos php amb els dos formularis de registre, un css i un js.

## Formulari de registre d’usuaris
Comencem pel formulari de registre d’usuaris, que és una mica més senzill. Realitzarem la validació del
formulari mitjançant dos mètodes. El primer mètode validarà tots els camps en fer click al botó de registre
i el segon a mida que l’usuari vagi validant les diferents caselles.

**Primer mètode:** En fer click al botó de registre el script haurà de validar cada camp i posteriorment, si tot és correcte, processar les dades. La part del client s’encarregarà de fer aquesta validació i ho recomano fer mitjançant jquery.

### Passos a realitzar:
- Detectar quan l’usuari clica el botó.
    ```
    $('#form-user-register').submit(function(e) {
    e.preventDefault();
    });

    *La funció e.preventDefault() la posarem perquè no faci el submit, és a dir perquè primer faci totes les comprovacions i després ja farem el submit, però ens interessa que si hi ha algun camp erroni no enviï les dades.

    Una vegada ho tinguis fes un alert per comprovar que detecta correctament l’acció.

- Comprova que els valors dels inputs Nom i Cognoms estan plens, en el cas que ho estiguin afegeix la classe **is-valid** a l’input. Si el camp està buit afegeix la classe is-invalid i una notificació amb la classe **valid-feedback** o **invalid-feedback** al div de sota l’input. Afegeix un missatge per a que l’usuari pugui entendre quin és el seu error mitjançant la funció **html**.

    Funcions: addClass, removeClass, html

- Comprova que el camp del DNI no estigui buit, en el cas que ho estigui fes el mateix que amb el nom i cognom. En el cas que estigui emplenat comprova que el dni és correcte mitjançant la funció que trobaràs a l’arxiu **functions.js validateNIF_NIE.**
- Realitza una funció que en fer click a l’@ del camp username generi un nom d’usuari a partir del nom, el cognom i el dni.

    El format serà el següent:
    
    Primera lletra del nom en minúscula, les quatre primeres lletres del cognom amb la primera en majúscula i els números de les posicions senars del dni.

    Exemple: 
    
            Marta Millan Lombraña 66664058F → mMill6645
            Pere Riu Martinez 37122404J → pRium3120
            Joana Mas Y6233349H → jMasy234 (cas NIE)

    En el cas que el primer cognom no tingui més de quatre lletres agafarem el segon cognom. En el cas que no hi hagi dos cognoms ens quedarem només amb les lletres que hi hagi al primer cognom. Una recomanació per a fer-ho és agafar el valor del camp, treure-li l’espai per a que quedin els dos cognoms junts, posar-ho tot en minúscules i la primera en majúscula i agafar les primeres quatre lletres.
    
    Funcions: toLowerCase, toUpperCase, slice, replace, click
- Comprova que els camps del correu electrònic i del telèfon no estigui buit, en el cas que ho estigui fes el mateix que amb el nom, el cognom i el DNI. En el cas que estiguin emplenats comprova que el format és correcte mitjançant les funcions **validateEmail** i [validatePhone](https://www.w3resource.com/javascript/form/phone-no-validation.php) de l’arxiu **functions.js**

**IMPORTANT:** segurament moltes de les funcions que has realitzat són semblants i les pots optimitzar, per exemple la validació d’un camp buit o emplenat. Intenta optimitzar al màxim el codi per tal que quedi net.

**Segon mètode:** Ara el que ens interessa és que l’usuari, a mida que vagi omplint els camps del formulari vagi veient si estan ben omplerts o no. Farem un Real Time Validation.

Investiga la funció [focusout](https://api.jquery.com/focusout/) de jQuery per a fer-ho.

Exercici: modifica les funcions per a que la validació es vagi fent a mida que surts dels diferents camps.

## Formulari de registre de pisos
Exercici: fer una previsualització de les dades escrites en el div de la dreta.
```
<div class="col-6 pt-5">
<h4 id="nomPis">Nom + barri, districte</h4>
<p id="dir">Via Nom Número Pis Escala Porta · CP · Districte · Barri ·
Pobliacio</p>
<p id="preu">300€</p>
<p>Text</p>
</div>
```

### Javascript asíncron
Igual que vas fer amb l’exercici de les selects html relacionades, has d’implementar el mateix en aquest exercici. Es recomana AJAX.
1. Carregar el segon select en funció del que s’hagi escollit al primer
    1) Deshabilita el select dels barris, ho pots fer per jquery mitjançant la funció prop o a través de l’html o css.
    2) Mitjançant una consulta SQL fes que en el select dels districtes es carregui de manera dinàmica amb els valors de la taula.
    3) Fes una funció que detecti quan el selector dels districtes es canvia i fes un alert amb el valor de l’opció seleccionada. Busca com detectar el valor de l’opció seleccionada.
    Funció: prop, change
    4) Crea un arxiu PHP que donat un id de districte faci una consulta a la taula de barris i retorni els barris en ordre ascendent. Executa aquest fitxer i assegura’t del bon funcionament. Fes que l’id del districte sigui una variable POST que serà la que passarem a través d’AJAX.
    5) Fes una crida AJAX a aquest arxiu PHP passant-li com a data l’id seleccionat
    6) Modifica l’arxiu PHP per a que retorni les diferents opcions del select

### Exercicis optatius:
2. Comprova que el mail de l’usuari no consta a la base de dades i mostra un missatge d’error o de validació en cada cas.
3. Comprova que el dni de l’usuari no consta a la base de dades i mostra un missatge d’error o de validació en cada cas.