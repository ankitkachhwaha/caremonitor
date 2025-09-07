import { UserStore } from './user.store';

describe('UserStore', () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it('should set user', (done) => {
    store.setUser({ email: 'test@x.com', token: 'abc' });
    store.email.subscribe((email) => {
      expect(email).toBe('test@x.com');
      
      done();
    });
  });

  it('should clear user', (done) => {
    store.setUser({ email: 'test@x.com', token: 'abc' });
    store.clear();
    store.email.subscribe((email) => {

      expect(email).toBeNull();
      done();
    });
  });
});
