import { OnboardingStep, ProductTip } from "./types";

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to Curimax",
    description: "Let's get you started with a quick tour",
    content: `Welcome to Curimax v3-DYN! 👋

We're excited to have you on board. This 2-minute tour will guide you through the key features of our platform.

By the end, you'll understand how to:
• Create and analyze educational programs
• Leverage AI-powered market research
• Build financial models
• Generate professional reports`,
    buttons: {
      skip: true,
      next: true,
    },
  },
  {
    id: 2,
    title: "Create Your First Project",
    description: "Use our guided wizard to define your program",
    content: `Creating a project is easy with our guided intake wizard.

You'll provide:
• **Program name and level** - What are you analyzing?
• **Target regions and industries** - Where is your market?
• **Duration and format preferences** - How is it delivered?

Once you submit, we'll immediately start analyzing your program using AI-powered evidence gathering. This typically takes 10-15 minutes.`,
    buttons: {
      back: true,
      next: true,
    },
    actionLabel: "Start Creating",
  },
  {
    id: 3,
    title: "AI-Powered Evidence Gathering",
    description: "We analyze thousands of job postings and labor data",
    content: `Our AI engine analyzes over 10 million job postings and labor market data in real-time.

Results in 10-15 minutes:
✓ **Demand Score (0-10)** - Overall market viability
✓ **Job Market Analysis** - Current and projected opportunities
✓ **Salary Data and Trends** - Competitive compensation insights
✓ **Skills Gap Identification** - What employers are looking for

Your analysis becomes the foundation for all other reports and modeling.`,
    buttons: {
      back: true,
      next: true,
    },
  },
  {
    id: 4,
    title: "Build Financial Models",
    description: "Project revenue, costs, and ROI for 3-year planning",
    content: `Our interactive financial calculator helps you build realistic financial projections.

Includes:
• **Enrollment Projections** - Conservative, moderate, and optimistic scenarios
• **Break-Even Analysis** - When will your program become profitable?
• **Multiple Scenario Planning** - Compare different strategies
• **Excel Export** - Take your models deeper with detailed spreadsheets

All calculations are designed to meet accreditor requirements and can be easily updated as conditions change.`,
    buttons: {
      back: true,
      next: true,
    },
  },
  {
    id: 5,
    title: "Professional Reports",
    description: "Generate McKinsey-quality reports for stakeholders",
    content: `Create polished, professional reports that impress stakeholders and accreditors.

Available formats:
📄 **PDF** - Comprehensive 20-30 page analysis with charts and citations
📊 **PowerPoint** - Executive presentation deck ready for board meetings
📈 **Excel** - Financial model workbook for detailed analysis

All reports include:
• Data visualizations and trend analysis
• Competitive benchmarking
• Financial projections
• Sources and citations
• Ready for accreditation submissions`,
    buttons: {
      back: true,
      action: true,
    },
    actionLabel: "Start Using Curimax!",
  },
];

export const productTips: ProductTip[] = [
  {
    id: 1,
    title: "Create a New Project",
    description: "Click here to start analyzing a new educational program",
    targetElement: "[data-tour='new-project']",
    position: "right",
  },
  {
    id: 2,
    title: "Dashboard Metrics",
    description: "Keep track of your projects, demand scores, and recent activity",
    targetElement: "[data-tour='dashboard-metrics']",
    position: "bottom",
  },
  {
    id: 3,
    title: "Project Pipeline",
    description: "Visualize your projects at different stages of completion",
    targetElement: "[data-tour='project-pipeline']",
    position: "bottom",
  },
  {
    id: 4,
    title: "Recent Activity",
    description: "Stay updated with changes to your projects and team activity",
    targetElement: "[data-tour='recent-activity']",
    position: "left",
  },
  {
    id: 5,
    title: "Template Library",
    description: "Use pre-built templates to quickly start new analyses",
    targetElement: "[data-tour='templates']",
    position: "bottom",
  },
  {
    id: 6,
    title: "Help Center",
    description: "Access guides, FAQs, and live chat support anytime",
    targetElement: "[data-tour='help-center']",
    position: "left",
  },
  {
    id: 7,
    title: "Notifications",
    description: "Get alerts about analysis completion and important updates",
    targetElement: "[data-tour='notifications']",
    position: "left",
  },
  {
    id: 8,
    title: "Account Menu",
    description: "Manage your profile, settings, and subscription",
    targetElement: "[data-tour='user-menu']",
    position: "left",
  },
];
