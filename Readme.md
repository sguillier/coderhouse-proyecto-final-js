
# Proyecto SPA Con Vanilla JavaScript

### El proyecto
Proyecto final del curso de JavaScript en CoderHause. Consiste en una breve aplicación para realizar test de aptitudes matematicas en linea. La vista final del proyecto se puede ver en https://sguillier.github.io/portal-test/.

### El problema 
Con la pandemia se hecho comun el dictado de clases a distancia, en todos los niveles desde escolar hasta posgrados. Herramientas como zoom y classroom han ayudado en esa tarea pero el tema de la evaluacion sigue siendo un problema. Por ello el objetivo de este proyecto era crear una maqueta 1.0 para poder realizar evaluaciones de seleccion multiple de forma online.

### Requerimientos
Otras soluciones como google form o evaluaciones en classroom son buenas, pero tienen algunas desventajas que necesitamos cubrir, estas son:
1. No permite formato LaTeX
2. No permite hacer "ingeniería de preguntas", es decir, realizar una misma pregunta pero con diferentes valores y diferente orden, tipo random quizá, esto para que haya diferentes formas y no todos los estudiantes tengan la misma evaluación.
3. Mayor libertad para manejar límites de tiempo, y fechas de entrega.
4. Mayor libertad para ajustar formas, tamaños, incluir imagenes, formatos, notificaciones, mostrar notas, etc.
5. En general existen buenas soluciones estándares, pero siempre llega un punto en el que se necesita mayor libertad de control.
 
### La Implementacion
En la medida que fui desarrollando la app me vi en la necesidad de investigar, estudiar, probar (largamente) y finalmente implementar soluciones anexas para cubrir los requerimientos, estás son:
1. Para consumo y guardado de datos se utilizó **FireStore**.
2. Para login se utilizo **Auth FireBase**
3. Para incluir formato LaTeX se incluyó librería **MathJax**
4. Para las animaciones se hace uso de **JQuery**

### Para el Usuario
Para utilizar la app solo basta registrarse con 3 cosas:
1. Un correo (**puede ser ficticio** ya que no será validado ni verificado ni nada) 
2. Un nombre de usuario (algo simple solo para ser mostrado y llamado dentro de la app (más de 4 letras)) 
3. Una contraseña (cualquiera más de 6 letras, ojala no tan simple para que Chrome no te advierta de que es muy obvia)
Todo lo demás la app te guiará en su uso.
Ver proyecto en : https://sguillier.github.io/portal-test/.