import { RegisterUserCommand } from './register-user.command';

describe('RegisterUserCommand', () => {
  it('should create an instance with the correct properties', () => {
    const username = 'testuser';
    const password = 'password';
    const command = new RegisterUserCommand(username, password);

    expect(command.username).toBe(username);
    expect(command.password).toBe(password);
  });
});