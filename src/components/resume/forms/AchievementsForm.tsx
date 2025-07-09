'use client';

import { Achievement } from '@/types/resume';

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      issuer: ''
    };
    onChange([...data, newAchievement]);
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteAchievement = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Achievements & Awards</h3>
        <button
          onClick={addAchievement}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Achievement
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No achievements added yet</p>
          <button
            onClick={addAchievement}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((achievement, index) => (
            <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Employee of the Year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="month"
                    value={achievement.date}
                    onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe your achievement and its impact..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization (Optional)
                </label>
                <input
                  type="text"
                  value={achievement.issuer || ''}
                  onChange={(e) => updateAchievement(index, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name, Organization, etc."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => deleteAchievement(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-800 mb-2">🌟 Achievement Tips</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Include quantifiable achievements when possible</li>
          <li>• Focus on achievements relevant to your career goals</li>
          <li>• Include both professional and academic achievements</li>
          <li>• Mention awards, recognitions, and honors</li>
          <li>• Highlight leadership roles and special projects</li>
        </ul>
      </div>
    </div>
  );
}
