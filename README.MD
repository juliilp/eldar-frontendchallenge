# Usuario por default

- Email: admin123@gmail.com
- Contraseña: 123456

## Eliminación de Posts

- Sólo se permite borrar a usuarios que no son administradores o que no tienen el campo "isAdmin" en true.

## Creación de Posts

- Sólo se permite crear posts siendo administrador.
- El botón de "crear post" sólo aparece siendo administrador.
- Tiene su ruta protegida, no podes acceder yendo a la URIL sin ser administrador, ya que te redirije al home.
- En el caso que puedas acceder, su handler está protegido, sólo los administradores puedan crear.

## Editar posts

- Sólo se permite editar posts siendo administrador.
- El botón de "editar" sólo aparece siendo administrador.
- Tiene su ruta protegida, no podes acceder yendo a la URL sin ser administrador ya que te redirije al home.
- En el caso que puedas acceder, su handler está protegido, sólo los administradores puedan editar.

## Registro

- Puedes registrarte fácilmente, tus datos serán almacenanados en el local storage.
- Las validaciones de formularios fueron realizadas utilizando Zod.
- No se permite el registro si el correo electrónico ya se encuentra almacenado en el local storage.
- Si no te registras con nombre, tendrías un "sin nombre" por default.
- Después de un registro exitoso, serás redirigido al home.
- Ruta protegida: no puedes acceder a la pestaña de registro si ya estás autenticado.

## Inicio de Sesión

- Para iniciar sesión, debes proporcionar un correo electrónico y una contraseña que coincidan con los datos almacenados en el local storage.
- Se proporcionan mensajes de error descriptivos para facilitar la comprensión de cualquier problema durante el inicio de sesión.
- Los mensajes de error de formulario se borran luego de 3 segundos para no molestar al usuario.
- Las validaciones de formularios fueron realizadas utilizando Zod.
- Después de un inicio de sesión exitoso, serás redirigido a la página de inicio.
- Ruta protegida: no puedes acceder a la página de inicio de sesión si ya estás autenticado.

## Página de Inicio

- Si estás autenticado, verás tu nombre y la opción "Cerrar sesión".
- Si no estás autenticado, verás opciones para ir a las páginas de inicio de sesión o registro.
- Los datos se actualizan automáticamente al iniciar o cerrar sesión.
- Se proporciona un filtro de búsqueda que actualiza el estado cuando se realiza una búsqueda.
- El filtro de búsqueda funciona en combinación con la paginación.
- Paginación "infinita": carga sólo los objetos visibles en pantalla para un mejor rendimiento.
- Proporciona una alerta si no se encuentra ningún resultado en la búsqueda.

## Administración de Roles

- Si estás autenticado pero no eres administrador, no verás las opciones de inicio de sesión, registro y editar posts.
- Las rutas de inicio de sesión, registro y editar posts están protegidas, por lo que no puedes acceder a ellas directamente mediante URL.

## Funcionalidades Adicionales

- Las páginas utilizan lazy loading y suspense, lo que significa que sólo se cargarán las páginas en las que hayas navegado.
- Con el paginado no podes ir a una página inferior a la 1 ni superior al número total de páginas.
- Agregué la paginación de forma "infinita".
- Agregué una flecha que aparece para desplazarse hacia arriba cuando llegas a cierto limite navegando hacia abajo.
- Nueva seccion de "Perfil" donde aparte de ver tus datos, podes modificar tu nombre de usuario.
- La sección de perfil tiene la ruta protegida y también input y handlers validados.
  ¡Disfruta explorando las funcionalidades del proyecto!
