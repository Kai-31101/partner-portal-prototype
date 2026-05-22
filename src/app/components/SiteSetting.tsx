import { useState } from 'react';
import { Eye, Save, Upload, FileText, Image as ImageIcon, Video } from 'lucide-react';

const mediaSections = [
  {
    name: 'Logo',
    type: 'image',
    current: 'arobid-partner-logo.png',
    positions: ['Header', 'Footer'],
    selectedPosition: 'Header',
    action: 'Upload Logo',
  },
  {
    name: 'Hero Banner',
    type: 'image',
    current: 'partner-hero-banner.jpg',
    positions: ['Hero Banner', 'Middle Banner', 'Footer'],
    selectedPosition: 'Hero Banner',
    action: 'Upload Banner',
  },
  {
    name: 'Introduction Video',
    type: 'video',
    current: 'intro-video.mp4',
    positions: ['Middle Banner', 'Footer'],
    selectedPosition: 'Middle Banner',
    action: 'Upload MP4',
  },
];

const contentSections = [
  {
    name: 'Hero Title',
    type: 'text',
    value: 'Vietnam Export Alliance',
  },
  {
    name: 'Introduction',
    type: 'content',
    value: 'Trade promotion partner for export-ready enterprises.',
  },
  {
    name: 'Capability Summary',
    type: 'content',
    value: 'Expo programs, verified enterprise onboarding, RFQ generation, and trade credit access.',
  },
];

export default function SiteSetting() {
  const [saveMessage, setSaveMessage] = useState('');
  const [previewMessage, setPreviewMessage] = useState('');

  const handleSave = () => {
    setPreviewMessage('');
    setSaveMessage('Configuration saved for configurable sections.');
  };

  const handlePreview = () => {
    setSaveMessage('');
    setPreviewMessage('Preview opened using the current draft configuration.');
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F5F7FB]">
      <div className="px-8 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-[#475569]">Assigned template is contract-defined and display-only</div>
            <h2 className="mt-1 text-2xl font-bold text-[#0F172A]">Mini-site configurable sections</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 rounded-lg border border-[#C9D6E2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <Eye size={16} />
              Preview Site
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-lg bg-[#07847B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#066F68]"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        {(saveMessage || previewMessage) && (
          <div className="mb-5 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800">
            {saveMessage || previewMessage}
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Template ID</div>
            <div className="mt-2 text-lg font-bold text-[#0F172A]">partner-template-01</div>
            <div className="mt-2 text-sm text-[#64748B]">Partner cannot select or replace template here.</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Template Name</div>
            <div className="mt-2 text-lg font-bold text-[#0F172A]">Alliance Partner Landing Template</div>
            <div className="mt-2 text-sm text-[#64748B]">Structure is governed by template definition.</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Editable Scope</div>
            <div className="mt-2 text-lg font-bold text-[#0F172A]">Configurable sections only</div>
            <div className="mt-2 text-sm text-[#64748B]">No template structure or site activation control.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-xl border border-[#D7E0EA] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-[#07847B]">
                <ImageIcon size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Media Assets</h3>
                <p className="text-sm text-[#64748B]">Image and video sections expose upload controls and allowed page positions.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#D7E0EA]">
              <div className="grid grid-cols-[1fr_0.85fr_0.95fr_0.7fr] gap-3 border-b border-[#D7E0EA] bg-[#EEF3F8] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#334155]">
                <span>Section</span>
                <span>Current Media</span>
                <span>Position in Page</span>
                <span className="text-right">Action</span>
              </div>
              {mediaSections.map((section, index) => (
                <div
                  key={section.name}
                  className={`grid grid-cols-[1fr_0.85fr_0.95fr_0.7fr] items-center gap-3 px-4 py-4 text-sm ${
                    index < mediaSections.length - 1 ? 'border-b border-[#E2E8F0]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 font-semibold text-[#0F172A]">
                    {section.type === 'video' ? <Video size={18} className="text-violet-600" /> : <ImageIcon size={18} className="text-teal-600" />}
                    <div>
                      <div>{section.name}</div>
                      <div className="text-xs font-medium uppercase tracking-wide text-[#64748B]">{section.type}</div>
                    </div>
                  </div>
                  <span className="truncate text-[#475569]">{section.current}</span>
                  <select defaultValue={section.selectedPosition} className="h-10 rounded-lg border border-[#C9D6E2] bg-white px-3 text-sm font-medium text-[#0F172A]">
                    {section.positions.map((position) => (
                      <option key={position}>{position}</option>
                    ))}
                  </select>
                  <button className="ml-auto inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                    <Upload size={15} />
                    {section.action}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#D7E0EA] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Content</h3>
                <p className="text-sm text-[#64748B]">Text and content sections show their current values in editable fields.</p>
              </div>
            </div>

            <div className="space-y-4">
              {contentSections.map((section) => (
                <label key={section.name} className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#64748B]">{section.name}</span>
                  {section.type === 'text' ? (
                    <input defaultValue={section.value} className="h-11 w-full rounded-lg border border-[#C9D6E2] bg-white px-3 text-sm font-medium text-[#0F172A]" />
                  ) : (
                    <textarea defaultValue={section.value} rows={4} className="w-full resize-y rounded-lg border border-[#C9D6E2] bg-white px-3 py-3 text-sm font-medium text-[#0F172A]" />
                  )}
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
