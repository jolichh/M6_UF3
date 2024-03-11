# Afegir i editar un producte
Aquest exercici tracta de com es pot fer la gestió (afegir i editar) de un producte qualsevol que en aquest cas constarà només de nom i id.

A través de PHP o mitjançant JS + PHP.
[Repositori GitHub](https://github.com/martamillanlom/FormAddEdit)

## PHP
(cas en el que tenim el formulari separat del llistat i necessitem canviar de pàgina per editar)

En aquest cas necessitem 3 fitxers diferents.
- ex1Form.php
- ex1List.php
- ex1AddEdit.php

**EX1FORM.php (ADD)**
1. Tenim un formulari HTML amb un action POST a ex1AddEdit.php
2. El formulari té un camp de nom i un camp tipus hidden amb name addEdit i value 0 si s’està creant un nou producte i l’id del producte en el cas que s’estigui editant.

Quan fem click a SUBMIT anirem a ex1AddEdit.php

**EX1ADDEDIT.php**
Aquest fitxer és l’encarregat d’afegir o editar el registre. Ho farà en funció del valor que tingui $_POST[“addEdit”]. Si aquest és 0 farà un INSERT, sinó farà un UPDATE.

Fixeu-vos en les línies 16-20 del codi.

Una vegada s’hagi realitzat l’execució ens enviarà a ex1List.php

**EX1LIST.php**
Aquí el que fem és una lectura de la taula productes. Fem un SELECT * i imprimim la taula.
1. L’única consideració que hem de tenir és que el botó Edit ha d’apuntar a ex1Form.php i passar-li l’id del producte.
    Ex: ex1Form.php?id=3

**EX1FORM.php (EDIT)**
Tornem al formulari. Com que no volem duplicar codi el que fem és una petita modificació del codi anterior.
1. A l’inici del codi detectem si li estem passant un paràmetre id per la URL.
    ```
    if(isset($_GET["id"]) && !empty($_GET["id"])){

2. En el cas que aquesta condició es compleixi vol dir que estem editant un producte existent.
3. Recollim de la base de dades tota la informació del producte.
    ```
    SELECT * FROM productes WHERE id=$_GET[“id”]

4. Guardem en un objecte o en variables tota la informació que vulguem mostrar al formulari
5. Imprimim aquesta informació al value de l’input
    ```
    <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="<?php echo $nom;?>">

6. Com que l’acció ja detecta quan estem fent un insert o un update no cal que modifiquem res de l’arxiu ex1AddEdit.php
7. Si no detecta que li estàs passant un id per la URL pots fer condicions a l’hora d’imprimir els valors o bé crear un objecte/variables amb “”.

## PHP + JS
(cas en el que tenim el formulari i el llistat junts i no volem recarregar la pàgina)
En aquest cas necessitem 3 fitxers diferents.
- ex2FormList.php
- getProducte.php
- ex2AddEdit.php

**EX2FORMLIST.php (ADD)**
1. En aquest cas tenim el formulari i el llistat de manera conjunta.
2. El mecanisme d’afegir funciona exactament igual que en el cas anterior. L’única diferència és que després d’executar la query tornarà a la mateixa pàgina (això es podria evitar mitjançant JS i no recarregant res. Ho mirem amb qui estigui interessat)
3. En aquest cas, mai li passarem per paràmetre a la URL l’id del producte perquè ho farem mitjançant el FETCH. És per això que tot el codi de seleccionar un producte i recollir les seves dades ho farem en un document a part.

**EX2FORMLIST.php (EDIT)**
1. Per editar els productes farem clic als botons d’EDIT. Com que no volem recarregar haurem de fer la petició mitjançant JS
2. Ens interessa que cada botó tingui la informació del producte, és a dir l’ID. Pots crear un atribut específic per això.
    ```
    Ex: <p idProd="3" class="btnEdit btn btn-outline-info">Edit</p>

3. Haurem de detectar el click del botó i crear un actionListener per a cada un.
    ```
    let btnEdit = document.querySelectorAll(".btnEdit");
    btnEdit.forEach(el=>{
        el.addEventListener("click", function(){
            console.log("id: " + this.getAttribute("idProd"));
        });
    });

4. Pots recollir l’id mitjançant el mètode getAttribute().
5. Una vegada tinguis l’id del producte has de realitzar un fetch a l’arxiu getProducte passant-li l’id del producte. Aquest ens retornarà tota la informació del producte.
6. L’últim que hauràs de fer és assignar la informació que et retorni el fetch i assignar-la als inputs corresponents.

**GETPRODUCTE.PHP**
L’arxiu getProducte.php ens servirà per retornar la informació del producte específic.
1. Recull l’id que li passes per paràmetre a través del FETCH.
2. Realitza la consulta SELECT * FROM producte WHERE id = $_POST[“id”]
3. Crea un objecte i assigna-li com a atributs els diferents camps
    ```
    $object = new stdClass();
    $object->nom = $row["nom"];
    $object->addEdit = $row["id"];

4. Retorna un json_enocde de l’objecte
    ```
    echo json_encode($object);

**EX2ADDEDIT.php**
En aquest cas, el fitxer és exactament igual que l’anterior i el seu funcionament no s’altera.

## Editar Imatges d'un producte
Aquest apartat opcional és per practicar com el pot gestionar un camp d’imatge d’un producte.
1. Emmagatzema les URL de les imatges a un camp hidden, pots crear-ne un per a cada imatge. 

**Rebre les imatges del servidor**

2. Per a cada una de les URL necessitem crear un nou fitxer en local, per a fer-ho pots utilitzar la següent funció:
    ```
    // Create a File object from the image URL
    fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {

        const file = new File([blob], 'nom de la imatge', { type:'image/extensió de la imatge });
        files.push(file)
    });

**Enviar les imatges al servidor**

3. Una vegada has realitzat aquesta acció per enviar noves imatges, amb cada una d’elles pots fer el que fèiem en el moment d’enviar el formulari d’assignar els fitxers de l’array files al camp input
    ```
    // Set the value of the file input to the File object
    const dataTransfer = new DataTransfer();
    files.forEach(file=>{
        dataTransfer.items.add(file);
    })
    fileInput.files = dataTransfer.files;