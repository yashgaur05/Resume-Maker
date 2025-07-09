'use client';

import { CustomSection } from '@/types/resume';

interface CustomSectionsFormProps {
  data: CustomSection[];
  onChange: (data: CustomSection[]) => void;
}

export default function CustomSectionsForm({ data, onChange }: CustomSectionsFormProps) {
  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: '',
      items: []
    };
    onChange([...data, newSection]);
  };

  const updateSection = (index: number, field: keyof CustomSection, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteSection = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const addSectionItem = (sectionIndex: number) => {
    const updated = [...data];
    updated[sectionIndex].items.push({
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: '',
      date: '',
      url: ''
    });
    onChange(updated);
  };

  const updateSectionItem = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
    const updated = [...data];
    updated[sectionIndex].items[itemIndex] = {
      ...updated[sectionIndex].items[itemIndex],
      [field]: value
    };
    onChange(updated);
  };

  const deleteSectionItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...data];
    updated[sectionIndex].items.splice(itemIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Custom Sections</h3>
        <button
          onClick={addCustomSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Section
        </button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-purple-800 mb-2">➕ Custom Section Ideas</h4>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-700">
          <div>• Volunteer Experience</div>
          <div>• Publications</div>
          <div>• Speaking Engagements</div>
          <div>• Professional Memberships</div>
          <div>• Hobbies & Interests</div>
          <div>• Patents</div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No custom sections added yet</p>
          <button
            onClick={addCustomSection}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Custom Section
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((section, sectionIndex) => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                  className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Section Title (e.g., Volunteer Experience)"
                />
                <button
                  onClick={() => deleteSection(sectionIndex)}
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateSectionItem(sectionIndex, itemIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Item title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subtitle (Optional)
                        </label>
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) => updateSectionItem(sectionIndex, itemIndex, 'subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Organization, location, etc."
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date (Optional)
                        </label>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => updateSectionItem(sectionIndex, itemIndex, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="2023 or Jan 2023 - Present"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={item.url || ''}
                          onChange={(e) => updateSectionItem(sectionIndex, itemIndex, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => updateSectionItem(sectionIndex, itemIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Brief description..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteSectionItem(sectionIndex, itemIndex)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addSectionItem(sectionIndex)}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  + Add Item to {section.title || 'Section'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
