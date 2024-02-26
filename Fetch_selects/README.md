# Fetch selects
En aquest exercici realitzarem els selectors de categories.

## Interfície HTML/PHP
El primer que haurem de fer serà crear el primer selector. Per a fer-ho haurem de fer una consulta a la
taula de categories de la base de dades i crear les diferents opcions del selector.
Una bona pràctica seria que el value tingués l’id.
Crea també un select buit amb un id específic per a la subcategoria.

## PHP
Has de crear un servei php que donat un id de categoria et retorni un JSON amb totes les subcategories associades.

Inicialment fes que la categoria sigui estàtica (per fer proves) i més endavant ja farem que sigui la que
passem pel fetch.

1. Realitza la connexió a la base de dades
2. Declara una variable $cat en la que recollirem la categoria seleccionada (inicialitza-la amb un id estàtic per fer proves)
3. Fes una consulta a la taula de subcategories i selecciona aquelles que tinguin com a id de categoria pare la de la variable $cat
4. Volem retornar un json que tingui una array d’objectes, per això has de declarar una array.
    ````
    $return = array();
5. Crea un objecte i en les seves propietats afegeix el nom que voldràs mostrar al selector i el seu valor
    ```
    $object = new stdClass();
    $object->nom = $row["nom"];
    $object->id = $row["id"];
6. Afegeix aquest objecte a l’array $return
7. Retorna un json_encode de l’array
    ```
    echo json_encode($return);
*Realitza proves, si et connectes al servei a través de la URL hauries de poder visualitzar els resultats. És primordial que ho facis, perquè mitjançant el fetch és més complicat visibilitzar els errors.

## JS
1. Detecta quan es modifica el primer selector.
2. Recull el valor seleccionat, ho pots fer mitjançant un this.value (fes un console.log per comprovar que sigui correcte)
3. Crea la crida al servei php, per a fer-ho utilitzarem fetch.
    ```
    fetch("getSubCats.php", options)
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {});
    ```
    El primer then processa la resposta i la passa a json.

    El segon then ens retorna un objecte o un array d’objectes i serà amb el que podrem treballar.

    Catch és per si volem mostrar algun error. Pots fer un console.log(error) per visualitzar els possibles errors.

    [FetchApi](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

4. Options són les opcions que especificarem en l’enviament de dades, per exemple, si les enviem per GET o per POST, quines dades enviem, si enviem capçaleres (això ho veurem més endavant)

    Crearem un objecte options per facilitar la legibilitat del codi, especificarem que enviarem dades mitjançant el mètode POST i en el cos de l’enviament afegirem les dades que volem enviar. En aquest cas, l’id de la categoria.

    La manera més senzilla de fer-ho és crear un objecte FormData. Aquest es fa servir per enviar dades a través d’XMLHttpRequest i té un format clau-valor.

    ```
    let formData = new FormData();
    formData.append("cat1", this.value);
    let options = {
        method: 'POST',
        body: formData
    }
    ```
    [FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)

5. Dins el segon then, una vegada hem processat la resposta el que haurem de fer serà crear els diferents options i afegir-los al select.

    Pots fer-ho de dues maneres:
    - document.createElement()

        Crea un element option mitjançant el document.createElement
        ```
        let opt = document.createElement('option');
        ```
        Assigna-li el value i el text
        ```
        opt.value= el.id;
        opt.text= el.nom;
        ```
        Afegeix l’option al segon selector
        ```
        document.getElementById("cat2").appendChild(opt);
        ```

    - string innerHTML
    
        Crea un string buit i recorre dades. Per a cada objecte crea un option value concatena’l amb el string buit.

        Afegeix el string al segon selector

    *En ambdós casos hauràs de netejar el segon selector per no acomular les diferents opcions

## MODIFIQUEM EL PHP PER LLEGIR EL QUE ENVIEM PER FETCH
Fins ara, la variable $cat era estàtica, ara el que volem és que agafi les dades que enviem mitjançant
l’objecte FormData.
Realitzarem una consulta $_POST per a fer-ho agafant la clau posada al FormData.
```
$cat = $_POST['cat1'];
```

## EN EL CAS DE VOLER SELECCIONAR MÚLTIPLES CATEGORIES
El funcionament és prou semblant, l’únic que has de modificar la manera com reculls l’esdeveniment dels checkboxes.
Com que no faràs una declaració d’esdeveniment per a cada categoria, pots assignar una classe a cada checkbox i mitjançant el querySelectorAll aplicar un esdeveniment a cada un dels elements que tingui aquesta classe.
```
document.querySelectorAll(".checkCat").forEach(el=>
    el.addEventListener("change", function(){

        if (this.checked === true) {
            console.log(this.value + " check");
        } else {
            console.log(this.value + " uncheck");
        }
    })
)
```