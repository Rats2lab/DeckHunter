## Requisitos

# Gestor de paquetes

```bash
$ npm install -g yarn
```

# Preparación del entorno

```bash
$ cp .env.example .env
```

Se requiere añadir valor a todas las variables contenidas en estos dos ficheros.

```bash
$ yarn install
$ yarn build
```

## Start entorno local

```bash
$ yarn docker:up
```

## Stop entorno local

```bash
$ yarn docker:dev:down
```

## Ejecución de tests

# Unitarios

```bash
$ yarn docker:test
```

# End to end

```bash
$ yarn docker:test:e2e
```

# Externos

```bash
$ yarn docker:test:out
```

# Coverage

```bash
$ yarn docker:test:cov
```

## Migraciones

# Crear nueva

```bash
$ yarn migration:create MigrationName
```

# Pendientes

```bash
$ yarn migration:pending
```

# Listado

```bash
$ yarn migration:list
```
