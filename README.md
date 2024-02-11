## Requisitos

# Gestor de paquetes

```bash
$ npm install -g yarn
```

# Preparación del entorno

```bash
$ cp .env.example .env.dev
$ cp .env.example .env.test
```

Se requiere añadir valor a todas las variables contenidas en estos dos ficheros.

```bash
$ yarn install
$ yarn build
```

## Start

# Entorno local

```bash
$ yarn docker:dev:up
```

# Entorno de test

```bash
$ yarn docker:test:up
```

# Ambos entornos

```bash
$ yarn compose:up
```

## Stop

# Entorno local

```bash
$ yarn docker:dev:down
```

# Entorno de test

```bash
$ yarn docker:test:down
```

# Ambos entornos

```bash
$ yarn compose:down
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
