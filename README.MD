# Usuario por default

- Email: admin123@gmail.com
- Contraseña: 123456

## Eliminación de Posts

- Solo se permite borrar a usuarios que no son administradores o que no tienen el campo "isAdmin" en true.

## Creacion de Posts

- Solo se permite crear posts siendo administrador
- el boton solo aparece siendo administrador
- Tiene su ruta protegida, no podes acceder yendo a la URIL sin ser administrador, ya que te redirije al home
- En el caso que puedas acceder, su handler está protegido siendo que solo los administradores puedan editar

## Editar posts

- Solo se permite editar posts siendo administrador
- El boton solo aparece siendo administrador
- Tiene su ruta protegida, no podes acceder yendo a la URL sin ser administrador ya que te redirije al home
- En el caso que puedas acceder, su handler está protegido siendo que solo los administradores puedan editar

## Registro

- Puedes registrarte fácilmente, con los datos almacenados en el local storage.
- La validación de formularios se realiza utilizando Zod.
- No se permite el registro si el correo electrónico ya existe.
- Después de un registro exitoso, serás redirigido al home.
- Ruta protegida: no puedes acceder a la pestaña de registro si ya estás autenticado.

## Inicio de Sesión

- Para iniciar sesión, debes proporcionar un correo electrónico y una contraseña que coincidan con los datos almacenados en el local storage.
- Se proporcionan mensajes de error descriptivos para facilitar la comprensión de cualquier problema durante el inicio de sesión.
- Los mensajes de error de formulario se borran a los 3 segundos para no molestar al usuario.
- La validación de formularios se realiza utilizando Zod.
- Después de un inicio de sesión exitoso, serás redirigido a la página de inicio.
- Ruta protegida: no puedes acceder a la página de inicio de sesión si ya estás autenticado.

## Página de Inicio

- Si estás autenticado, verás tu nombre y la opción "Cerrar sesión".
- En el caso que no tengas nombre, por default tendrias un "Sin nombre" como usuario
- Si no estás autenticado, verás opciones para ir a las páginas de inicio de sesión o registro.
- Los datos se actualizan automáticamente al iniciar o cerrar sesión.
- Se proporciona un filtro de búsqueda que actualiza el estado cuando se realiza una búsqueda.
- El filtro de búsqueda funciona en combinación con la paginación.
- Paginación "infinita": carga solo los objetos visibles en pantalla para un mejor rendimiento.
- Proporciona una alerta si no se encuentra ningún resultado en la búsqueda.

## Administración de Roles

- Si estás autenticado pero no eres administrador, no verás las opciones de inicio de sesión, registro y editar posts.
- Las rutas de inicio de sesión, registro y editar posts están protegidas, por lo que no puedes acceder a ellas directamente mediante URL.
- Si eres un administrador, no verás las opciones de inicio de sesión y registro.

## Funcionalidades Adicionales

- Las páginas utilizan lazy loading y suspense, lo que significa que solo se cargarán las páginas que hayas navegado.
- Agregué el paginado
- Con el paginado no podes ir a una pagina inferior a la 1 ni superior al número total de páginas
- Agregué la paginación de forma "infinita"
- Agregué una flecha que aparece para desplazarse hacia arriba cuando llegas a cierto limite navegando hacia abajo
- Nueva seccion de " Perfil " donde aparte de ver tus datos, podes modificar tu nombre
- La sección de perfil tiene la ruta protegida y también input y handlers validados
  ¡Disfruta explorando las funcionalidades del proyecto!
