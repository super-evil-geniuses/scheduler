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
const algo = require('../helpers/algo.js');

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


  // it('sent a template object and was successfully stored in the db', function(done) {
  //   request(app)
  //     .post('/template-schedule')
  //     .set('Content-Type', 'application/json')
  //     .send(JSON.stringify({
  //       mondayDate: new Date('11/13/17'),
  //       monA: 2,
  //       monP: 2,
  //       tuesA: 2,
  //       tuesA: 2,
  //       wedsA: 2,
  //       wedsP: 2,
  //       thursA: 2,
  //       thursP: 2,
  //       friA: 2,
  //       friP: 2,
  //       satA: 2,
  //       satP: 2,
  //       sunA: 2,
  //       sunP: 2
  //     }))
  //     .expect(`template is stored`, done);
  // });


  it('should get a 200 response for getAllUsers request', function(done) {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});

describe('Algo', function() {

  let allEmployeeAvail = 
{ '1': [ 1, 2, 5, 6, 7, 8, 9, 10 ],
  '2': [ 1, 2, 5, 6, 7, 8, 10 ],
  '3': [ 1, 2, 5, 6, 7, 8, 9, 10 ],
  '4': [ 2, 5, 6, 7 ],
  '5': [ 1, 3, 4, 5, 6, 7, 8, 9, 10 ],
  '6': [ 1, 4, 6, 7, 8, 10 ],
  '7': [ 1, 3, 5, 6, 7, 8, 9, 10 ],
  '8': [ 5, 6, 10 ],
  '9': [ 1, 3, 4, 5, 6, 7, 8, 9, 10 ],
  '10': [ 1, 3, 4, 5, 6, 7, 8, 10 ],
  '11': [ 1, 3, 4, 5, 6, 7, 8, 9, 10 ],
  '12': [ 1, 3, 4, 5, 6, 8, 9, 10 ],
  '13': [ 2, 4, 6, 7, 9 ],
  '14': [ 2, 4, 5, 6, 7 ] };

let temp = 
{ '1': 1,
  '2': 2,
  '3': 2,
  '4': 2,
  '5': 2,
  '6': 3,
  '7': 2,
  '8': 4,
  '9': 3,
  '10': 5,
  '11': 4,
  '12': 5,
  '13': 3,
  '14': 2 };

  let result = algo.scheduleGenerator(allEmployeeAvail, temp);
  it('algo should return an array', function(){
    expect(result).to.be.a('object');
  });

  it('algo should schedule exactly as many servers as specified', function(){
    expect(result['1']).to.have.lengthOf(temp['1']);
    expect(result['2']).to.have.lengthOf(temp['2']);
    expect(result['3']).to.have.lengthOf(temp['3']);
    expect(result['4']).to.have.lengthOf(temp['4']);
    expect(result['5']).to.have.lengthOf(temp['5']);
    expect(result['6']).to.have.lengthOf(temp['6']);
    expect(result['7']).to.have.lengthOf(temp['7']);
    expect(result['8']).to.have.lengthOf(temp['8']);
    expect(result['9']).to.have.lengthOf(temp['9']);
    expect(result['10']).to.have.lengthOf(temp['10']);
    expect(result['11']).to.have.lengthOf(temp['11']);
    expect(result['12']).to.have.lengthOf(temp['12']);
    expect(result['13']).to.have.lengthOf(temp['13']);
    expect(result['14']).to.have.lengthOf(temp['14']);
  });

  it('algo should not schedule employees on days they aren\'t available', function () {
    expect(result['4'].indexOf(1)).to.equal(-1);
    expect(result['8'].indexOf(1)).to.equal(-1);
    expect(result['13'].indexOf(1)).to.equal(-1);
    expect(result['14'].indexOf(1)).to.equal(-1);

    expect(result['5'].indexOf(2)).to.equal(-1);
    expect(result['6'].indexOf(2)).to.equal(-1);
    expect(result['7'].indexOf(2)).to.equal(-1);
    expect(result['8'].indexOf(2)).to.equal(-1);
    expect(result['9'].indexOf(2)).to.equal(-1);
    expect(result['10'].indexOf(2)).to.equal(-1);
    expect(result['11'].indexOf(2)).to.equal(-1);
    expect(result['12'].indexOf(2)).to.equal(-1);

    expect(result['1'].indexOf(3)).to.equal(-1);
    expect(result['2'].indexOf(3)).to.equal(-1);
    expect(result['3'].indexOf(3)).to.equal(-1);
    expect(result['4'].indexOf(3)).to.equal(-1);
    expect(result['6'].indexOf(3)).to.equal(-1);
    expect(result['8'].indexOf(3)).to.equal(-1);
    expect(result['13'].indexOf(3)).to.equal(-1);
    expect(result['14'].indexOf(3)).to.equal(-1);

    expect(result['1'].indexOf(4)).to.equal(-1);
    expect(result['2'].indexOf(4)).to.equal(-1);
    expect(result['3'].indexOf(4)).to.equal(-1);
    expect(result['4'].indexOf(4)).to.equal(-1);
    expect(result['7'].indexOf(4)).to.equal(-1);
    expect(result['8'].indexOf(4)).to.equal(-1);

    expect(result['6'].indexOf(5)).to.equal(-1);
    expect(result['13'].indexOf(5)).to.equal(-1);

    expect(result['8'].indexOf(7)).to.equal(-1);
    expect(result['12'].indexOf(7)).to.equal(-1);
    
    expect(result['4'].indexOf(8)).to.equal(-1);
    expect(result['8'].indexOf(8)).to.equal(-1);
    expect(result['13'].indexOf(8)).to.equal(-1);
    expect(result['14'].indexOf(8)).to.equal(-1);

    expect(result['2'].indexOf(9)).to.equal(-1);
    expect(result['4'].indexOf(9)).to.equal(-1);
    expect(result['6'].indexOf(9)).to.equal(-1);
    expect(result['8'].indexOf(9)).to.equal(-1);
    expect(result['10'].indexOf(9)).to.equal(-1);
    expect(result['14'].indexOf(9)).to.equal(-1);

    expect(result['4'].indexOf(10)).to.equal(-1);
    expect(result['13'].indexOf(10)).to.equal(-1);
    expect(result['14'].indexOf(10)).to.equal(-1);
  });

  it('algo should autofill house shift if not enough employees are available', function(){
    expect(result['8'].indexOf('house')).to.not.equal(-1);
  })
});