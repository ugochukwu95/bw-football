# bw-football
A single page responsive application (http://frozen-river-25069.herokuapp.com/) using Reactjs. 

This application provides access to the latest football fixtures, results, standings and highest goal scorers of the top five major European cometitons (La Liga, English Premier League, Italian Serie A, German Bundesliga and the Portugese Primeira Liga). The application uses the https://www.football-data.org/ API to provide support. 

Packages used:
- MaterializeCSS Framework: Created and designed by Google. The framework provides html and css components that conforms to Google's well researched Material Design documentation to provide visually stunning websites that are also easy to use. Elements and components such as grids, typography, color, and imagery are not only visually pleasing, but also create a sense of hierarchy, meaning, and focus. Emphasis on different actions and components create a visual guide for users.

- fontawesome-free: This package provides icons that can be included in HTML content.

- Google Material Icons: This package also provides icons that can be included in HTML content.

- redux: This package provides a data store, which simplifies the process of coordinating the different parts of the application. React applications rely heavily on props, which are objects that contains information to be consumed by react components. Components are arranged heirachically therefore, inorder for child components to access props, props have to passed from parent to parent to parent depending on how deep the hierachy is. Redux solves this by allowing components to be fed directly  with data. 

- react-redux: This package integrates a Redux data store into a React application.

- react-router-dom: This package provides URL routing, which allows the content presented to the user to be selected based on the browser’s current URL.

- axios: This package is used to make HTTP requests and will be used to access RESTful services. Axios also handles converting JSON data gotten from the API or server to normal JavaScript Objects.

- json-server: This package was used to provide a RESTful web service. It takes a JSON file (check productionData.js in the root directory) and creates a persistent database. This stores data that would have been in a components state.

- cors: This package is used to enable cross-origin request sharing (CORS) requests.

- express: This package is used to host the back-end servers. It provides simple wrappers around core node.js functionality that supports the RESTful webservice.

- chokidar: This package monitors the RESTful data files for changes and automatically restarts the server.

- npm-run-all: This package is used to run multiple NPM scripts in a single command.

- connect-history-api-fallback This package is used to respond to HTTP requests with the index.html file and is used in the production server.

This project took 4 days to complete.

