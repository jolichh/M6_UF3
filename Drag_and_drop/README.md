# Drag and drop
En aquest exercici realitzarem la funcionalitat d’afegir imatges mitjançant un drag & drop i una previsualització.

# HTML
A nivell interfície només necessitem determinar un div en el que farem el drag, un input file i un div per previsualitzar els arxius pujats.

*Aquesta font és la que ens permetrà posar la X per eliminar
```
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?
family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

<div class="drop-area" draggable="true">
    <h2>Drag & Drop files</h2>
    <button>Upload files</button>
    <input type="file" name="inputFiles[]" id="input-file" hidden multiple />
</div>
<div id="preview"></div>
```

# CSS
Podeu utilitzar el css que vulgueu.

# JS
Haurem d’implementar els següents punts:
1. Declarar una array buida on aniran tots els fitxers
2. Declarar els objects que farem servir
    - dropArea (.drop-area)
    - dragDropText (h2)
    - button (button)
    - input (#input-file)
    - preview (#preview)
3. Invalidar l’acció per defecte del drag & drop
    - [‘dragover’, ‘dragleave’, ‘drop’].
Fes que per a cada un d’aquests esdeveniments executats al div dropArea se li apliqui l’event PrefentDefault. Això el que farà serà invalidar l’acció per defecte (Ex: que obri les imatges a la pestanya del navegador)

    Utilitza un forEach per a fer-ho.
    ```
    dropArea.addEventListener(evt, prevDefault);
        function prevDefault (e) {
        e.preventDefault();
    }
    ```
4. Acció dragover
Volem que en el moment d’arrossegar un fitxer al div aquest es modifiqui de la següent manera
    ```
    dropArea.addEventListener("dragover", function(){
    //CODE
    });
    ```
    - El div ha de tenir la classe active
    - El text s’ha de modificar
5. Acció dragleave
Volem que en el moment de treure els arxius del div, aquest torni al seu estat original.

6. Acció drop
L’acció drop s’executarà en el moment de deixar anar els arxius.
El que farem serà recollir els arxius, per a fer-ho, necessitem accedir a l’esdeveniment de l’acció.
Per tant definirem la funció de la següent manera (qualsevol de les dues és correcta):
    ```
    dropArea.addEventListener("drop", (event)=>{});
    dropArea.addEventListener("drop", function(e){});
    ```
    Utilitzarem l’objecte dataTransfer per tal de recollir els arxius deixats anar al div.
        
        event.dataTransfer.files

    Aquesta acció ens retornarà una FileList, que és un objecte de JS que només és de lectura, per tant
    no podrem concatenar aquesta array amb futurs arxius. Per a fer-ho passarem aquest FileList a
    Array mitjançant la funció Array.from() i la concatenarem amb l’array definida a l’inici del
    programa.
    ```
    files = files.concat(Array.from(event.dataTransfer.files));
    ```

    D’aquesta manera tindrem constància de quants i quins arxius tenim en cada moment.
    L’últim que ens quedarà serà cridar a la funció showFiles i retornar el div dropArea a la seva
    situació inicial (com en el cas de dragleave)

    **Documentació oficial:**
    - dataTransfer
    - Array.from

7. Funció showFiles
La funció showFiles ens permetrà previsualitzar les imatges que hem anat seleccionant.

    El primer que farem serà comprovar si l’array té fitxers.

    Si aquesta condició es compleix, per a cada element de l’array cridarem a la funció processFile
    passant-li l’element i l’índex.

8. Funció processFile(file, index)
Inicialment comprovarem si el fitxer té l’extensió d’una imatge. Definirem una array amb les
extensions permeses
    ```
    const validExtensions = ["image/jpeg", "image/jpg", "image/png",
    "image/gif"];
    ```
    Extraurem l’extensió del fitxer
    ```
    const docType = file.type;
    ```

    Haureu de comprovar si l’extensió del fitxer està dins l’array, si no ho està haureu de mostrar un
    missatge. Elimina aquest arxiu de l’array per a que no consti a l’array.
    En el cas que sigui una imatge haureu d’executar les següents accions:
    - Declararem un objecte de la classe FileReader de JS. Això ens permetrà llegir la
    informació del fitxer de manera asíncrona.
    let reader = new FileReader();

    - Cridarem a la funció readDataAsURL.
    reader.readAsDataURL(file);

    - Aquest mètode llegirà de manera asíncrona la informació del fitxer. Per tant haurem de
    crear un mètode que es cridarà quan aquesta acció hagi finalitzat. Analitza la documentació
    del mètode de manera detallada i fes que creï un div com el següent:
    ```
    let prev = `<div class="previewImage">
                <img src="${fileurL}"/>
                <span>${file.name}</span>
                <span onclick="remove(${index})" class="material-symbols-outlined

                removeBtn">c</span>
                </div>`;
    ```

    - Fes que afegeixi aquest div al div preview. Tingues en compte que al div hi ha d’haver la informació de tots els arxius de l’array.
    **Documentació oficial:**
    - FileReader
    - readDataAsURL

9. Funció removeBtn(i)

    La funció removeBtn eliminarà de l’array l’arxiu de la posició i.
    Crida de nou a la funció showFiles(), elimina abans el contingut del que hi hagi al div preview.

10. Click al botó Upload Files

    Hem treballat totes les accions de Drag & Drop, però també hem de programar el click del botó.
    Fes que si es fa click al botó es mostri el selector d’arxius. Recordeu que l’hem deixat hidden (perquè l’estètica és molt discutible)
    ```
    button.addEventListener("click", function(e){
        e.preventDefault();
        input.click();
    });

11. Gestiona els arxius seleccionats

    Quan acceptem la selecció d’arxius s’executarà un canvi en l’element. Per tant hem de definir la
funció que detecti aquest moment per mostrar els nous fitxers
    ```
    input.addEventListener("change", function(){});
    ```
    Per recollir els arxius afegits a l’input farem input.files
    Tingues en compte que has de fer els mateixos passos que al punt 6, és a dir, concatenar els
    resultats i cridar a la funció showFiles()
    !!!Ves amb compte amb el div preview

    **PASSAR AQUESTES DADES AL PHP**
    ```
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const dataTransfer = new DataTransfer();
        files.forEach(file=>{
        dataTransfer.items.add(file);
        })
        input.files = dataTransfer.files;
        form.submit();
    });
    ```

    **REBEM LES DADES AL PHP**

    *Fixeu-vos en l’estructura de l’Array que ens retorna $_FILES
    ```
    print_r($_FILES["inputFiles"]);
    for ($i=0; $i<count($_FILES["inputFiles"]["name"]); $i++) {
        echo $_FILES["inputFiles"]["tmp_name"][$i] .'<br>';
        echo $_FILES["inputFiles"]["name"][$i] .'<br>';
    }
    ```