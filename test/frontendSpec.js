import users from '../client/src/reducers/reducer-users'

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
})

