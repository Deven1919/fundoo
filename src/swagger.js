import swaggerAutogen from 'swagger-autogen';
//  const swaggerAutogen= require("swagger-autogen")


const doc = {
    info: {
      title: 'Google keep',
      description: 'This is the replica of google keep.User can register and login, user can do request for forgot password and he can reset password using that shared credentionals. User can login and perform note CRUD.'
    },
    host: 'localhost:3000'
  };
  

  
  const outputFile = './swagger-output.json';
   const routes = ['./routes/user.route.ts','./routes/notes.route.ts'];
  
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
   swaggerAutogen()(outputFile, routes, doc);