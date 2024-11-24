## Requisitos

# Preparación del entorno

```bash
$ cp .env.example .env
```

Se requiere añadir valor a todas las variables contenidas en estos dos ficheros.

```bash
$ npm i
```

## Start entorno local

```bash
$ npm run docker:up
```

## Stop entorno local

```bash
$ npm run docker:dev:down
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
