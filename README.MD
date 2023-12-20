Registro:
Podes registrarte sin ningun problema (datos guardados en local storage)
No te deja registrarte si ese email ya existe
Validacion de formularios con zod
Redireccion al completar exitosamente el registro
Ruta protegida: No te deja entrar si ya estas logueado.

Login:
Tus datos tienen que coinicir con los de local storage (contraseña y email)
Puse errores descriptivos para que se entienda
Validacion de formularios con zod
Redireccion al completar exitosamente el registro
Ruta protegida: No te deja entrar si ya estas logueado.

Home:
Si estas logueado, te sale tu nombre y "Cerrar sesion"
Si estas deslogueado, te sale para ir a Login o Registro
Apenas actualices o desactualices los datos iniciando o cerrando sesión, los datos se actualizan para mostrar lo que deberían

Filtro de busqueda
Funciona perfectamente y actualiza el estado cuando se realiza su busqueda, Tambien solo carga los objetos que se ven en pantalla para un mejor rendimiento
El filtro de busqueda funciona en combinacion con el paginado

Paginado
No se puede ir hacia menos de página 1 ni tampoco ir a más páginas de lo que hay

Delete Post
Solo deja borrar a quien no es usuario o quien no tiene el " isAdmin " en true
usuario default:
email: admin123@gmail.com
password: 123456
