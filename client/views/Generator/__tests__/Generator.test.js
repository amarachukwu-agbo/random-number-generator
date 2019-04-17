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
  batchIDs: ['15687', '16743'],
};

const mockGeneratedNumbers = {
  ...mockPhoneNumbers,
  generatedNumbers: mockPhoneNumbers.phoneNumbers,
};
describe('Number Generator', () => {
  beforeEach(() => {
    axiosMock.get.mockImplementation(() => (Promise
      .resolve({ data: mockPhoneNumbers })));
    axiosMock.post.mockImplementation(() => Promise.resolve(
      { data: mockGeneratedNumbers },
    ));
  });

  afterEach(cleanup);

  test('it renders correctly', async () => {
    const { container } = render(<Generator />);
    expect(container.firstChild).toMatchSnapshot();
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(axiosMock.get.mock.calls[0][0]).toContain('?page=1&sort=ASC');
  });

  test('it fetches the next page of numbers when the next button is clicked', async () => {
    const { getByText } = render(<Generator />);
    const nextButton = await waitForElement(() => getByText('Next'));
    fireEvent.click(nextButton);
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get.mock.calls[2][0]).toContain('?page=3&sort=ASC');
  });

  test('it fetches the previous page of numbers when the previous button is clicked', async () => {
    const { getByText } = render(<Generator />);
    const prevButton = await waitForElement(() => getByText('Previous'));
    fireEvent.click(prevButton);
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get.mock.calls[2][0]).toContain('?page=1&sort=ASC');
  });

  test('it fetches the min and max numbers', async () => {
    const { getByTestId } = render(<Generator />);
    const maxNumber = await waitForElement(() => getByTestId('Max'));
    const minNumber = await waitForElement(() => getByTestId('Min'));
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(minNumber.textContent).toBe('0135872917');
    expect(maxNumber.textContent).toBe('0846205003');
  });

  test('it fetches numbers in a batch when the batch is selected', async () => {
    const { getByTestId } = render(<Generator />);
    const dropdown = await waitForElement(() => getByTestId('dropdown'));
    fireEvent.click(dropdown);
    const dropdownItem = await waitForElement(() => getByTestId('dropdown-item-1'));
    fireEvent.click(dropdownItem);
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get.mock.calls[2][0]).toContain('numbers/16743?page=1&sort=ASC');
  });

  test('it generates new numbers when the `generate` button is clicked', async () => {
    const { getByText } = render(<Generator />);
    const generateButton = await waitForElement(() => getByText('Generate'));
    fireEvent.click(generateButton);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post.mock.calls[0][0]).toContain('numbers');
  });

  test('it sort numbers in descending order when down sort button', async () => {
    const { getByTestId } = render(<Generator />);
    const sortDownButton = await waitForElement(() => getByTestId('down-button'));
    fireEvent.click(sortDownButton);
    expect(sortDownButton).toHaveClass('active');
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get.mock.calls[2][0]).toContain('?page=1&sort=DESC');
  });

  test('it sort numbers in descending order when up sort button', async () => {
    const { getByTestId } = render(<Generator />);
    const sortUpButton = await waitForElement(() => getByTestId('up-button'));
    fireEvent.click(sortUpButton);
    expect(sortUpButton).toHaveClass('active');
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get.mock.calls[2][0]).toContain('?page=1&sort=ASC');
  });

  test('it sets error when there is an error fetching numbers', async () => {
    axiosMock.get.mockImplementation(() => Promise.reject(new Error('An error occured')));
    render(<Generator />);
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
  });
});
