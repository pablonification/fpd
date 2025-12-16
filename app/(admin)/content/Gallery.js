import React, { useState } from 'react';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [contentType, setContentType] = useState('photo'); // 'photo' or 'video'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activityType: '',
    content: '', // URL for video or file for photo
  });

  // Sample gallery data
  const galleryItems = [
    {
      id: 1,
      title: 'Hands-on Laboratory Work Highlights',
      description:
        'Deskripsi DeskripsiDeskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi...',
      category: 'Laboratory Activities',
      date: '17 Sep 2025',
      pinned: false,
    },
    {
      id: 2,
      title: 'Research Conference Presentation',
      description:
        'Team members presenting their latest findings at the international conference...',
      category: 'Events',
      date: '15 Sep 2025',
      pinned: true,
    },
    {
      id: 3,
      title: 'Field Study Documentation',
      description:
        'Collection of photographs from the recent field study expedition...',
      category: 'Field Work',
      date: '10 Sep 2025',
      pinned: false,
    },
    {
      id: 4,
      title: 'Workshop and Training Session',
      description:
        'Interactive workshop conducted for undergraduate students on research methodology...',
      category: 'Training',
      date: '05 Sep 2025',
      pinned: false,
    },
    {
      id: 5,
      title: 'Laboratory Equipment Demonstration',
      description:
        'Introduction to new laboratory equipment and safety procedures...',
      category: 'Laboratory Activities',
      date: '01 Sep 2025',
      pinned: false,
    },
  ];

  const openModal = (type, data = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (data) {
      setFormData(data);
      setContentType(data.contentType);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', description: '', activityType: '', content: '' });
    setContentType('photo');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentTypeChange = (type) => {
    setContentType(type);
    setFormData((prev) => ({ ...prev, content: '' }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    closeModal();
  };

  return (
    <div className="inline-flex h-[944px] w-[1172px] flex-col items-start justify-start gap-4 overflow-hidden p-6">
      <div className="inline-flex w-[752px] flex-col items-start justify-start gap-4">
        <div className="justify-start self-stretch text-2xl font-semibold text-black">
          All Gallery
        </div>
        <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-2xl bg-white px-5 py-4 outline outline-1 outline-offset-[-1px] outline-zinc-300">
          <div className="relative h-5 w-5">
            <div className="absolute top-[1.67px] left-[1.67px] h-4 w-4 outline outline-[1.25px] outline-offset-[-0.63px] outline-neutral-400" />
            <div className="absolute top-[16.67px] left-[16.67px] h-[1.67px] w-[1.67px] outline outline-[1.25px] outline-offset-[-0.63px] outline-neutral-400" />
            <div className="absolute top-0 left-0 h-5 w-5 opacity-0" />
          </div>
          <input
            type="text"
            placeholder="Search here.."
            className="flex-1 bg-transparent text-base text-neutral-400 outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="flex w-[616.50px] items-center justify-start gap-4">
          <div className="inline-flex w-36 flex-col items-center justify-center gap-2 bg-white">
            <div className="inline-flex items-center justify-between self-stretch rounded-xl px-4 py-3 outline outline-1 outline-offset-[-1px] outline-zinc-300">
              <div className="justify-start text-base text-neutral-600">
                Sort by Date
              </div>
            </div>
          </div>
        </div>
        <div className="bg-Primary600 inline-flex items-center justify-start gap-3 rounded-xl px-6 py-3">
          <button
            onClick={() => openModal('add')}
            className="justify-start text-base font-medium text-white"
          >
            Add New Content
          </button>
          <div className="relative h-4 w-4">
            <div className="absolute top-[8px] left-[4px] h-0 w-2 outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
            <div className="absolute top-[4px] left-[8px] h-2 w-0 outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
            <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="inline-flex w-[600px] flex-col items-start justify-start gap-6 overflow-hidden rounded-2xl bg-white p-6 outline outline-1 outline-offset-[-1px] outline-zinc-100">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="flex flex-col items-start justify-start gap-1 self-stretch">
              <div className="justify-start self-stretch text-base text-black">
                Title
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-xl bg-white px-4 py-3 outline outline-1 outline-zinc-300">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Text placeholder"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="flex flex-col items-start justify-start gap-1 self-stretch">
              <div className="justify-start self-stretch text-base text-black">
                Description
              </div>
            </div>
            <div className="inline-flex h-28 items-start justify-start gap-2.5 self-stretch rounded-xl bg-white px-4 py-3 outline outline-1 outline-zinc-300">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Text placeholder"
                className="h-full w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="inline-flex items-center justify-start gap-6 self-stretch">
            <div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
              <div className="justify-start self-stretch text-base text-black">
                Activity Type
              </div>
              <div className="flex flex-col items-center justify-center gap-2 self-stretch bg-white">
                <div className="inline-flex items-center justify-between self-stretch rounded-xl px-4 py-3 outline outline-1 outline-offset-[-1px] outline-zinc-300">
                  <input
                    type="text"
                    name="activityType"
                    value={formData.activityType}
                    onChange={handleInputChange}
                    placeholder="Event"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-start gap-3 self-stretch">
            <button
              onClick={closeModal}
              className="flex flex-1 items-center justify-center gap-5 rounded-xl bg-white px-6 py-3 outline outline-1 outline-zinc-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-Primary600 flex flex-1 items-center justify-center gap-2.5 rounded-2xl px-6 py-3"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      <div className="flex flex-col items-center justify-center self-stretch overflow-hidden rounded-2xl bg-white px-6 py-3 outline outline-1 outline-offset-[-1px] outline-zinc-100">
        <div className="inline-flex items-center justify-between self-stretch border-b border-zinc-100 py-4">
          <div className="flex w-[548px] items-center justify-start gap-6">
            <div className="w-5 justify-start text-base text-neutral-400">
              Pin
            </div>
            <div className="w-96 justify-start text-base text-neutral-400">
              Video
            </div>
          </div>
          <div className="w-36 justify-start text-base text-neutral-400">
            Category
          </div>
          <div className="w-20 justify-start text-base text-neutral-400">
            Date
          </div>
          <div className="w-28 justify-start text-base text-neutral-400">
            Actions
          </div>
        </div>

        {/* Gallery Items */}
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center justify-between self-stretch rounded-[56px] py-3"
          >
            <div className="flex items-center justify-start gap-6">
              <div className="relative h-6 w-6">
                <div className="absolute top-[2.08px] left-[2px] h-5 w-5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-0 left-0 h-6 w-6 opacity-0" />
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="relative h-24 w-32 rounded-3xl bg-stone-300" />
                <div className="inline-flex flex-col items-start justify-start gap-2 px-2">
                  <div className="line-clamp-2 justify-center self-stretch text-base text-black">
                    {item.title}
                  </div>
                  <div className="w-80 justify-center text-sm text-neutral-500">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center text-base text-zinc-800">
              {item.category}
            </div>
            <div className="justify-center text-base text-zinc-800">
              {item.date}
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="relative h-5 w-5">
                <div className="absolute top-[1.80px] left-[3.33px] h-3.5 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-[4.21px] left-[9.91px] h-1 w-1 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-[18.33px] left-[2.50px] h-0 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-0 left-0 h-5 w-5 opacity-0" />
              </div>
              <div className="relative h-5 w-5 cursor-pointer">
                <div className="absolute top-[4.57px] left-[2.50px] h-[0.42px] w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-red-500" />
                <div className="absolute top-[1.67px] left-[7.08px] h-[2.47px] w-1.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-red-500" />
                <div className="absolute top-[7.62px] left-[4.29px] h-2.5 w-3 outline outline-[1.50px] outline-offset-[-0.75px] outline-red-500" />
                <div className="absolute top-[13.75px] left-[8.61px] h-0 w-[2.77px] outline outline-[1.50px] outline-offset-[-0.75px] outline-red-500" />
                <div className="absolute top-[10.42px] left-[7.92px] h-0 w-1 outline outline-[1.50px] outline-offset-[-0.75px] outline-red-500" />
                <div className="absolute top-0 left-0 h-5 w-5 opacity-0" />
              </div>
              <div
                className="relative h-5 w-5 cursor-pointer"
                onClick={() => openModal('edit', item)}
              >
                <div className="absolute top-[4.94px] left-[12.02px] h-2.5 w-[5.06px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-[10px] left-[2.92px] h-0 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                <div className="absolute top-[20px] left-[20px] h-5 w-5 origin-top-left -rotate-180 opacity-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="justify-start text-base text-neutral-400">
          Showing 1 to 15 of 1000 entries
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-white py-2 pr-6 pl-5 outline outline-1 outline-offset-[-1px] outline-zinc-300">
            <div className="relative h-5 w-5">
              <div className="absolute top-[4.94px] left-[2.92px] h-2.5 w-[5.06px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600" />
              <div className="absolute top-[10px] left-[3.06px] h-0 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600" />
              <div className="absolute top-[20px] left-[20px] h-5 w-5 origin-top-left -rotate-180 opacity-0" />
            </div>
            <div className="justify-start text-lg font-medium text-zinc-800">
              Previous
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-white py-2 pr-5 pl-6 outline outline-1 outline-offset-[-1px] outline-zinc-300">
            <div className="justify-start text-lg font-medium text-zinc-800">
              Next
            </div>
            <div className="relative h-5 w-5">
              <div className="absolute top-[4.94px] left-[12.02px] h-2.5 w-[5.06px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600" />
              <div className="absolute top-[10px] left-[2.92px] h-0 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600" />
              <div className="absolute top-[20px] left-[20px] h-5 w-5 origin-top-left -rotate-180 opacity-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
