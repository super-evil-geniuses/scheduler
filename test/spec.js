const expect = require('chai').expect;
const pg = require('pg');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
require('dotenv').config();

/*
Mock 'http' objects for testing Express routing functions, but could be used for testing any Node.js web server applications that have code that requires mockups of the request and response objects
*/
const httpMocks = require('node-mocks-http');
const request = require('supertest'); //used for testing http
//require the necessary files
const app = require('../server/app.js');
const schema = require('../database/config.js');
const port = process.env.PORT || 8080;

/************
/* The following code needs to be updated to work with postgres. This was taken from a shortly express
/************/
// describe('', function() {
//   var db;
//   var server;

//   var clearDB = function(connection, tablenames, done) {
//     var count = 0;
//     tablenames.forEach(function(tablename) {
//       connection.query(`DROP TABLE IF EXISTS ${tablename}`, function() {
//         count++;
//         if (count === tablenames.length) {
//           return schema(db).then(done); // CHANGE THIS LINE SINCE THE SETUP IS DIFFERENT THAN THE SPRINT'S DB 
//         }
//       });
//     });
//   };

//   beforeEach(function(done) {

//     db = new pg.Client({
//       user: process.env.DB_USER || 'sofiegraham',
//       password: process.env.DB_PASS || null,
//       database: process.env.DB_NAME || 'shiftly'
//     });

//     ************************************************************************************
//     /* TODO: If you create a new table, add it to the tablenames collection below. */
//     /**************************************************************************************/
//     var tablenames = ['user', 'schedule', 'employee_availability', 'actual_schedule', 'needed_employee', 'day_part'];

//     db.connect(function(err) {
//       if (err) { return done(err); }
//       /* Empties the db table before each test so that multiple tests
//        * (or repeated runs of the tests) won't screw each other up: */
//       clearDB(db, tablenames, function() {
//         server = app.listen(port, done);
//       });
//     });

//     afterEach(function() { server.close(); });
//   });
// });

describe('Shiftly Test Spec', function() {

  let sequelize;
  let server;
  let db;

  before((done) => {
    sequelize = new Sequelize(process.env.DB_NAME || 'shiftly', process.env.DB_USER || 'postgres', process.env.DB_PASS || null, { host: process.env.DB_HOST || 'localhost', dialect: 'postgres' });
    db = schema(sequelize);
    setTimeout(done, 1000);
  })

  beforeEach((done) => {

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    
    const tables = ['User', 'Schedule', 'Needed_Employee', 'Employee_Availability', 'Actual_Schedule'];
    Promise.each(tables, table => {
      return db[table].destroy({ where: {} });
    })
    .then(() => {
      server = app.listen(port, done);
    });
    
    afterEach(() => {
      server.close();
    });
  });


  it('sent a template object and was successfully stored in the db', function(done) {
    request(app)
      .post('/template-schedule')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        mondayDate: new Date('11/13/17'),
        monA: 2,
        monP: 2,
        tuesA: 2,
        tuesA: 2,
        wedsA: 2,
        wedsP: 2,
        thursA: 2,
        thursP: 2,
        friA: 2,
        friP: 2,
        satA: 2,
        satP: 2,
        sunA: 2,
        sunP: 2
      }))
      .expect(`template is stored`, done);
  });
});