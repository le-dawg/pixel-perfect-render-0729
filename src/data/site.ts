export const site = {
  name: 'Dawid Golebiewski',
  email: 'inbox-agent@0xdawg.com',
  url: 'https://0xdawg.com',
  domain: '0xdawg.com',
  ogImage: '/images/dawid-golebiewski.jpg',
  // Set this when a verified booking URL is supplied. Until then, request a call by email.
  bookingUrl: '',
};

const body = `Hey Dawid!

I want to discuss a stuck AI, data, or workflow initiative.

What is blocked right now:
What the team cannot currently trust or validate:
What a useful first delivery track would look like:

My team / organization:
Time pressure or business context:

Rough notes are enough. No polished brief needed.`;

export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent("Stuck AI or workflow initiative")}&body=${encodeURIComponent(body)}`;
export const callHref = site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent('Book a call — project discussion')}&body=${encodeURIComponent('Hey Dawid!\n\nI’d like to arrange a call about:\n\nA few times that work for me (with timezone):\n\nThanks!')}`;
