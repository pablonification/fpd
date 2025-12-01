'use client';
import { useState } from 'react';
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
  const [email, setEmail] = useState('michaeljordan@gmail.com');
  const [labAddress, setLabAddress] = useState(
    'Jl. Tubagus Ismail 1 Nomor 14, Coblong, Kota Bandung'
  );
  const [newLink, setNewLink] = useState('');
  const [activeLinks, setActiveLinks] = useState([
    'instagram.com',
    'facebook.com',
    'twitter.com',
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, labAddress, activeLinks });
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <h1 className="w-max-screen text-center text-[24px] leading-8 font-semibold tracking-[-0.01em]">
        Edit Contact Page
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-[600px] flex-col gap-6 rounded-[16px] border border-gray-300 bg-white p-6"
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
                {activeLinks.map((link, index) => (
                  <SortableItem
                    key={link}
                    id={link}
                    link={link}
                    onDelete={() => handleDeleteLink(index)}
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
