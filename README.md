# DigitalHouse-G9-Proyecto-Integrador
## Sprint 6 - 25/4/2022
### _Entregables_

- Heroku [link](https://dh-g9-clessidra.herokuapp.com/)
- Diagrama de base de datos del proyecto: [link](https://drive.google.com/file/d/19eunWMBIevAYoVKA6MsqUqsLu71LJnYJ/view?usp=sharing)
- Script (.sql) con la estructura de la base de datos: [link](https://drive.google.com/file/d/1zh3-jj9nqlWAjHwwBZ4H5Lk4rBy8vF-v/view?usp=sharing)
- ORM Sequelize
  - CRUD Usuarios: Ok
  - CRUD Productos: Ok
- Trello actualizado:  [link](https://trello.com/b/U0KKKwLH/sprints)

## Sprint 5 - 28/3/2022
### _Entregables_

- Heroku [link](https://dh-g9-clessidra.herokuapp.com/)
- Implementar formulario de registro de usuario:
  - Debe poder ingresar todos los campos pertinentes al usuario
  - Debe poder subir una imagen de de perfil
  - La contraseña de la cuenta debe ser encriptada
  - Una vez registrado deben estar almacenados los datos de registro en un archivo JSON
- Trello actualizado:  [link](https://trello.com/b/U0KKKwLH/sprints)
## Sprint 4 - 2/3/2022
### _Entregables_

- Heroku [link](https://dh-g9-clessidra.herokuapp.com/)
- Carpeta data con archivo products.json.
- Carpeta data con archivo users.json.
- Sección funcional con listado, detalle, alta, modificación y baja de productos.
- Trello actualizado:  [link](https://trello.com/b/U0KKKwLH/sprints)
## Sprint 3 - 16/2/2022
### _Entregables_

- Heroku [link](https://dh-g9-clessidra.herokuapp.com/)
- Incorporación de Routes y Controllers.
- Aplicación de Template Engine (EJS).

## Sprint 2 - 2/2/2022
### _Entregables_
- Retro: Cargada en el Repo [link](https://github.com/Ezerom77/DigitalHouse-G9-Proyecto-Integrador/blob/main/retro.md)
- Trello:  [link](https://trello.com/b/U0KKKwLH/sprint-1)
- Heroku [link](https://dh-g9-clessidra.herokuapp.com/)

## Sprint 1
### _Entregables_

- Trello:  [link](https://trello.com/b/U0KKKwLH/sprint-1)

- Wireframe: [link](https://drive.google.com/file/d/1ti_oavMh0R0u2lfFfm_bwNSz8EPGsros/view?usp=sharing)

- Páginas referentes:
1. [Catawiki](https://www.catawiki.com/es/c/597-ropa)
2. [Renovatuvestidor](https://www.renovatuvestidor.com/home)
3. [Juanperez](https://www.juanperez.com.ar)
4. [Closeando](https://closeando.com)
6. [Somoscocoliche](https://www.somoscocoliche.com)

- Paleta de colores:  [link](https://coolors.co/ee964b-fbfbff-d65780-000000)


### Temática y descripción del sitio:

# Clessidra 
  ### Plataforma de compra - venta de indumentaria usada con precio dinámico.
Las publicaciones se realizan con un valor de seguridad (valor mínimo de venta), Stock y un precio inicial de publicación. En función del plazo de publicación elegido, el precio del producto se reduce por intervalos de vencimiento hasta agotar el stock o alcanzar el precio mínimo. En todo momento, el comprador ve el precio actual y, en caso de que le parezca adecuado, simplemente lo agrega al carrito de compras. En el carrito, el comprador tendrá un tiempo predefinido (5 o 10 minutos) para realizar la compra al precio seleccionado. En caso que no se complete el checkout a tiempo, se liberará el stock del q producto y, si corresponde, se actualizará el precio. El comprador en este caso tendrá que volver a agregar el producto al carrito con el nuevo precio (asumiendo que siga en stock).   
Esperamos que este modelo genere mayores ingresos para el vendedor, y el comprador pagará lo que considere un precio justo por el producto.  
La plataforma mostrará a los usuarios compradores el producto, precio, stock y vencimiento, priorizando los productos que más se ajusten a las preferencias indicadas por el usuarios luego del proceso de registro.  
Los productos publicados podrán filtrarse por su categoría y características (rango de precios, talles, etc) así como también podrán ser compartidos en las redes sociales del usuario que los visite.



### Publico objetivo
#### Usuario comprador:
Es de cualquier sexo, tiene entre 16 y 35 años.
No eligen la moda convencional, siguen marcas e influencers para crear un estilo más único.
Son buscadores de ofertas y oportunidades especiales, recorren plataformas locales y del exterior buscando el producto único y el mejor precio, compran eventualmente en tiendas físicas de ropa usada pero son consumidores activos de plataformas online.

2do perfil. Sexo femenino, tiene 27 años.

Su profesión es psicóloga, elige un tipo de moda elegante y tiene tendencia hacia los colores primarios y oscuros.
Busca la comodidad y la facilidad de la rapidez para encontrar
la indumentaria  que busca para trabajar en su consultorio.

3er perfil.  Sexo masculino, 30 años.
Su profesión es médico, elige un estilo casual para cuando sale
del trabajo, elegí esta marca por la rapidez en llegar a su domicilio
y por la facilidad de compra.


#### Usuario vendedor:
Al igual que el comprador, es de cualquier sexo, tiene entre 16 y 35 años, suelen renovar su ropa en cada temporada y valoran la posibilidad de capitalizar esa inversión con su venta.
Cuidan y clasifican las prendas considerando su precio de reventa, son consumidores habituales de plataformas de compra-venta (Mercadolibre / Facebook Marketplace, etc) 

### Integrantes:

#### Ariel Muslera
*Con más de 20 años de experiencia invirtiendo, asesiorando y creando productos y startups de tecnología y blockchain/crypto, Ariel sabe suficiente de tecnología como para meterse en problemas. Su objetivo para el curso de Full Stack es aprender a programar lo suficientemente bien como para poder ser un mejor Product Owner, qeue es en definitiva lo que suele hacer, "tocando de oído". 
Ariel pasa su tiempo entre el sur de California y Buenos Aires junto a su familia ensamblada (su mujer y 4 hijas entre ambos con edades de 12 a 16, y en sus ratos libres intenta tocar el bajo y jugar al ajedrez.*

#### Valentina de Sousa
*Estudiante de Diseño Multimedia y de Interacción, en busca de mejorar su perfil profesional complementándolo con programación. Entusiasta del aprendizaje y del perfeccionamiento, intentando superarse a si misma de manera continua y enfrentándose a nuevos desafíos. Teniendo 20 años de edad vive en la Ciudad Autónoma de Buenos Aires y está intentando conseguir los medios para independizarse. Pasa la mayor parte de su tiempo con música de fondo.*

#### Ezequiel Romera
*Con amplia experiencia como PM en proyectos de Tecnología, Marketing y Comunicación, dio sus primeros pasos en una multinacional de telecomunicaciones donde se desarrolló en diferentes áreas durante casi diez años. Es instructor con experiencia en inducción de personal, atención al cliente, gestión de reclamos y manejo de sistemas. Cuenta con experiencia en creación de contenidos, análisis y mejora de procesos, planificación de acciones de MKT y coordinación de equipos de trabajo. Fotógrafo y Techie por naturaleza.*

#### Federico Alvarez
*Actualmente emprendiendo su camino de aprendizaje en la programación. Tiene experiencia en logística, habiendo trabajado específicamente en disposición de materiales e implementación de nuevos proyectos en el rubro automotriz, y más recientemente en el rubro de los seguros, trabajando en una productora de ART. 
Es un apasionado por resolver problemas y trabajar en equipo, y cree que la programación brinda las herramientas necesarias para hacerlo. 
Su destino preferido es la montaña, especialmente cuando hay nieve.* 
