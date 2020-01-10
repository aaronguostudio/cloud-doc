# Cloud Doc with Electron and React

## Environment configuration

- For running react and electron concurrently
  - yarn add --dev concurrently
- For loading page after react server is running
  - yarn add --dev wait-on
- For disabling open browser automatically
  - yarn add --dev cross-env
  - cross-env BROWSER=none npm start
- React code styles
  - It's build-in, check this [link](https://www.npmjs.com/package/eslint-config-react-app)

## Development

- yarn dev

## Design and implementations

- react-fontawsome

## Learned from the project

- Unidirectional data flow makes the developemnt easier. When build a project, we can start from the basic component, define the props, just make sure it will invoke the callback.



<!-- https://coding.imooc.com/lesson/384.html#mid=28147 -->
