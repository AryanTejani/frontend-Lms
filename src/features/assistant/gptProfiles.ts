export interface ProfileData {
  description: string;
  features: { text: string }[];
  relatedCourse?: { label: string; href?: string };
}

export const GPT_PROFILES: Record<string, ProfileData> = {
  'Swing Trading Mastery': {
    description:
      'An expert GPT focused on swing trading strategies, helping you identify optimal entry and exit points over multi-day to multi-week timeframes.',
    features: [
      { text: 'Identify high-probability swing setups using technical analysis' },
      { text: 'Risk management and position sizing guidance' },
      { text: 'Multi-timeframe chart analysis for swing trades' },
      { text: 'Actionable trade plans with clear stop-loss levels' },
    ],
    relatedCourse: { label: 'Swing Trading Masterclass' },
  },
  'Trading Psychology': {
    description:
      'A specialized GPT designed to help traders manage emotions, build discipline, and develop the mental edge needed for consistent profitability.',
    features: [
      { text: 'Overcome fear and greed in trading decisions' },
      { text: 'Build a disciplined trading routine' },
      { text: 'Journaling techniques for performance review' },
      { text: 'Cognitive bias awareness and mitigation' },
    ],
    relatedCourse: { label: 'Mastering Trading Psychology' },
  },
  'Stage Analysis': {
    description:
      "A GPT trained in Stan Weinstein's Stage Analysis methodology, helping you identify the current stage of any stock and time your entries and exits accordingly.",
    features: [
      { text: 'Identify Stage 1 through Stage 4 characteristics' },
      { text: 'Volume analysis to confirm stage transitions' },
      { text: 'Moving average framework for stage identification' },
      { text: 'Sector and market-wide stage assessment' },
    ],
    relatedCourse: { label: 'Stage Analysis Course' },
  },
  'High Tight Flag': {
    description:
      'A pattern-recognition GPT specializing in the High Tight Flag setup — one of the most powerful and rare chart patterns that can lead to explosive moves.',
    features: [
      { text: 'Criteria for valid High Tight Flag patterns' },
      { text: 'Volume and price action confirmation signals' },
      { text: 'Historical examples and success rates' },
      { text: 'Entry, stop-loss, and target strategies' },
    ],
    relatedCourse: { label: 'Chart Pattern Mastery' },
  },
};

export interface MentorProfileData {
  specialty: string;
  about: string;
  achievements: string;
}

export const MENTOR_PROFILES: Record<string, MentorProfileData> = {
  "William O'Neil": {
    specialty: 'Growth Investing',
    about:
      'Pioneer of the CAN SLIM methodology, combining fundamental and technical analysis to identify high-growth stocks before they make their biggest moves.',
    achievements:
      "Winner of the U.S. Investing Championship, founder of Investor's Business Daily, and author of 'How to Make Money in Stocks' — one of the best-selling investment books of all time.",
  },
  'Stan Weinstein': {
    specialty: 'Stage Analysis',
    about:
      "Developer of the stage analysis approach to investing, providing a clear framework for identifying the four stages of a stock's lifecycle and timing entries during Stage 2 advances.",
    achievements:
      "Legendary market technician, author of 'Secrets for Profiting in Bull and Bear Markets', and editor of The Professional Tape Reader newsletter for over two decades.",
  },
  'Mark Minervini': {
    specialty: 'Momentum Trading',
    about:
      'Creator of the Specific Entry Point Analysis (SEPA) methodology, combining precise entry timing with strict risk management to achieve superperformance returns.',
    achievements:
      "Two-time U.S. Investing Championship winner with a 155% annual return, author of 'Trade Like a Stock Market Wizard', and featured in Jack Schwager's 'Stock Market Wizards'.",
  },
  'Linda Raschke': {
    specialty: 'Short-term Trading',
    about:
      'Renowned short-term trader specializing in momentum, mean-reversion, and pattern recognition strategies across futures and equities markets.',
    achievements:
      "Inducted into the CTA Hall of Fame, co-author of 'Street Smarts' with Laurence Connors, and featured in Jack Schwager's 'The New Market Wizards'.",
  },
};
