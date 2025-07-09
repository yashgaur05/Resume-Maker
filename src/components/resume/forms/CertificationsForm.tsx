'use client';

import { useState } from 'react';
import { Certification } from '@/types/resume';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    onChange([...data, newCertification]);
    setEditingIndex(data.length);
  };

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteCertification = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Certifications</h3>
        <button
          onClick={addCertification}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No certifications added yet</p>
          <button
            onClick={addCertification}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((cert, index) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certification Name *
                          </label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCertification(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Issuing Organization *
                          </label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amazon Web Services"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Issue Date *
                          </label>
                          <input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(index, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (Optional)
                          </label>
                          <input
                            type="month"
                            value={cert.expiryDate || ''}
                            onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Credential ID (Optional)
                          </label>
                          <input
                            type="text"
                            value={cert.credentialId || ''}
                            onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ABC123456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Verification URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={cert.url || ''}
                            onChange={(e) => updateCertification(index, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://verify.certification.com"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {cert.name || 'Certification Name'}
                      </h4>
                      <p className="text-blue-600 text-sm">{cert.issuer}</p>
                      <p className="text-gray-600 text-sm">
                        Issued: {cert.date}
                        {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                      </p>
                      {cert.credentialId && (
                        <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {editingIndex === index ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteCertification(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">🏆 Certification Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Include relevant industry certifications</li>
          <li>• List certifications in reverse chronological order</li>
          <li>• Include credential IDs for verification</li>
          <li>• Mention if certification is currently active</li>
          <li>• Focus on certifications relevant to your target role</li>
        </ul>
      </div>
    </div>
  );
}
