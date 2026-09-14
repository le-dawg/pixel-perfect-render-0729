export const site = {
    name: 'Dawid Golebiewski',
    email: 'inbox-agent@0xdawg.com',
    url: 'https://solutions.0xdawg.com',
    domain: '0xdawg.com',
    ogImage: '/images/dawid-golebiewski.jpg',
    // Set this when a verified booking URL is supplied. Until then, request a call by email.
    bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3f37uuBAhKOQ9I_AJ5pgKkdjFfv2zuPLrRXII9RC7fWJ9RxNEQyYO9Y32iw_tsLBTvbxBXvwwx',
};

const body = `

Subject: AI Project Bottleneck?

We need a pragmatic look at our current AI and Data initiatives. 

[ ] AI isn't delivering measurable gains
[ ] Internal projects are stalling or taking too long
[ ] We lack the bandwidth or specific know-how to execute
 
[Delete what doesn't apply or add your own!]

No need for a perfect email. Tell me about the problem - we'll figure out the next steps together!`;


// const body = `Hello!

// You've got a stuck AI or data initative?
// A hope that AI can free up your personnel for truly important work?
// A ready-to-go strategy but you need experienced lieutenants to see it through and help with development, project management, spec or hiring?


// Fantastic! Not only is solving these puzzles what I love doing, but "teaching how to fish" is the destination, every time.

// What's happening in your business? Maybe it's:
// - AI not improving KPIs (incorrect/uncoordinated use)
// - Data/ML project progress stalling (problem domain and approach mismatch)
// - Uncertainty about your data/AI/IT strategy (lack of information and experience)
// - or just that feeling that everything's taking longer than it should

// I offer two things:
// - Brownfield (existing system/process): finding order-of-magnitude improvements through careful analysis and seeing them through, with close monitoring by default
// - Greenfield (new start): planning, executing and iterating projects aimed at improving {X}, whether it's data, internal platforms, new processes, R&D, you name it

// While I have a great network of professionals, whether they come to bear depends on your exact needs.

// Here's how I work:
// 0. Are you at the right place for your problem?
// 1. Put the path to solving your problem in a box: Greenfield or Brownfield Project? Agile, Hybrid, Non-Dev? Short (<6M) or Long (6m+)?
// 2. Sign NDA + Contracts, establish the team, the cadence, the access
// 3. Before the project ends, pairing with your developers or experts to teach the tools, techniques and novel approaches used during the project
// 4. By the time the project ends, your team will have both an easier time AND the skills/internal platforms to replicate the success

// What's bothering you right now? Tell me what's slow - no detail is too small!

// [No need for a perfect email. Agents will swallow your style anyway! Just reply with whatever you know about the problem - we'll figure out the next steps together!]
// `;

export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent("Stuck AI or workflow initiative")}&body=${encodeURIComponent(body)}`;
export const callHref = site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent('Book a call — project discussion')}&body=${encodeURIComponent('Hey Dawid!\n\nI’d like to arrange a call about:\n\nA few times that work for me (with timezone):\n\nThanks!')}`;