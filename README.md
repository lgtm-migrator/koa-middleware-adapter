# Koa Middleware Adapter

![](https://img.shields.io/npm/dm/koa-middleware-adapter.png?style=flat-square)

**Functions and promises can be used as middleware in koa.**

​    

## Install

```shell
$ npm i koa-middleware-adapter
```

​    

## Usage

```js
function signUp({ username, password }) {
  if (!username || !password) throw new adapter.Forbidden();

  // Business logic
  // ...

  return { message: 'success' };
}

router.post('/user', adapter.create(signUp, { statusCode: 200 }));
```

```shell
Response { statusCode: 403, body: { message: 'Forbidden'} }
Response { statusCode: 200, body: { message: 'success'} }
```

​    

## Spec

### Convert

```js
adapter.create(func, { parameters, response, handlers, statusCode });
```

​        

### Parameters

```js
function Parameter(
  where = new Where(null, true, true, true),
  options = { name: null, combineLevel: 0, as: null, index: undefined }
) {
  this.where = where;
  this.name = options.name;
  this.combineLevel = options.combineLevel;
  this.as = options.as;
  this.index = options.index;
}

function Where(name, koaRequest, nodeRequest, context) {
  this.name = name;
  this.koaRequest = koaRequest;
  this.nodeRequest = nodeRequest;
  this.context = context;
}
```

- Parameters defines the information of the parameters to pass.
  - `where` defines where to find the parameter.
    - If `where` is not an instance of `Where`, the parameter is `where` .
    - If `where` is an instance of `Where`, the parameter is found in `ctx` with information from `where`.
  - `name` is the name of the parameter.
    - If `name` exists, the same name is taken from the parameter's location.
  - `combineLevel` is the level at which the imported arguments are to be combined.
    - `0` means the imported parameter is the parameter to pass.
    - `1` means the imported parameter is a child of the parameter to pass.
  - `as` specifies a name when passing a parameter.
  - `index` is index of the parameter to pass.
- Where defines where to find the parameter.
  - `name` is the name of the location from which to retrieve the parameter.
  - `koaRequest` means to find the location of a parameter in `ctx.request`.
  - `nodeRequest` means to find the location of a parameter in `ctx.req`.
  - `context` means to find the location of a parameter in `ctx`.

- The default value is params, query, header, body, cookies defined.

​    

### Response

```js
function Response({ name, where, options }) {
  this.name = name;
  this.where = where;
  this.options = options;
}
```

- This option specifies where the response will be bind to ctx.
- The default value is `body`, which binds the request value to the body of the response.
- Another predefined option is `headers`, which binds the request value to the headers of the response.
-  Another predefined option is `context`, which binds the request value to the ctx.
-  Another predefined option is `cookies`, which binds the request value to the cookies.
- The other option sets the response to `ctx[bind.name]`.

​    

### Handlers

```js
const handlers = { parameterExtractionHandler, responseInjectionHandler, errorHandler };
```

​    

#### Parameter Extraction Handler

```js
function parameterExtractionHandler(ctx, parameters) {}
```

#### Response Injection Handler

```js
function responseInjectionHandler(ctx, result, options = {statusCode, response}) {}
```

#### Error Handler

```js
function errorHandler(ctx, error) {}
```

