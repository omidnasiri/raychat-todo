import { User } from './user.model';
import { UserRegisteredEvent } from './event/user-registered.event';

describe('User', () => {
  it('should create an instance with the correct properties', () => {
    const id = '1';
    const username = 'testuser';
    const password = 'password';
    const user = new User(id, username, password);

    expect(user).toBeInstanceOf(User);
    expect(user['id']).toBe(id);
    expect(user['username']).toBe(username);
    expect(user['password']).toBe(password);
  });

  it('should apply UserRegisteredEvent when register is called', () => {
    const id = '1';
    const username = 'testuser';
    const password = 'password';
    const user = new User(id, username, password);

    const applySpy = jest.spyOn(user as any, 'apply');

    user.register();

    expect(applySpy).toHaveBeenCalledWith(new UserRegisteredEvent(id, username, password));
  });
});