'use client';
import { useState } from 'react';
import FormField from '../_components/FormField';
import toast from 'react-hot-toast';

export default function AboutForm() {
  // State untuk 4 field
  const [title, setTitle] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');
  const [values, setValues] = useState('');

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

  return (
    <div className="mt-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
        Edit About Page
      </h1>

      {/* Card Container */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-[800px] flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6"
      >
        {/* 4 Form Fields */}
        <FormField
          label="About Content"
          description="Describe the group profile, including a general description, field of focus, laboratorium, and collaborators."
          placeholder="Add a Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          label="Vision"
          description="Describe the group’s vision."
          placeholder="Add a Description"
          value={vision}
          onChange={(e) => setVision(e.target.value)}
        />
        <FormField
          label="Mission"
          description="Describe the group’s mission."
          placeholder="Add a Description"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
        />
        <FormField
          label="Values"
          description="Describe the group’s values."
          placeholder="Add a Description"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 h-11 w-[752px] rounded-[16px] bg-[#2AB2C7] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          onClick={() => {
            handleSubmit;
          }}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
