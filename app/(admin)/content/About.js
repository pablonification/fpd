'use client';
import { useState, useEffect } from 'react';
import FormField from '../_components/FormField';
import ConfirmModal from '../_components/ConfirmModal';
import toast from 'react-hot-toast';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full animate-pulse rounded-xl bg-gray-100" />
  ),
});
import 'react-quill-new/dist/quill.snow.css';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
  keyboard: {
    bindings: {
      // Disable automatic list formatting with dash
      'list autofill': {
        key: ' ',
        shiftKey: null,
        collapsed: true,
        format: { list: false },
        prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
        handler: function (range, context) {
          // Do nothing - prevents auto-conversion
          return true;
        },
      },
    },
  },
};

export default function AboutForm() {
  const [title, setTitle] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');
  const [values, setValues] = useState('');
  const [timelineItems, setTimelineItems] = useState([]);
  const [newYear, setNewYear] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const resStatic = await fetch('/api/about');
        const dataStatic = await resStatic.json();
        if (dataStatic) {
          setTitle(dataStatic.about_description || '');
          setVision(dataStatic.vision || '');
          setMission(dataStatic.mission || '');
          setValues(dataStatic.values || '');
        }

        const resTimeline = await fetch('/api/about/timeline');
        const dataTimeline = await resTimeline.json();
        if (Array.isArray(dataTimeline)) {
          setTimelineItems(dataTimeline);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update Static Content
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      about_description: title,
      vision,
      mission,
      values,
    };

    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update');

      const data = await res.json();
      console.log('Update result:', data);

      toast.success('About page updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update About page.');
    }
  };

  // Timeline Handlers
  const handleAddTimeline = async () => {
    if (!newYear || !newDesc) {
      toast.error('Please fill in both Year and Description');
      return;
    }

    try {
      const res = await fetch('/api/about/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: newYear, description: newDesc }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setTimelineItems([json.data, ...timelineItems]); // Add to top
          setNewYear('');
          setNewDesc('');
          toast.success('Timeline added');
        }
      } else {
        toast.error('Failed to add timeline');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding timeline');
    }
  };

  const handleDeleteTimeline = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/about/timeline', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget.id }),
      });

      if (res.ok) {
        setTimelineItems(timelineItems.filter((t) => t.id !== deleteTarget.id));
        toast.success('Timeline deleted');
        setDeleteTarget(null);
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting timeline');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex flex-col items-center">
        <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
          Edit About Page
        </h1>
        <div className="mt-6 flex w-full max-w-[800px] animate-pulse flex-col gap-8">
          <div className="flex flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-3 w-48 rounded bg-gray-200" />
                <div className="h-[44px] w-full rounded-[12px] bg-gray-200" />
              </div>
            ))}
            <div className="mt-4 h-11 w-full rounded-[16px] bg-gray-200" />
          </div>
          <div className="flex flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                    <div className="h-3 w-48 rounded bg-gray-200" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
        Edit About Page
      </h1>

      <div className="mt-6 flex w-full max-w-[800px] flex-col gap-8">
        {/* SECTION 1: Static Content Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6"
        >
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              About Content
            </label>
            <span className="text-xs text-gray-400">
              Describe the group profile, including a general description, field
              of focus, laboratorium, and collaborators.
            </span>
            <ReactQuill
              theme="snow"
              value={title}
              onChange={setTitle}
              modules={QUILL_MODULES}
              className="bg-white"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Vision</label>
            <span className="text-xs text-gray-400">
              Describe the group vision.
            </span>
            <ReactQuill
              theme="snow"
              value={vision}
              onChange={setVision}
              modules={QUILL_MODULES}
              className="bg-white"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Mission</label>
            <span className="text-xs text-gray-400">
              Describe the group mission.
            </span>
            <ReactQuill
              theme="snow"
              value={mission}
              onChange={setMission}
              modules={QUILL_MODULES}
              className="bg-white"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Values</label>
            <span className="text-xs text-gray-400">
              Describe the group values.
            </span>
            <ReactQuill
              theme="snow"
              value={values}
              onChange={setValues}
              modules={QUILL_MODULES}
              className="bg-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-[16px] bg-[#2AB2C7] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Save Static Changes
          </button>
        </form>

        {/* SECTION 2: Organization Timeline */}
        <div className="flex flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-gray-900">
              Organization Timeline
            </h2>
            <p className="text-sm text-gray-500">
              Add key milestones for the organization.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Add New Item */}
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <label className="text-sm font-semibold">New Milestone</label>
              <div className="flex flex-col gap-2 md:flex-row">
                <input
                  type="text"
                  placeholder="Year / Date (e.g. 2023)"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none md:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="h-10 w-full flex-1 rounded-lg border border-gray-300 px-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTimeline}
                  className="h-10 rounded-lg bg-[#2AB2C7] px-4 text-sm font-medium whitespace-nowrap text-white hover:opacity-90"
                >
                  Add
                </button>
              </div>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-2">
              {timelineItems.length === 0 && (
                <p className="py-4 text-center text-sm text-gray-400">
                  No timeline items yet.
                </p>
              )}
              {timelineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{item.year}</span>
                    <span className="text-sm text-gray-600">
                      {item.description}
                    </span>
                  </div>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="rounded-full p-2 text-red-500 hover:bg-red-50"
                  >
                    <Image
                      src="/icon/db-u-trash.png"
                      alt="Delete"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTimeline}
        title="Delete Timeline"
        message={`Are you sure you want to delete the timeline for "${deleteTarget?.year}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
