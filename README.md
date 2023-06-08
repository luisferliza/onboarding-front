# Onboarding



## Descripción

Este proyecto es una solución de gestión de talento que facilita la creación de pruebas de habilidades y voluntades (Skills y Wills) para los trabajadores. La aplicación se utiliza para evaluar y asignar empleados a un cuadrante específico en una matriz de desempeño. Los cuadrantes incluyen: capacitar, dar acompañamiento, onboarding y desvincular.

Esta aplicación está diseñada para gestionar el proceso de incorporación (onboarding) de los empleados en nuestra empresa. Está escrita en Node.js y React y sigue los principios de "clean code", con una estructura de carpetas bien organizada, incluyendo Hooks, API, Utils y hooks personalizados para el acceso a los datos.

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- **Node.js** - utilizado para el backend de la aplicación.
- **React** - utilizado para el frontend de la aplicación.
- **AWS S3** - utilizado para almacenar los archivos estáticos de la aplicación.
- **AWS CloudFront** - utilizado para la entrega rápida de contenido web.
- **AWS Route53** - utilizado para el enrutamiento de dominio y la gestión DNS.
- **AWS CodePipeline** - utilizado para la integración continua y la entrega continua (CI/CD).
- **Mocha y Chai** - utilizados para las pruebas del backend.
- **Balsamiq Wireframes** - utilizado para el prototipado de la interfaz de usuario.

## Estructura de la Aplicación

La aplicación sigue los principios del "clean code" y tiene una estructura de carpetas bien definida:

- **Hooks**: Aquí se definen los hooks de React utilizados en la aplicación.
- **API**: Aquí se alojan los archivos relacionados con las llamadas a la API.
- **Utils**: Aquí se almacenan las funciones de utilidad.
- **Custom Hooks**: Aquí se definen los hooks personalizados que se utilizan para acceder a los datos.
- **Templates**: Aquí se definen los templates de las evaluaciones.
- **Home**: Aquí se definen los componentes de la página de inicio.
- **Login**: Aquí se definen los componentes de la página de inicio de sesión.

## Despliegue

La aplicación se despliega en AWS utilizando un enfoque serverless. Se utiliza AWS S3 para almacenar los archivos estáticos, AWS CloudFront para la entrega de contenido y AWS Route53 para la gestión DNS. El proceso de despliegue se automatiza con AWS CodePipeline.

Se implementó A/B testing utilizando dos dominios y weighted routes con Route 53 para controlar el tráfico a cada versión.

La configuración se encuentra en el archivo buildspec.yml.

## Pruebas

Las pruebas del backend se realizan utilizando Mocha y Chai. El enlace del repositorio de pruebas se encuentra [aquí](https://github.com/luisferliza/onboarding-backend)

## Self Service

Se implementó una funcionalidad de auto-servicio que permite a los usuarios gestionar sus propios registros en la base de datos. Esto proporciona a los usuarios más control y reduce la carga de trabajo del equipo de soporte.

## Cómo contribuir

Para contribuir a este proyecto, por favor sigue los siguientes pasos:

1. No se puede, gracias por intentarl :)

## Cómo ejecutar la aplicación

Para ejecutar la aplicación, siga los siguientes pasos:

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta la aplicación con `npm start`.


