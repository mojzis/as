'use client';

import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_EMAIL = 'your@email.com'; // Update this with your email

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Build mailto link
    const subject = encodeURIComponent(data.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );

    // Open email client
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-sm text-gray-500 mb-4">
        Fill out the form below and it will open your email client to send a message.
      </p>

      <div>
        <label htmlFor="name" className="block text-sm mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={`w-full border px-4 py-3 focus:outline-none focus:border-black transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={`w-full border px-4 py-3 focus:outline-none focus:border-black transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm mb-2">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
          placeholder="What is this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
          })}
          className={`w-full border px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
