const systemPrompt = 'Reply briefly to the following question: "Yes" or "No"';

const textQuestions = [
  {
    category: "educational",
    question: "Does this text include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this text include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this text include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this text include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this text include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this text include any controversial topics contents for kids?",
  },
];

const imageQuestions = [
  {
    category: "educational",
    question: "Does this image include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this image include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this image include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this image include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this image include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this image include any controversial topics contents for kids?",
  },
];

const videoQuestions = [
  {
    category: "educational",
    question: "Does this text include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this text include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this text include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this text include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this text include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this text include any controversial topics contents for kids?",
  },
];

module.exports = {
  systemPrompt,
  textQuestions,
  imageQuestions,
  videoQuestions,
};
