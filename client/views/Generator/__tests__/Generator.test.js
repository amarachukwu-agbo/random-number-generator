import React from 'react';
import {
  render, fireEvent, cleanup, waitForElement,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import Generator from '..';

const mockPhoneNumbers = {
  phoneNumbers: [
    '0197526412',
    '0676706507',
    '0846205003',
    '0745958059',
    '0431347921',
    '0756598026',
    '0171369808',
    '0394491530',
    '0135872917',
    '0241633341',
  ],
  meta: {
    totalCount: 100,
    currentPage: 2,
    pagesCount: 10,
    limit: 10,
  },
  minMaxPhoneNumbers: {
    minNumber: '0135872917',
    maxNumber: '0846205003',
  },
};

const mockMinMaxNumbers = {
  minMaxPhoneNumbers: {
    minNumber: '0135872917',
    maxNumber: '0846205003',
  },
};

describe('Number Generator', () => {
  beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
      if (/api\/v1\/numbers\/minMax/.test(url)) {
        return Promise.resolve({ data: mockMinMaxNumbers });
      }
      return Promise.resolve({ data: mockPhoneNumbers });
    });
  });

  afterEach(cleanup);

  test('it renders correctly', async () => {
    const { container } = render(<Generator />);
    expect(container.firstChild).toMatchSnapshot();
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
  });

  test('it fetches the next page of numbers when the next button is clicked', async () => {
    const { getByText } = render(<Generator />);
    const nextButton = await waitForElement(() => getByText('Next'));
    fireEvent.click(nextButton);
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/numbers?page=3');
  });

  test('it fetches the previous page of numbers when the previous button is clicked', async () => {
    const { getByText } = render(<Generator />);
    const prevButton = await waitForElement(() => getByText('Previous'));
    fireEvent.click(prevButton);
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/numbers?page=1');
  });

  test('it fetches the min and max numbers', async () => {
    const { getByTestId } = render(<Generator />);
    const maxNumber = await waitForElement(() => getByTestId('max-number'));
    const minNumber = await waitForElement(() => getByTestId('min-number'));
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(minNumber.textContent).toBe('0135872917');
    expect(maxNumber.textContent).toBe('0846205003');
  });

  test('it sets error when there is an error fetching numbers', async () => {
    axiosMock.get.mockImplementation((url) => {
      if (/api\/v1\/numbers\/minMax/.test(url)) {
        return Promise.resolve({ data: mockMinMaxNumbers });
      }
      return Promise.reject(new Error('An error occured'));
    });
    render(<Generator />);
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
  });
});
