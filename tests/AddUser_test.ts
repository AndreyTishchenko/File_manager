import { describe, it, expect, jest } from '@jest/globals';
import addUser from '../functions/AddUser';
import getDataBase from '../getDataBase';
import fs from 'fs';
import { User } from '../types/User';

jest.mock('../getDataBase');
jest.mock('fs');

describe('addUser', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    age: 30,
    hobbies: ['reading', 'coding']
  };

  const mockUsers: User[] = [
    { id: '2', name: 'Jane Doe', age: 13, hobbies: ['swimming', 'hiking'] }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getDataBase as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('should add a user to the database', async () => {
    await addUser(mockUser);

    expect(getDataBase).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(
      './database.json',
      JSON.stringify([...mockUsers, mockUser]),
      expect.any(Function)
    );
  });

  it('should handle file write errors', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Write error');
    (fs.writeFile as jest.Mock).mockImplementation((path, data, callback) => {
      callback(mockError);
    });

    await addUser(mockUser);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    consoleErrorSpy.mockRestore();
  });

  it('should work with an empty database', async () => {
    (getDataBase as jest.Mock).mockResolvedValue([]);

    await addUser(mockUser);

    expect(fs.writeFile).toHaveBeenCalledWith(
      './database.json',
      JSON.stringify([mockUser]),
      expect.any(Function)
    );
  });

  it('should handle multiple users being added', async () => {
    const anotherUser: User = {
      id: '3',
      name: 'Alice Smith',
      email: 'alice@example.com'
    };

    await addUser(mockUser);
    await addUser(anotherUser);

    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(fs.writeFile).toHaveBeenLastCalledWith(
      './database.json',
      JSON.stringify([...mockUsers, mockUser, anotherUser]),
      expect.any(Function)
    );
  });
});
