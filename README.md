## Requisitos

# Preparación del entorno
```bash
$ cp .env.example .env.dev
$ cp .env.example .env.test
```

Se requiere añadir valor a todas las variables contenidas en estos dos ficheros.

```bash
$ npm i
$ npm run build
```


## Start

# Entorno local
```bash
$ npm run docker:dev:up
```

# Entorno de test
```bash
$ npm run docker:test:up
```

# Ambos entornos
```bash
$ npm run compose:up
```


## Stop

# Entorno local
```bash
$ npm run docker:dev:down
```

# Entorno de test
```bash
$ npm run docker:test:down
```

# Ambos entornos
```bash
$ npm run compose:down
```


## Ejecución de tests

# Unitarios
```bash
$ npm run docker:test
```

# End to end
```bash
$ npm run docker:test:e2e
```

# Externos
```bash
$ npm run docker:test:out
```

# Coverage
```bash
$ npm run docker:test:cov
```


## Migraciones

# Crear nueva
```bash
$ npm run migration:create MigrationName
```

# Pendientes
```bash
$ npm run migration:pending
```

# Listado
```bash
$ npm run migration:list
```