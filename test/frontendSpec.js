import users from '../client/src/reducers/reducer-users';
import employeeAvailabilities from '../client/src/reducers/reducer-employee-availabilities';

describe('Shiftly Frontend Test Spec', () => {
  describe('users reducer', () => {
    const initialState = null;
    const stateWithOneUser = [{
      id: 194,
      name: 'r',
      role: 'employee',
      password: null,
    }];
    const stateWithAddedUser = [{
      id: 194,
      name: 'r',
      role: 'employee',
      password: null,
    }, {
      id: 204,
      name: 's',
      role: 'employee',
      password: null,
    }];

    it('should return the initial state', () => {
      expect(users(undefined, {})).toEqual(initialState)
    })
    
    it('should change the state with the action get users', () => {
      expect(users(undefined, {
        type: 'GET_USERS',
        payload: {data: stateWithOneUser}
      })).toEqual(stateWithOneUser)
    })

    it('should change the state with the action add employee', () => {
      expect(users(stateWithOneUser, {
        type: 'ADD_EMPLOYEE',
        payload: {data: {user: {
          id: 204,
          name: 's',
          role: 'employee',
          password: null,
        }}}
      })).toEqual(stateWithAddedUser)
    })
  })

  describe('employeeAvailabilities reducer', () => {
    const stateWithSingleUserAvailabilities = [];
    
    for(let i = 1; i < 15; i++) {
      stateWithSingleUserAvailabilities.push({ user_id: 1, day_part_id: i, is_available: true});
    }

    it('should return an initial state of "null"', () => {
      expect(employeeAvailabilities(undefined, {})).toEqual(null);
    });
    
    it('should add availabilities to the state with the action GET_EMPLOYEE_AVAILABILITIES', () => {
      expect(employeeAvailabilities(undefined, {
        type: 'GET_EMPLOYEE_AVAILABILITIES',
        payload: {data: stateWithSingleUserAvailabilities}
      })).toEqual(stateWithSingleUserAvailabilities);
      
    });
  })
})

