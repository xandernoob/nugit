import { fireEvent, render, screen } from '@testing-library/react';
import axios from "axios";
import App from './App';
import {fetchUser} from './utils'

test('Inputting text updates the state',() => {
  render(<App />);
  const input = screen.getByPlaceholderText("Search");

  expect(input.value).toBe("");
  fireEvent.change(input, {target: {value: 'Test'}})
  expect(input.value).toBe("Test");
});


jest.mock("axios");

describe("fetchQuery", () => {
  describe("when API call is successful", () => {
    it("should return user list", async () => {
      const user = [
        { id: 1, login: 'A', avatar_url: 'https://github.com/A'},
        { id: 2, login: 'B', avatar_url: 'https://github.com/B'}
      ];
      axios.get.mockResolvedValueOnce(user);

      const result = await fetchUser();

      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(user);
    })
  })
})

describe("when API call fails", () => {
  it("should return empty list", async () => {
    const message = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(message));

    const result = await  fetchUser();

    expect(axios.get).toHaveBeenCalled();
    expect(result).toEqual([]);
  })
})

