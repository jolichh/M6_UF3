# Validació del registre
Partim de la idea que tenim un registre d’usuaris amb un camp de nom, un de correu electrònic, un de contrasenya i un camp de confirmació de contrasenya, també té un camp d’adreça postal.

Se suposa que tots els camps són obligatoris

## Enunciat
- Fes que quan surtis del camp d’usuari es mostri l’input en verd o vermell en funció de si el camp està ple o buit.

    Si està buit has de mostrar un missatge d’error de color vermell.

    **Pista:** l’esdeveniment que has de modificar és focusout

- Fes que quan surtis del camp del correu electrònic validi el correu, per a fer-ho pots utilitzar la següent funció:
    ```
    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
        }else{
        return false;
        }
    }
    ```
    Si el correu està bé fes que l’input es posi en verd, sinó en vermell i indica que hi ha un error en el correu en un missatge d’error de color vermell.

- Fes que a mida que vas escrivint dins el camp de la contrasenya vagi calculant si la contrasenya està bé o no. 
    Els requeriments:
    - Entre 8 i 15 char	
    - 1 lowercase		let lowerCaseLetters = /[a-z]/;
    - 1 uppercase		let upperCaseLetters = /[A-Z]/;
    - 1 numeric digit. 	let numbers = /[0-9]/;
    - 1 special digit		let specialChars =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	
    Podeu utilitzar la [funció .test](https://www.w3schools.com/jsref/jsref_regexp_test.asp) per executar

- Fes que el camp es posi en vermell si no compleix les característiques específiques i vagi mostrant què li falta a l’usuari per completar la contrasenya.
    ```
    document.getElementById("validationPassword").addEventListener("input", function(){
    })
    ```

- Fes que el camp de confirmar la contrasenya es posi en verd si coincideix exactament amb el de la contrasenya. Fes que es posi en vermell sinó i mostra un missatge d’error.

- Fes que el camp adreça postal sigui obligatori, i comprova que no estigui buid. En cas d’estar buid en el moment de l’enviament s’ha de mostrar un error.

Finalment hem de validar l’enviament del formulari. En el moment de fer click al botó haurem de recomprovar que tots els camps estiguin bé i finalment enviar el formulari al php.

[Exemple 1:](https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_js)
```
<form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">

function validateForm() {
    return
}
```

Exemple 2:
```
form.addEventListener("submit", function(e){
	e.preventDefault();     	
    //Validacions
	form.submit();
});

```