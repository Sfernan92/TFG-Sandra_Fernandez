# TFG-Sandra_Fernandez

> ⚠⚠ IMPORTANTE: Para Visualizar el proyecto, ir a la **rama DEV**, ya que la rama main, esta limpia, En dicha rama se explica el proyecto y como desplegarlo. ⚠⚠

## Idea Principal

En este proyecto vamos a realizar una página web que compare los precios de productos de distintos supermercados para realizar un análisis de todos los precios que hay actualmente en el mercado. Además podremos realizar búsquedas en la que se nos mostrará los distintos supermercados donde nuestros productos buscados estén más baratos. Así como también podremos realizar la inserción de nuevos supermercados, nuevos productos, sus precios o incluso actualizar los ya existentes para tenerlos actualizados en todo momento con los anteriores. 

Con todo ello intentaremos ayudar a los usuarios que vayan a realizar sus compras diarias para saber en qué supermercados se encuentran sus productos a mejor precio, promoviendo así un ahorro en sus compras. 

Los datos de las tiendas se insertaran en nuestra base de datos mediante un frontal el cual interactuará con un backend que realizaremos en Dbeaver mediante PostgreSQL. 

## 🚀 Despliegue de la aplicación.

Para desplegar DonTacaño.com antes tienes que instalar Docker Compose y Docker Desktop. Y posteriormente hacer los pasos siguientes:

### 🐳 Clonar y Levantar Contenedores en Docker.

### 📦 Clonar el Repositorio.

1. **Clave HTTPS.**

```
git clone git@github.com:CodeArts-Solutions/elephants-B-Fray-Meliton.git](https://github.com/Sfernan92/TFG-Sandra_Fernandez.git)
```

2. **Clave SSH.**

```
git@github.com:Sfernan92/TFG-Sandra_Fernandez.git
```

### 🆙 Levantar los contenedores de Docker.

```
docker compose up
```

### 🔄 Actualizar la rama del proyecto.

1. Una vez tengamos nueustro proyecto levantado el proyecto con docker, nos **vamos a Visual Studio Code**, donde nos aparecerá de entrada la rama main (la cual esta vacia con el proyecto limpio).
2. Abrimos consola y **entramos dentro de la carpeta angular-frontend** y utilizamos el comando `npm install` para instalar todas las dependencias y no tener errores en los módulos.
3. Una vez ahí, a través del comando `git fetch origin` nos **traemos las ramas del proyecto** y realizamos el comando `git checkout DEV`, para cambiarnos a la rama DEV que es donde está todo el proyecto. 

💲 ¡Una vez hecho todo esto **ya tendrás el proyecto** y podrás comenzar a **comparar precios y ahorrar**! 💲
