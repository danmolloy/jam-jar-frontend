import '@testing-library/jest-dom';
import TagFilter, { TagFilterProps } from '@/components/dashboard/tagFilter';
import { render, screen } from '@testing-library/react';

const mockProps: TagFilterProps = {
  tags: ['piano', 'auditionPrep'],
  selectedTag: '',
  setSelectedTag: () => jest.fn(),
};

describe('<TagFilter />', () => {
  beforeEach(() => {
    render(<TagFilter {...mockProps} />);
  });
  it('renders', () => {
    const tagFilter = screen.getByTestId('tag-filter');
    expect(tagFilter).toBeInTheDocument();
  });
  it("'All Tags' option is in the document with empty value", () => {
    const allTags = screen.getByText('All tags');
    expect(allTags).toBeInTheDocument();
    expect(allTags).toHaveValue('');
  });
  it('all tags are in the document with correct value', () => {
    for (let i = 0; i < mockProps.tags.length; i++) {
      const filter = screen.getByText(mockProps.tags[i].toLowerCase());
      expect(filter).toBeInTheDocument();
      expect(filter).toHaveValue(mockProps.tags[i].toLowerCase());
    }
  });
});
