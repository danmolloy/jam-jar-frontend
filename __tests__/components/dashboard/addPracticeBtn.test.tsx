import '@testing-library/jest-dom';
import AddPracticeBtn from '@/components/dashboard/addPracticeBtn';
import { act, fireEvent, render, screen } from '@testing-library/react';

global.alert = jest.fn();

describe('<AddPracticeBtn />', () => {
  beforeEach(() => {
    render(<AddPracticeBtn subscriptionStatus={'active'} />);
    const newBtn = screen.getByText('New');
    act(() => {
      fireEvent.click(newBtn);
    });
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
  it('renders', () => {
    const addPracBtn = screen.getByTestId('add-practice-btn');
    expect(addPracBtn).toBeInTheDocument();
    const newBtn = screen.getByText('New');
    expect(newBtn).toBeInTheDocument();
  });

  it('practice link is in the document with expected href', () => {
    const pracLink = screen.getByText('Practice');
    expect(pracLink).toBeInTheDocument();
    expect(pracLink).toHaveAttribute('href', '/items/create');
  });
  it('diary entry link is in the document with expected href', () => {
    const diaryLink = screen.getByText('Diary Entry');
    expect(diaryLink).toBeInTheDocument();
    expect(diaryLink).toHaveAttribute('href', '/diary/create');
  });
  it('recording link is in the document with expected href (for premium users)', () => {
    const recordingLink = screen.getByText('Recording');
    expect(recordingLink).toBeInTheDocument();
    expect(recordingLink).toHaveAttribute('href', '/audio/create');
  });
});

describe('<AddPracticeBtn />', () => {
  beforeEach(() => {
    render(<AddPracticeBtn subscriptionStatus={null} />);
    const newBtn = screen.getByText('New');
    act(() => {
      fireEvent.click(newBtn);
    });
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
  it('renders', () => {
    const addPracBtn = screen.getByTestId('add-practice-btn');
    expect(addPracBtn).toBeInTheDocument();
  });
  it('recording btn is in the document with expected alert (for basic users)', () => {
    const recBtn = screen.getByText('Recording');
    expect(recBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(recBtn);
    });
    expect(global.alert).toHaveBeenCalledWith('Premium users only. Upgrade to add recordings.');
  });
});
