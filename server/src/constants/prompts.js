export const resumeParserPrompt = (
  resumeText,
) => `You are an expert resume parser. Extract structured data from this resume text.

RESUME TEXT:
${resumeText}

Parse the resume and extract ALL information into this EXACT JSON format:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedIn": "",
    "portfolio": ""
  },
  "summary": "professional summary text if present",
  "experience": [
    {
      "company": "",
      "role": "",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty if current",
      "current": false,
      "bullets": ["bullet point 1", "bullet point 2"]
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "",
      "endDate": "",
      "gpa": ""
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1"],
    "languages": ["English"]
  },
  "projects": [],
  "certifications": []
}

Extract EVERYTHING you can find. Convert dates to YYYY-MM format. If information is missing, leave as empty string or empty array. Respond ONLY with valid JSON.`;

export const bulletWriterPrompt = (
  data,
) => `You are an expert resume writer specializing in STAR-method bullet points.

CONTEXT:
- Role: ${data.role || ""} at ${data.company || ""}
- Target position: ${data.targetRole || ""}
- Job Description Keywords: ${data.jobDescription || ""}

RAW EXPERIENCE:
${data.rawExperience || ""}

RULES:
1. Write 3-5 bullet points using STAR method (Situation, Task, Action, Result)
2. Start each bullet with a strong action verb (Led, Developed, Optimized, Architected, Spearheaded, etc.)
3. Include specific metrics and numbers (%, $, time saved, users impacted)
4. If user didn't provide numbers, create realistic placeholder metrics marked with [X]
5. Tailor language to match the target position keywords
6. Each bullet should be 1-2 lines maximum
7. Use present tense for current roles, past tense for previous roles

You MUST respond with valid JSON in this exact format:
{
  "bullets": [
    "Developed and launched a React-based dashboard serving 10,000+ daily users, reducing page load time by 40%",
    "Led migration of legacy REST APIs to GraphQL, improving data fetching efficiency by 60% across 12 microservices"
  ],
  "improvementNotes": "Brief explanation of what was improved and why"
}`;

export const summaryWriterPrompt = (
  data,
) => `You are a professional resume writer crafting a compelling professional summary.

RESUME DATA:
${JSON.stringify(data.sections || {}, null, 2)}

TARGET ROLE: ${data.targetRole || ""}
JOB DESCRIPTION: ${data.jobDescription || ""}

RULES:
1. Write a 2-4 sentence professional summary
2. Highlight years of experience, key skills, and notable achievements
3. Tailor to the target role and job description keywords
4. Use confident, professional language
5. Include at least one quantifiable achievement

You MUST respond with valid JSON:
{
  "summary": "Your professional summary text here",
  "keywords_used": ["keyword1", "keyword2"]
}`;

export const atsScorerPrompt = (
  data,
) => `You are an ATS (Applicant Tracking System) expert who scores resumes.

RESUME SECTIONS:
${JSON.stringify(data.sections || {}, null, 2)}

JOB DESCRIPTION:
${data.jobDescription || ""}

TARGET ROLE: ${data.targetRole || ""}

ALGORITHMIC PRE-ANALYSIS:
${JSON.stringify(data.algorithmicResults || {}, null, 2)}

Score the resume on these 10 categories from 0-100. Provide one specific, actionable fix for each.
Use the algorithmic pre-analysis data to inform your scores where available.

You MUST respond with valid JSON in this exact format:
{
  "overall": 0,
  "breakdown": {
    "keywordMatch": { "score": 0, "fix": "specific actionable suggestion" },
    "formatting": { "score": 0, "fix": "" },
    "sectionCompleteness": { "score": 0, "fix": "" },
    "bulletQuality": { "score": 0, "fix": "" },
    "summaryStrength": { "score": 0, "fix": "" },
    "skillCoverage": { "score": 0, "fix": "" },
    "quantification": { "score": 0, "fix": "" },
    "actionVerbs": { "score": 0, "fix": "" },
    "length": { "score": 0, "fix": "" },
    "contactInfo": { "score": 0, "fix": "" }
  },
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["Top priority suggestion 1", "Suggestion 2", "Suggestion 3"]
}`;

