#Next.js Teslo Shop

docker-compose up -d

#Configurar las variables de entorno

Renombrar el archivo .env.template a .env

    MongoDB URL Local:
    MONGO_URL=mongodb://localhost:27017/teslodb
    JWT_SECRET=JSYOWL235A 
    NEXT_PUBLIC_TAX_RATE=0.15 

#Reconstruir los módulos de node y levantar Next

    yarn install
    yarn dev


#Llenar la base de datos con información de pruebas
Llamara:

http://localhost:3000/api/seed