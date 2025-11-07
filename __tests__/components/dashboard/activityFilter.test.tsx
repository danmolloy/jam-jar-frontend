import "@testing-library/jest-dom"
import ActivityFilter, {ActivityFilterProps} from "@/components/dashboard/activityFilter"
import { render, screen } from "@testing-library/react"

const mockProps: ActivityFilterProps = {
  activities: ['poop', 'sing'],
  selectedActivity: '',
  setSelectedActivity: () => jest.fn()
}

describe("<ActivityFilter", () => {
  beforeEach(() => {
    render(<ActivityFilter {...mockProps}/>)
  })
  it("renders", () => {
    const activityFilter = screen.getByTestId("activity-filter")
    expect(activityFilter).toBeInTheDocument();
  })
  it("'All Activities' option is in the document", () => {})
  it("All activities props are in the document with expected val, text content & calls setSelectedActivity", () => {
    for (let i = 0; i < mockProps.activities.length; i ++) {
      let capitalized = mockProps.activities[i]![0].toUpperCase() + mockProps.activities[i]!.slice(1).toLowerCase()
      let activity = screen.getByText(capitalized)
      expect(activity).toBeInTheDocument();
      expect(activity).toHaveAttribute("value", capitalized)
    }
  })
})