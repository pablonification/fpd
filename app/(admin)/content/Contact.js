'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

// Component untuk item yang bisa di-drag
function SortableItem({ id, link, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 rounded-[8px] border border-gray-200 bg-gray-50 px-4 py-3"
    >
      <div className="flex h-6 w-6 cursor-grab items-center justify-center text-gray-400">
        ☰
      </div>
      <span className="flex-1 text-sm text-gray-700">{link}</span>
      <button
        type="button"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
      >
        <Image
          src="/icon/db-u-trash.png"
          alt="Delete"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [labAddress, setLabAddress] = useState('');
  const [newLink, setNewLink] = useState('');
  const [activeLinks, setActiveLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        if (data) {
          setEmail(data.email || '');
          setLabAddress(data.address || '');
          setActiveLinks(data.links || []);
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
        toast.error('Failed to load contact info');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddLink = () => {
    if (newLink.trim()) {
      setActiveLinks([...activeLinks, newLink.trim()]);
      setNewLink('');
    }
  };

  const handleDeleteLink = (index) => {
    setActiveLinks(activeLinks.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = activeLinks.indexOf(active.id);
      const newIndex = activeLinks.indexOf(over.id);
      setActiveLinks(arrayMove(activeLinks, oldIndex, newIndex));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          address: labAddress,
          links: activeLinks,
        }),
      });

      if (res.ok) {
        toast.success('Contact info updated!');
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update contact info');
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex flex-col items-center">
        <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
          Edit Contact Page
        </h1>
        <div className="mt-6 flex w-full max-w-[600px] animate-pulse flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6">
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-[44px] w-full rounded-[12px] bg-gray-200" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-[44px] w-full rounded-[12px] bg-gray-200" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-[44px] flex-1 rounded-[12px] bg-gray-200" />
              <div className="h-[44px] w-28 rounded-[12px] bg-gray-200" />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-[8px] border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <div className="h-6 w-6 rounded bg-gray-200" />
                  <div className="h-4 flex-1 rounded bg-gray-200" />
                  <div className="h-5 w-5 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 h-11 w-full rounded-[16px] bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
        Edit Contact Page
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full max-w-[600px] flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6"
      >
        {/* Email Field */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">Email</label>
          <div className="flex h-[44px] w-full items-center rounded-[12px] border border-gray-300 px-4 py-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>

        {/* Lab Address Field */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">Lab Address</label>
          <div className="flex h-[44px] w-full items-center rounded-[12px] border border-gray-300 px-4 py-3">
            <input
              type="text"
              value={labAddress}
              onChange={(e) => setLabAddress(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">Links</label>

          <div className="flex gap-2">
            <div className="flex h-[44px] flex-1 items-center rounded-[12px] border border-gray-300 px-4 py-3">
              <input
                type="text"
                placeholder="Add new link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="flex-1 text-sm outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddLink}
              className="flex h-[44px] items-center gap-2 rounded-[12px] border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              + Add Link
            </button>
          </div>

          {/* Active Links */}
          <div className="mt-2 flex w-full flex-col gap-2">
            <p className="text-sm font-semibold text-gray-700">Active Links</p>
            <p className="text-xs text-gray-400">
              The order of links will be visible in the website.
            </p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={activeLinks}
                strategy={verticalListSortingStrategy}
              >
                {activeLinks.map((link) => (
                  <SortableItem
                    key={link}
                    id={link}
                    link={link}
                    onDelete={() => handleDeleteLink(activeLinks.indexOf(link))}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 h-11 w-full rounded-[16px] bg-[#2AB2C7] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
