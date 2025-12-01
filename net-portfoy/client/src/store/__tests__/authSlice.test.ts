import authReducer, { logout, setCredentials } from '../authSlice';

describe('Auth Reducer Testleri', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    message: '',
  };

  it('Başlangıç durumu (initial state) doğru olmalı', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('setCredentials actionı statei güncellemeli', () => {
    const mockUser = {
      _id: '1',
      name: 'Test User',
      email: 'test@test.com',
      token: 'xyz',
      isPhoneVerified: true,
      features: []
    };

    const nextState = authReducer(initialState, setCredentials(mockUser));
    
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.user?.email).toBe('test@test.com');
  });

  it('logout actionı statei temizlemeli', () => {
    const loggedInState = {
      ...initialState,
      user: { _id: '1', name: 'User', email: 'u@u.com', token: 't', isPhoneVerified: true, features: [] }
    };

    const nextState = authReducer(loggedInState, logout());
    
    expect(nextState.user).toBeNull();
  });
});