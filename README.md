# API de WhatsApp con Integración a Azure

![Arquitectura](ruta/a/tu/imagen-de-arquitectura.png)

## Descripción General

Este proyecto implementa una API construida en Node.js para conectar WhatsApp con los servicios de Azure, utilizando específicamente el Azure Bot Framework para gestionar las conversaciones. La API está desplegada en un App Service de Azure y almacena los registros y datos de las conversaciones en los servicios de almacenamiento de Azure.

## Características

- **Cifrado de extremo a extremo**: Garantiza la comunicación segura entre los usuarios y la API.
- **Integración con la API de WhatsApp**: Gestiona los mensajes entrantes y envía las respuestas utilizando la API de WhatsApp Business.
- **Azure Bot Framework**: Gestiona el flujo de conversación y el manejo de mensajes.
- **App Service de Azure**: Hospedaje confiable y escalable para la API.
- **Almacenamiento de datos**: Las conversaciones se almacenan en MongoDB, mientras que otros datos se almacenan en Blob Storage y SQL DB para mayor flexibilidad.
- **Monitoreo**: Utiliza Azure Application Insights para registrar eventos y monitorear el rendimiento de la API.

## Arquitectura

1. **Experiencia del Usuario**: 
   - Los usuarios interactúan con el bot a través del **canal de WhatsApp**. Los mensajes están cifrados de extremo a extremo.
   
2. **Servicios del Bot**:
   - La **API de WhatsApp** (en la nube) maneja las solicitudes entrantes y las reenvía a la API (Paso 2.a).
   - La API, desplegada en un **App Service de Azure**, se encarga de la **validación de tokens** (Paso 2.b) y procesa las solicitudes utilizando el **SDK del Bot Framework** (Paso 2.c).

3. **Seguridad y Gobernanza**:
   - Los tokens y claves se almacenan de forma segura en **Azure Key Vaults**, garantizando el acceso seguro a las credenciales sensibles.

4. **Servicios de Almacenamiento**:
   - **MongoDB** se utiliza para almacenar los datos de las conversaciones.
   - **Azure Blob Storage** almacena datos adicionales.
   - **SQL Database** gestiona los datos estructurados.
   - **Azure Application Insights** registra eventos importantes y métricas de rendimiento.

5. **Manejo de Respuestas**:
   - La API procesa la solicitud y envía una respuesta de vuelta al usuario a través del canal de WhatsApp (Paso 5).

## Instrucciones de Configuración

### Requisitos Previos

Antes de comenzar, asegúrate de tener las siguientes herramientas y servicios:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [API de WhatsApp Business](https://developers.facebook.com/docs/whatsapp)
- [Cuenta de Azure](https://azure.microsoft.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o cualquier otra instancia de MongoDB
- [Cuenta de Almacenamiento de Azure](https://azure.microsoft.com/en-us/services/storage/)
- [Azure Bot Framework](https://azure.microsoft.com/en-us/services/bot-services/)

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/api-bot-whatsapp.git
    cd api-bot-whatsapp
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en el directorio raíz y añade las siguientes variables:

    ```env
    WHATSAPP_API_KEY=tu_clave_api_whatsapp
    AZURE_BOT_SERVICE_URL=https://tu-url-del-servicio-bot
    MONGO_DB_CONNECTION_STRING=tu_string_de_conexion_a_mongo_db
    AZURE_STORAGE_ACCOUNT=tu_cuenta_de_almacenamiento
    ```

4. Ejecuta la aplicación localmente:

    ```bash
    npm start
    ```

### Despliegue en Azure

1. Configura una instancia de **App Service de Azure**.
2. Despliega tu código en el App Service, ya sea a través de **GitHub Actions**, **Azure CLI** o **VS Code**.
3. Asegúrate de configurar tus variables de entorno en la configuración del App Service en Azure.

### Monitoreo

La aplicación utiliza **Azure Application Insights** para registrar eventos y monitorear el rendimiento. Asegúrate de conectar tu App Service a una instancia de Application Insights para rastrear métricas y registros.

### Endpoints de la API

- `POST /whatsapp-message`: Maneja los mensajes entrantes de WhatsApp.
- `POST /bot-response`: Envía una respuesta a través del Azure Bot Framework.

## Funcionamiento

1. Un usuario envía un mensaje a través de WhatsApp.
2. El mensaje se reenvía de manera segura a la API a través de la API de WhatsApp Business.
3. La API valida el mensaje usando un token de Azure Key Vault y lo procesa a través del Bot Framework.
4. Los datos de la conversación se guardan en MongoDB, y los registros se almacenan en Azure Application Insights.
5. Se envía una respuesta de vuelta al usuario en WhatsApp.

## Contribuciones

Si deseas contribuir, siéntete libre de abrir issues o enviar pull requests para mejoras.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
