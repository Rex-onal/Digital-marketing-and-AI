import type { SectionsData } from '@/features/curriculum/types';

export const SECTIONS_DATA: SectionsData = {
  'section-1': {
    id: 'section-1',
    number: '01',
    title: 'Section 1: Foundations of Digital Marketing',
    overview: 'Understand the big picture before diving into specific skills — the marketing funnel, the four pillars (audience, problem, channel, action), and how everything in digital marketing connects.',
    resources: [
      {
        title: 'Digital Marketing Course 2025 | Everything You Need To Know',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=jVgYgN0zcWs'
      },
      {
        title: 'Beginners Guide to Digital Marketing in 2025 (14+ Hours)',
        type: 'Video Course',
        url: 'https://m.youtube.com/watch?v=PnAKYIl5N3U'
      },
      {
        title: 'Digital Marketing with AI Full Course for Beginners (4 Hours)',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=kunkYTKFNtI'
      },
      {
        title: 'Introduction to Digital Marketing (Great Learning, Free + Certificate)',
        type: 'Certification',
        url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-digital-marketing'
      }
    ],
    quiz: {
      title: 'Quick Check: Foundations',
      instructions: 'Test your understanding of the marketing funnel and the four pillars. (5 multiple-choice questions — answer based on the videos you watched.)',
      questions: [
        {
          question: "Which stage of the marketing funnel focuses on making potential customers aware of your brand or product?",
          options: ["Consideration", "Conversion", "Awareness", "Loyalty"],
          answer: 2,
          explanation: "The Awareness stage is the top of the funnel (TOFU), where potential customers first discover your brand."
        },
        {
          question: "What are the four pillars of digital marketing as defined in this path?",
          options: ["Product, Price, Place, Promotion", "Audience, Problem, Channel, Action", "Search, Social, Email, Display", "Traffic, Leads, Sales, Reviews"],
          answer: 1,
          explanation: "The four pillars are Audience (who), Problem (what pain point), Channel (where), and Action (how they convert)."
        },
        {
          question: "If you write a blog post addressing a common customer frustration to help them research options, which funnel stage are you targeting?",
          options: ["Awareness", "Consideration", "Conversion", "Retention"],
          answer: 1,
          explanation: "Helping users research solutions to their problems targets the middle of the funnel (MOFU), which is the Consideration stage."
        },
        {
          question: "Which of the four pillars focuses on identifying the specific pain point that your product or service solves?",
          options: ["Audience", "Problem", "Channel", "Action"],
          answer: 1,
          explanation: "The Problem pillar is all about clarifying the exact customer pain point you address."
        },
        {
          question: "What is the primary goal of the 'Conversion' stage of the funnel?",
          options: ["Getting the user to buy or sign up", "Getting the user to watch a video", "Building long-term brand loyalty", "Retargeting past website visitors"],
          answer: 0,
          explanation: "Conversion focuses on turning interested leads into customers by getting them to make a purchase or sign up."
        }
      ]
    },
    exercise: {
      title: 'Apply It: Map a Funnel',
      instructions: 'Pick any business or brand. Write down 3 pieces of content you could create for it, and label which funnel stage each one targets (Awareness, Interest, Consideration, Conversion).',
      modelAnswer: `<strong>Sample Model Answer (Coffee Shop Brand):</strong><br><br>
      1. <strong>Awareness Stage Content:</strong> A short Instagram Reel showing a satisfying 15-second latte art creation with the location and hours in the description.<br>
      2. <strong>Consideration Stage Content:</strong> A blog post on the shop's website explaining the differences between light roast, medium roast, and dark roast beans, helping customers choose their preferred taste profile.<br>
      3. <strong>Conversion Stage Content:</strong> A text/email coupon sent to newsletter subscribers offering 'Buy One, Get One Free' espresso drinks valid for this weekend only.`
    }
  },
  'section-2': {
    id: 'section-2',
    number: '02',
    title: 'Social Media Management & Marketing',
    overview: 'Learn the day-to-day operational work of running social media accounts, plus the strategy behind platform culture, content pillars, and growth tactics.',
    resources: [
      {
        title: 'Social Media Marketing Full Course 2026 (Simplilearn)',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=i7MrqwbmN4Y'
      },
      {
        title: 'Social Media Marketing Full Course 2025 | Beginner to Advance Guide',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=mZm8hksRaIA'
      },
      {
        title: 'Free Social Media Management Full Course for Beginners 2025',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=S7MU6B0FRG8'
      },
      {
        title: 'eMarketing Institute - Social Media Marketing Certification',
        type: 'Certification',
        url: 'https://www.emarketinginstitute.org/free-courses/social-media-marketing-certification-course/'
      }
    ],
    quiz: {
      title: 'Quick Check: Social Media',
      instructions: 'Match content types to the platforms they perform best on (IG, TikTok, LinkedIn, Facebook, WhatsApp).',
      questions: [
        {
          question: "If your goal is to publish a long-form article analyzing B2B sales trends to attract corporate clients, which platform is most appropriate?",
          options: ["TikTok", "Instagram", "LinkedIn", "WhatsApp"],
          answer: 2,
          explanation: "LinkedIn is the premier professional platform, making it the best choice for B2B long-form content."
        },
        {
          question: "Which platform's culture is heavily centered on trending audio, quick video edits, and informal visual hooks?",
          options: ["LinkedIn", "TikTok / Reels", "Facebook", "eMarketing Institute"],
          answer: 1,
          explanation: "TikTok and Instagram Reels are built around viral trends, short vertical video hooks, and audio tracks."
        },
        {
          question: "You want to showcase high-quality, aesthetic product photos and swipeable carousels to showcase design. Where should you focus?",
          options: ["Instagram", "Twitter", "Facebook Groups", "WhatsApp"],
          answer: 0,
          explanation: "Instagram is highly visual and ideal for high-quality photography, stories, and carousel layouts."
        },
        {
          question: "Which channel is best suited for managing a local neighborhood group or target ads to a specific age demographic over 40?",
          options: ["LinkedIn", "TikTok", "Facebook", "Instagram"],
          answer: 2,
          explanation: "Facebook has the strongest groups system and is popular among demographics aged 40+."
        },
        {
          question: "If you need to send direct, high-open-rate broadcasts and offer 1-on-1 text customer support to local shoppers, which platform/tool is best?",
          options: ["LinkedIn Pages", "Instagram Feed", "WhatsApp Business", "TikTok Comments"],
          answer: 2,
          explanation: "WhatsApp Business allows for direct messaging, broadcasts, and immediate customer service with very high open rates."
        }
      ]
    },
    exercise: {
      title: 'Apply It: Build a Content Calendar',
      instructions: 'Choose a niche. Define 3-5 content pillars, then build a simple 1-week content calendar showing what gets posted, on which platform, and on which day.',
      modelAnswer: `<strong>Sample Model Answer (Fitness Coach Niche):</strong><br><br>
      <strong>Content Pillars:</strong><br>
      - Educational (Form tips, nutrition myths)<br>
      - Motivational (Client transformations, quotes)<br>
      - Interactive (Q&As, polls)<br>
      - Promotional (1-on-1 coaching program)<br><br>
      <strong>1-Week Content Calendar:</strong><br>
      - <strong>Monday:</strong> LinkedIn Post (Educational) - 'Why sitting 8 hours is killing your posture and 3 desk stretches to fix it.'<br>
      - <strong>Wednesday:</strong> Instagram Reel (Motivational) - A 30-second transformation video of a client, focusing on consistency.<br>
      - <strong>Friday:</strong> Instagram Story Poll (Interactive) - 'What is your biggest struggle with meal prep? A) Time, B) Ideas, C) Cravings.'<br>
      - <strong>Sunday:</strong> Facebook Post / WhatsApp Broadcast (Promotional) - Announcement: 'Opening 5 spots for my July coaching group. Reply FIT to apply.'`
    }
  },
  'section-3': {
    id: 'section-3',
    number: '03',
    title: 'Copywriting',
    overview: 'Learn to write words that persuade — headlines, body copy, CTAs, tone matching, and proven copywriting formulas like AIDA and PAS.',
    resources: [
      {
        title: 'FREE 10 Hour Copywriting Course For Beginners',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=NLIXLqWFCNA'
      },
      {
        title: 'Copywriting Full Course for Beginners in 7 Hours (2024)',
        type: 'Video Course',
        url: 'https://m.youtube.com/watch?v=vcQxkgHSPTc'
      },
      {
        title: 'Practical Copywriting Course for Beginners',
        type: 'Video Course',
        url: 'https://www.youtube.com/watch?v=Pum2gV7N_9A'
      },
      {
        title: 'Alison - Copywriting Courses & Diplomas',
        type: 'Certification',
        url: 'https://alison.com/courses?query=copywriting'
      }
    ],
    quiz: {
      title: 'Quick Check: Copywriting',
      instructions: 'Identify whether a sample ad uses AIDA or PAS, and spot the CTA in each example.',
      questions: [
        {
          question: "In the copywriting framework AIDA, what do the letters stand for?",
          options: ["Action, Interest, Demand, Attention", "Attention, Interest, Desire, Action", "Awareness, Intent, Decision, Acquisition", "Attraction, Interaction, Delight, Advocacy"],
          answer: 1,
          explanation: "AIDA stands for Attention (capture notice), Interest (keep reading), Desire (make them want it), and Action (CTA)."
        },
        {
          question: "In the PAS copywriting formula, what does the 'A' stand for?",
          options: ["Audience", "Action", "Agitate", "Acquire"],
          answer: 2,
          explanation: "PAS stands for Problem (define pain point), Agitate (stir up the emotional pain), and Solve (offer your solution)."
        },
        {
          question: "Analyze this ad copy: 'Struggling with slow loading speeds? It\\'s costing you search rankings and driving customers away. Switch to our SSD hosting for instant page loads.' Which formula does it use?",
          options: ["AIDA", "PAS", "Feature-Benefit", "Storytelling"],
          answer: 1,
          explanation: "It identifies a problem (slow speed), agitates it (losing search ranks and customers), and solves it (SSD hosting)."
        },
        {
          question: "Analyze this copy: 'Attention: 90% of resumes are ignored. We help you write a resume that highlights your achievements and gets interviews. Download our free template now.' Which formula?",
          options: ["AIDA", "PAS", "Feature-Benefit", "Few-Shot"],
          answer: 0,
          explanation: "It grabs Attention ('Attention...'), builds Interest/Desire ('resume that highlights achievements...'), and asks for Action ('Download our template...')."
        },
        {
          question: "Which of the following represents the Call to Action (CTA) in an ad?",
          options: ["'Are you tired of dirty carpets?'", "'Our cleaner uses 80% less water than competitors.'", "'Over 1,000 clean carpets served.'", "'Schedule your carpet cleaning online today'"],
          answer: 3,
          explanation: "The CTA is the specific action statement telling the reader exactly what to do next ('Schedule your carpet cleaning online today')."
        }
      ]
    },
    exercise: {
      title: 'Apply It: Rewrite an Ad',
      instructions: 'Find an existing ad or caption online. Rewrite it twice — once using the AIDA formula, and once using PAS — for a different niche of your choice.',
      modelAnswer: `<strong>Sample Model Answer (Niche: Productivity App):</strong><br><br>
      <strong>AIDA Version:</strong><br>
      - <strong>Attention:</strong> Stop drowning in endless to-do lists!<br>
      - <strong>Interest:</strong> Most professionals waste 2 hours a day just organizing their schedules.<br>
      - <strong>Desire:</strong> FocusApp organizes your tasks automatically using smart tagging, giving you back 10 hours a week.<br>
      - <strong>Action:</strong> Start your free 14-day trial today and master your day!<br><br>
      <strong>PAS Version:</strong><br>
      - <strong>Problem:</strong> Are you constantly feeling overwhelmed by your workload and missing key project deadlines?<br>
      - <strong>Agitate:</strong> The longer you go without a system, the more stressed you feel, leading to burnout and unhappy clients.<br>
      - <strong>Solve:</strong> FocusApp is a minimalist task manager designed to declutter your day and automate follow-ups. Try it free today.`
    }
  },
  'section-4': {
    id: 'section-4',
    number: '04',
    title: 'Content Marketing',
    overview: 'Learn to create valuable, consistent content that builds trust over time — formats, content repurposing, storytelling, and the value-first approach.',
    resources: [
      {
        title: 'Content Marketing Full Course 2025',
        type: 'Video Course',
        url: 'https://m.youtube.com/watch?v=GNStODu53Go'
      },
      {
        title: 'eMarketing Institute - Content Marketing Certification',
        type: 'Certification',
        url: 'https://www.emarketinginstitute.org/free-courses/content-marketing-certification-course/'
      }
    ],
    quiz: {
      title: 'Quick Check: Content Marketing',
      instructions: 'Identify whether sample posts are \'value-first\' or \'sales-first\', and name the content format used (carousel, reel, blog, etc.).',
      questions: [
        {
          question: "What is the defining strategy behind a 'value-first' content marketing approach?",
          options: ["Running direct retargeting ads to past buyers", "Educating, entertaining, or assisting the audience before presenting a sales pitch", "Offering discount codes on every single social media post", "Restricting access to content unless the user pays a subscription"],
          answer: 1,
          explanation: "Value-first content builds trust by solving problems or entertaining the user first, rather than pushing for an immediate transaction."
        },
        {
          question: "Classify this post: 'Here are the 3 SEO tools we used to double our website traffic in 6 months, and how you can set them up for free today.'",
          options: ["Sales-first content", "Value-first content", "Direct-response advertising", "Bypass content"],
          answer: 1,
          explanation: "This post is value-first because it teaches the audience a valuable lesson (increasing traffic with free tools) without pitch constraints."
        },
        {
          question: "Classify this post: 'Our marketing agency is accepting 3 new clients this month! Grab a slot now before prices increase next Monday.'",
          options: ["Sales-first content", "Value-first content", "Educational storytelling", "Tonal pillar content"],
          answer: 0,
          explanation: "This post focuses strictly on a transaction (getting clients, pricing, and urgency), making it sales-first."
        },
        {
          question: "Which content format is specifically optimized for swipeable, multi-slide visual guides on platforms like Instagram and LinkedIn?",
          options: ["Standard single image", "Audio shadow podcast", "Carousel", "Video short"],
          answer: 2,
          explanation: "Carousels allow readers to swipe through consecutive slides, making them highly effective for step-by-step visual tutorials."
        },
        {
          question: "What is the core benefit of 'content repurposing'?",
          options: ["It bypasses copyright laws on other websites", "It allows you to get more reach out of a single idea by adapting it to different platforms", "It automatically increases your search engine indexing speed", "It eliminates the need to identify audience pain points"],
          answer: 1,
          explanation: "Repurposing allows a single core asset (like a long video) to be broken down into blog posts, reels, and tweets, saving creative energy."
        }
      ]
    },
    exercise: {
      title: 'Apply It: Repurpose One Idea',
      instructions: 'Take one tip or idea from your niche. Turn it into 3 different formats: a short video script, a carousel outline, and a caption.',
      modelAnswer: `<strong>Sample Model Answer (Niche: Time Management - Tip: 'The 2-Minute Rule'):</strong><br><br>
      <strong>1. Short Video Script (Reel/TikTok):</strong><br>
      - <strong>Visual:</strong> Pointing at the camera, then typing rapidly.<br>
      - <strong>Audio:</strong> 'If it takes less than two minutes, do it right now. Don\\'t write it on your to-do list, don\\'t schedule it for later. Just wash that dish, reply to that email, or file that receipt. Try it today and watch your mental clutter disappear!'<br><br>
      <strong>2. Carousel Outline (5 Slides):</strong><br>
      - <strong>Slide 1 (Hook):</strong> The 2-Minute Rule (How to stop procrastinating instantly).<br>
      - <strong>Slide 2 (The Rule):</strong> If a task takes less than 120 seconds, do it immediately.<br>
      - <strong>Slide 3 (Why it works):</strong> It takes more energy to schedule, track, and stress over a tiny task than to just complete it.<br>
      - <strong>Slide 4 (Examples):</strong> Replying to an email, taking out trash, filing a folder.<br>
      - <strong>Slide 5 (CTA):</strong> What\\'s one 2-minute task you\\'re avoiding? Do it now, then comment below!<br><br>
      <strong>3. Post Caption (LinkedIn):</strong><br>
      'We waste hours managing our to-do lists. 📝<br>
      But the secret to peak productivity isn\\'t a better planner. It\\'s the 2-Minute Rule.<br>
      If a task takes under 2 minutes, do it immediately. No scheduling. No putting it off.<br>
      It builds momentum and keeps your mind clear for deep work.<br>
      What\\'s one task you can check off in 2 minutes right now?'`
    }
  },
  'section-5': {
    id: 'section-5',
    number: '05',
    title: 'AI & Prompt Engineering',
    overview: 'Learn to use AI tools effectively as a research assistant and writing partner — and master the prompt engineering principles that make AI output actually useful.',
    resources: [
      {
        title: 'Prompt Engineering Full Course 2025 | ChatGPT Prompt Engineering',
        type: 'Video Course',
        url: 'https://m.youtube.com/watch?v=5wf7DoJdpuc'
      },
      {
        title: 'ChatGPT Prompt Engineering Course (H-EDUCATE)',
        type: 'Video Course',
        url: 'https://www.classcentral.com/course/youtube-chatgpt-prompt-engineering-course-146290'
      },
      {
        title: 'Great Learning - Prompt Engineering for ChatGPT (Free, Certificate)',
        type: 'Certification',
        url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/prompt-engineering-for-chatgpt'
      }
    ],
    quiz: {
      title: 'Quick Check: Prompt Engineering',
      instructions: 'Spot what\'s wrong with a vague prompt and rewrite it using the principles learned (specificity, context, format, role-based prompting).',
      questions: [
        {
          question: "What makes the prompt 'Write an email about our product' a poor prompt?",
          options: ["It lacks target audience, context, key features, and desired tone.", "It is too long for the AI to understand.", "It uses too many technical terms.", "Emails cannot be written by AI."],
          answer: 0,
          explanation: "A good prompt needs specific details like who the email is for, what problem the product solves, what the call to action is, and the tone."
        },
        {
          question: "Which prompt represents the best application of 'role-based prompting'?",
          options: ["'Can you write a caption for me?'", "'Act as a senior social media strategist. Write a 100-word launch announcement for our newsletter targeting marketing graduates.'", "'Tell me what a copywriter does.'", "'Write a professional bio.'"],
          answer: 1,
          explanation: "Role-based prompting directs the AI to take on a specific persona ('senior social media strategist') and constraints ('100-word launch... targeting graduates')."
        },
        {
          question: "Why is 'specificity' key in prompt engineering?",
          options: ["It makes the AI run faster.", "It narrows down the possibilities, guiding the AI to generate highly relevant and customized outputs.", "It allows the AI to search the internet.", "It guarantees that the AI output is 100% free of typos."],
          answer: 1,
          explanation: "Giving the AI concrete boundaries and explicit instructions prevents generic, low-quality results."
        },
        {
          question: "What is a 'prompt chain' in marketing workflows?",
          options: ["A list of prompts shared with colleagues.", "Running a sequence of prompts where each step builds on the previous output (e.g. outline first, then expand).", "A script that runs prompts in a loop.", "A search query with multiple keywords."],
          answer: 1,
          explanation: "Prompt chaining breaks a big task into manageable steps, yielding better results than asking for everything in a single massive prompt."
        },
        {
          question: "When using AI as a writing assistant, what is the recommended final step before publishing?",
          options: ["Copy and paste it immediately to save time.", "Review, edit for brand voice, fact-check details, and refine the CTA.", "Translate the text into another language first.", "Verify that the prompt used was at least 50 words long."],
          answer: 1,
          explanation: "AI outputs are starting drafts. Humans must verify facts, check alignment with brand guidelines, and add personal flair before publishing."
        }
      ]
    },
    exercise: {
      title: 'Apply It: Build a Prompt Chain',
      instructions: 'Write a 3-step prompt chain: Step 1 - ask AI for a content calendar outline. Step 2 - ask it to expand one week. Step 3 - ask it to write captions for that week.',
      modelAnswer: `<strong>Sample Model Answer (Niche: Eco-friendly reusable water bottle):</strong><br><br>
      <strong>Step 1 (Outline Prompt):</strong><br>
      - <em>"Act as a content strategist. Create a 4-week content calendar outline for our eco-friendly reusable water bottle brand on Instagram. Identify 3 pillars: Sustainability, Product Features, and Community Challenges. Format as a table with Week, Topic, and Pillar."</em><br><br>
      <strong>Step 2 (Expansion Prompt):</strong><br>
      - <em>"Based on the outline from Week 1 (Sustainability Focus), expand the plan into 3 specific post ideas. For each post, write down the visual concept, the core message, and the target audience pain point it addresses."</em><br><br>
      <strong>Step 3 (Copywriting Prompt):</strong><br>
      - <em>"Now, act as an expert copywriter. For Post #1 (Visual: ocean plastic comparison), write an engaging Instagram caption under 150 words. Use the PAS formula, write in a casual, urgent tone, include 3 relevant hashtags, and end with a Call to Action to visit our shop."</em>`
    }
  }
};

export default SECTIONS_DATA;
