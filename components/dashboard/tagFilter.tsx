

export default function TagFilter({tags, selectedTag, setSelectedTag}: {
  tags: string[];
  selectedTag: string;
  setSelectedTag: (arg: string) => void
}) {

  const tagsSet = new Set(tags.map(i => i !== undefined && i.toLowerCase()))

  return (
    <select className="rounded p-1 mx-1 bg-white " value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
      <option value={""}>All tags</option>
      {Array.from(tagsSet).map((i, index) => (
        <option key={index} value={i || ""}>{i}</option>
      ))}
    </select>
  )
}