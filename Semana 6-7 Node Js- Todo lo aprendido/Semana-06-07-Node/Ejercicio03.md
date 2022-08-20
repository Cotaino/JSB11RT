# Ejercicios 3

Hoy vamos a permitir a los usuarios ver la lista de experiencias, para ello realizaremos los siguientes endpoints:

-   GET[/experiences] - Lista todas las experiencias, recibe por req.query un 'search' que si existe,
    buscará por nombre la experiencia, un order y direction que establecen el campo y dirección por el que
    se ordenarán los resultados. ✅

-   Crea un middleware que permita saber si el usuario logueado es de tipo admin (recuerda que tienes un campo
    en la base de datos que indica si el usuario es 'admin' o 'normal') ✅

-   DELETE[/experiences/:idExperience] - Permite al ADMIN eliminar una experiencia.
    Previamente debemos comprobar que el usuario logeado. ✅

-   POST [/company] - Permite al usuario ADMIN insertar una nueva empresa indicando únicamente el nombre de la misma. ✅

-   DELETE[/company/:idCompany] - Usuario ADMIN elimina una empresa segun el id recibido por path params. ✅