export const reviewerPrompt = (
  data,
) => `You are a senior career counselor reviewing a resume for a ${data.targetRole || "General"} position.

RESUME DATA:
${JSON.stringify(data.sections || {}, null, 2)}

${data.jobDescription ? `TARGET JOB DESCRIPTION:\n${data.jobDescription}` : "No specific job description provided."}

Provide a comprehensive review covering:
1. Overall impression and rating
2. Section-by-section feedback
3. Common mistakes found
4. Strengths to highlight
5. Top 3 priority improvements

You MUST respond with valid JSON:
{
  "overallRating": "strong",
  "overallFeedback": "2-3 sentence overall impression",
  "sectionFeedback": {
    "personalInfo": { "rating": "strong", "feedback": "specific feedback" },
    "summary": { "rating": "good", "feedback": "" },
    "experience": { "rating": "needs-work", "feedback": "" },
    "education": { "rating": "good", "feedback": "" },
    "skills": { "rating": "strong", "feedback": "" },
    "projects": { "rating": "good", "feedback": "" }
  },
  "mistakes": ["Common mistake 1", "Common mistake 2"],
  "strengths": ["Strength 1", "Strength 2"],
  "priorityFixes": ["Fix 1 (highest impact)", "Fix 2", "Fix 3"]
}

Valid ratings are: "strong", "good", "needs-work", "weak"`;

export const matchJobPrompt = (
  data,
) => `You are an ATS expert analyzing how well a resume matches a specific job description.

RESUME SECTIONS:
${JSON.stringify(data.sections || {}, null, 2)}

JOB DESCRIPTION:
${data.jobDescription || ""}

TARGET ROLE: ${data.targetRole || ""}

Analyze the match between resume and job description. Identify:
1. Keywords present in JD but missing from resume
2. Skills gaps
3. Experience alignment
4. Specific content changes to improve match

You MUST respond with valid JSON:
{
  "matchScore": 0,
  "matchedKeywords": ["keyword1"],
  "missingKeywords": ["keyword1"],
  "contentSuggestions": [
    {
      "section": "experience",
      "suggestion": "Add keywords X and Y to your bullet points about Z",
      "priority": "high"
    }
  ],
  "overallFeedback": "Summary of how to improve the match"
}`;

export const skillGapsPrompt = (
  data,
) => `Compare these resume skills against the job description and identify gaps.

RESUME SKILLS:
${JSON.stringify(data.skills || {}, null, 2)}

JOB DESCRIPTION:
${data.jobDescription || ""}

You MUST respond with valid JSON:
{
  "requiredSkills": ["skill1", "skill2"],
  "presentSkills": ["skill1"],
  "missingSkills": ["skill2"],
  "recommendations": [
    {
      "skill": "skill2",
      "priority": "high",
      "suggestion": "Where and how to add this skill to the resume"
    }
  ]
}`;

export const GENERATE_QUESTIONS_PROMPT = (role, resumeText, totalQuestions) => `
You are an expert technical interviewer conducting a ${role} interview.

Analyze the candidate's resume below and generate exactly ${totalQuestions - 1} interview questions.
The FIRST question "Tell me about yourself" is already added — do NOT include it.

RULES:
1. Generate a realistic interview flow like real-world interviews:
   - 1-2 behavioral questions (based on their experience, projects, and past roles from resume)
   - 1-2 technical knowledge questions (specific to the ${role} role)
   - 1 coding question (mark as code question)
2. Questions should be SHORT and CRISP (1-2 sentences maximum)
3. Reference specific skills, projects, or experience from the resume
4. Gradually increase difficulty
5. Make questions conversational — like a real interviewer would ask, not a quiz

CODING QUESTION RULES:
- For the coding question, randomly pick ONE of these formats:
  a) "write" — Ask the candidate to write a function/solution from scratch
  b) "fix" — Provide a buggy code snippet and ask them to find and fix the bug
  c) "explain" — Provide a code snippet and ask them to explain what it does and how it works
- Set the "codeType" field to "write", "fix", or "explain"
- For "fix" and "explain", include the code snippet in the "codeSnippet" field
- Specify the language based on the role

RESPONSE FORMAT:
Return ONLY a valid JSON array (no markdown, no code blocks, no extra text):
[
  {
    "text": "question text here",
    "type": "behavioral",
    "isCodeQuestion": false
  },
  {
    "text": "Write a function that reverses a linked list.",
    "type": "technical",
    "isCodeQuestion": true,
    "codeType": "write",
    "codeLanguage": "javascript"
  },
  {
    "text": "This function is supposed to filter even numbers but has a bug. Find and fix it.",
    "type": "technical",
    "isCodeQuestion": true,
    "codeType": "fix",
    "codeLanguage": "javascript",
    "codeSnippet": "function filterEvens(arr) {\\n  return arr.filter(n => n % 2 === 1);\\n}"
  },
  {
    "text": "Explain what this code does and what the output would be.",
    "type": "technical",
    "isCodeQuestion": true,
    "codeType": "explain",
    "codeLanguage": "javascript",
    "codeSnippet": "const result = [1,2,3].reduce((acc, n) => acc + n, 0);"
  }
]

CANDIDATE RESUME:
${resumeText}
`;

export const INTERVIEW_GREETING_PROMPT = (role, candidateName) => `
You are Natalie, a friendly and professional interviewer conducting a ${role} interview.

Generate a SHORT and WARM greeting for the candidate named ${candidateName}, like a real interview opening:
- Introduce yourself briefly (name and role)
- Mention the ${role} position they are interviewing for
- Make them feel comfortable: "Take your time, there are no wrong answers"
- End by saying: "Let's start with the basics — tell me about yourself."
- Keep it under 4 sentences total
- Be warm, professional, and encouraging — like a real human interviewer

Return ONLY the greeting text, no JSON, no markdown.
`;

export const FOLLOW_UP_PROMPT = (role, conversationHistory, nextQuestion) => `
You are Natalie, a friendly and conversational interviewer conducting a ${role} interview.

CONVERSATION SO FAR:
${conversationHistory}

IMPORTANT GUIDELINES:
1. ONLY acknowledge what the candidate ACTUALLY said in their previous answer (1-2 sentences max)
2. Reference their REAL response - do NOT make up what they said
3. End with a brief transition like "Let's move on to the next one." or "Here's the next question."
4. Do NOT repeat or include the next question text — it will be shown separately
5. Be warm, conversational, and CONCISE

Return ONLY your acknowledgment text, no JSON, no markdown. Do NOT include the next question.
`;

export const FEEDBACK_PROMPT = (role, conversationHistory, codeSubmissions) => `
You are an expert interview evaluator. Analyze this complete ${role} interview and provide detailed feedback.

COMPLETE INTERVIEW CONVERSATION:
${conversationHistory}

${codeSubmissions ? `CODE SUBMISSIONS:\n${codeSubmissions}` : ""}

IMPORTANT: Respond with ONLY a valid JSON object. No markdown, no code blocks, no extra text.
Address the candidate directly using "you" and "your".

Use this EXACT JSON structure:
{
  "overallScore": 75,
  "categoryScores": {
    "communicationSkills": {
      "score": 80,
      "comment": "Your communication was clear and well-structured..."
    },
    "technicalKnowledge": {
      "score": 70,
      "comment": "You demonstrated solid understanding of..."
    },
    "problemSolving": {
      "score": 75,
      "comment": "Your approach to problem-solving showed..."
    },
    "codeQuality": {
      "score": 65,
      "comment": "Your code submissions showed..."
    },
    "confidence": {
      "score": 80,
      "comment": "You appeared confident when..."
    }
  },
  "strengths": [
    "Specific strength 1 with example from their actual answers",
    "Specific strength 2 with example from their actual answers"
  ],
  "areasOfImprovement": [
    "Specific area 1 with constructive suggestion",
    "Specific area 2 with constructive suggestion"
  ],
  "finalAssessment": "A 2-3 sentence overall assessment of the candidate's performance."
}

Be specific - reference ACTUAL things they said during the interview.
Score each category between 0-100 based on their actual performance.
`;

export const EVALUATE_CODE_PROMPT = (question, code, language, codeType) => `
You are an expert code reviewer evaluating a candidate's solution during a technical interview.

QUESTION:
${question}

TASK TYPE: ${codeType || "write"} (${codeType === "fix" ? "candidate was asked to fix a bug" : codeType === "explain" ? "candidate was asked to explain the code" : "candidate was asked to write code from scratch"})

CANDIDATE'S RESPONSE (${language}):
${code}

Evaluate based on the task type:
- For "write": Check correctness, efficiency, and code quality
- For "fix": Check if the bug was correctly identified and fixed
- For "explain": Check if the explanation is accurate, clear, and covers key concepts

Respond with ONLY a valid JSON object (no markdown, no code blocks):
{
  "isCorrect": true,
  "score": 80,
  "feedback": "Brief evaluation based on the task type",
  "suggestions": "What could be improved"
}

Score between 0-100. Be constructive and specific.
`;

export const buildConversationHistory = (messages) => {
  if (!messages || messages.length === 0) return "No conversation yet.";

  // Use the last 20 messages to keep within context limits
  const recentMessages = messages.slice(-20);

  return recentMessages
    .map((msg) => {
      const role = msg.role === "interviewer" ? "Interviewer" : "Candidate";
      return `${role}: ${msg.content}`;
    })
    .join("\n\n");
};
