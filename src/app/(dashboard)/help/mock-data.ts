import { HelpArticle, HelpCategory } from './types';

export const mockArticles: HelpArticle[] = [
  {
    id: '1',
    slug: 'create-your-first-project',
    title: 'Create Your First Project',
    excerpt: 'Step-by-step guide to using the intake wizard.',
    content: `
# Create Your First Project

Last updated: Jan 8, 2026 • 5 min read

---

Getting started with Curimax is simple. This guide will walk you through creating your first project using our intake wizard.

## Step 1: Navigate to Projects
Click "Projects" in the main navigation and then click "New Project".

## Step 2: Fill in Basic Information
- **Project Name**: Give your project a descriptive name
- **Description**: Provide context about your program
- **Target Audience**: Define your intended student population

## Step 3: Upload Data
Upload your evidence files and data sources. Curimax supports:
- PDF documents
- Excel spreadsheets
- Job postings
- Labor market data

## Step 4: Review and Create
Review your information and click "Create Project" to begin the analysis.

Your project will appear in the Projects list and you can start analyzing immediately.
    `,
    category: 'Getting Started',
    views: 1200,
    rating: 4.7,
    ratingCount: 150,
    readTime: 5,
    lastUpdated: '2026-01-08',
    relatedArticleSlugs: ['understanding-demand-scores', 'interpreting-evidence-results'],
  },
  {
    id: '2',
    slug: 'understanding-demand-scores',
    title: 'Understanding Demand Scores',
    excerpt: 'How we calculate program viability.',
    content: `
# Understanding Demand Scores

Last updated: Jan 7, 2026 • 3 min read

---

Demand scores are at the heart of Curimax analysis. They represent the market viability of your program on a scale of 0-10.

## Score Ranges

- **8-10 (High)**: Strong market demand, excellent job prospects
- **7-7.9 (Good)**: Solid demand with growth potential
- **6-6.9 (Moderate)**: Adequate market, room for differentiation
- **0-5.9 (Low)**: Limited market demand, consider repositioning

## Calculation Factors

Our algorithm considers:
- Job posting volume and trends
- Salary competitiveness
- Skill alignment
- Labor market forecasts
- Geographic demand variations

## Using Your Score

Use your demand score to:
- Validate program relevance
- Benchmark against competitors
- Guide curriculum development
- Inform marketing strategies
    `,
    category: 'Getting Started',
    views: 950,
    rating: 4.5,
    ratingCount: 80,
    readTime: 3,
    lastUpdated: '2026-01-07',
  },
  {
    id: '3',
    slug: 'interpreting-evidence-results',
    title: 'Interpreting Evidence Results',
    excerpt: 'Make sense of job postings and labor data.',
    content: `
# Interpreting Evidence Results

Last updated: Jan 9, 2026 • 7 min read

---

The Evidence section provides detailed labor market insights. Learn how to interpret and act on these findings.

## Understanding the Data

Evidence results include:
- Job posting analysis
- Salary benchmarks
- Required skills
- Geographic hotspots
- Growth trends

## Key Metrics

- **Job Postings**: Number of active listings matching your program
- **Average Salary**: Mean compensation for relevant positions
- **Growth Rate**: Year-over-year job market growth percentage
- **Top Employers**: Companies actively hiring in this field

## Taking Action

1. Identify skill gaps in job postings
2. Benchmark your curriculum against requirements
3. Adjust program positioning based on trends
4. Use data to support accreditation reviews
    `,
    category: 'Getting Started',
    views: 756,
    rating: 4.6,
    ratingCount: 92,
    readTime: 7,
    lastUpdated: '2026-01-09',
  },
  {
    id: '4',
    slug: 'building-financial-models',
    title: 'Building Financial Models',
    excerpt: 'Create accurate revenue and cost projections.',
    content: `
# Building Financial Models

Last updated: Jan 6, 2026 • 10 min read

---

Financial models are crucial for business planning and accreditation. This guide covers best practices for building robust models in Curimax.

## Components of a Strong Model

- Revenue projections (enrollment-based)
- Operating expenses
- Break-even analysis
- Scenario planning
- Sensitivity analysis

## Best Practices

1. **Use Conservative Estimates**: Project realistic enrollment numbers
2. **Account for Seasonality**: Consider peak and off-peak periods
3. **Include Contingencies**: Plan for unexpected costs
4. **Document Assumptions**: Clearly state your calculation methods
5. **Review Regularly**: Update models as conditions change

## Accreditation Compliance

Ensure your models meet accreditor requirements by:
- Including all relevant cost categories
- Using transparent calculation methods
- Providing supporting documentation
- Demonstrating financial sustainability
    `,
    category: 'Getting Started',
    views: 634,
    rating: 4.8,
    ratingCount: 78,
    readTime: 10,
    lastUpdated: '2026-01-06',
  },
  {
    id: '5',
    slug: 'generating-reports',
    title: 'Generating Reports',
    excerpt: 'Export your analysis as PDF, PowerPoint, or Excel.',
    content: `
# Generating Reports

Last updated: Jan 5, 2026 • 4 min read

---

Curimax makes it easy to generate professional reports from your analysis. Learn how to create and export reports.

## Report Types

- **Summary Report**: High-level overview of findings
- **Detailed Analysis**: In-depth breakdown with charts and tables
- **Executive Brief**: Condensed version for stakeholders
- **Custom Report**: Select specific sections and data

## Export Formats

- **PDF**: Best for sharing and printing
- **PowerPoint**: Editable slides for presentations
- **Excel**: Data tables for further analysis
- **HTML**: Web-ready format

## Creating a Report

1. Open your project
2. Click "Generate Report"
3. Select report type and sections
4. Choose export format
5. Customize branding (if applicable)
6. Download or share

Reports can be scheduled to generate automatically on a recurring basis.
    `,
    category: 'Getting Started',
    views: 512,
    rating: 4.7,
    ratingCount: 68,
    readTime: 4,
    lastUpdated: '2026-01-05',
  },
  {
    id: '6',
    slug: 'how-to-improve-your-demand-score',
    title: 'How to Improve Your Demand Score',
    excerpt: 'Learn strategies to increase program viability.',
    content: `
# How to Improve Your Demand Score

Last updated: Jan 6, 2026 • 8 min read • ⭐ 4.8/5 (47 ratings)

---

Improving your demand score is crucial for ensuring your program's success. Here are some proven strategies.

## Strategy 1: Align with Job Market Trends
- Analyze current job postings in your field
- Update curriculum to match required skills
- Monitor emerging technologies and methodologies

## Strategy 2: Increase Differentiation
- Identify gaps in competitor offerings
- Develop unique value propositions
- Create specialized tracks or certifications

## Strategy 3: Enhance Career Outcomes
- Track graduate employment rates
- Collect salary data from alumni
- Develop partnerships with employers
- Create internship and placement programs

## Strategy 4: Optimize Geographic Focus
- Identify high-demand regions
- Consider online delivery options
- Build partnerships with local employers

## Strategy 5: Build Industry Partnerships
- Engage employers in curriculum development
- Create advisory boards
- Develop co-op and internship programs
    `,
    category: 'Projects & Analysis',
    views: 847,
    rating: 4.8,
    ratingCount: 47,
    readTime: 8,
    lastUpdated: '2026-01-06',
    relatedArticleSlugs: ['competitive-analysis-best-practices', 'interpreting-evidence-results'],
  },
  {
    id: '7',
    slug: 'competitive-analysis-best-practices',
    title: 'Competitive Analysis Best Practices',
    excerpt: 'Identify gaps and differentiate your program.',
    content: `
# Competitive Analysis Best Practices

Last updated: Jan 5, 2026 • 12 min read • ⭐ 4.6/5 (35 ratings)

---

Effective competitive analysis helps you position your program for success.

## Step 1: Identify Competitors
- Direct competitors (same program type)
- Indirect competitors (alternative learning paths)
- Online and international programs

## Step 2: Gather Information
- Curriculum analysis
- Pricing comparison
- Student outcomes
- Employer feedback
- Market positioning

## Step 3: Analyze Gaps
- Identify underserved market segments
- Find curriculum gaps
- Assess pricing strategies
- Evaluate delivery methods

## Step 4: Create Your Competitive Advantage
- Develop unique offerings
- Emphasize strengths
- Address market gaps
- Build partnerships

## Best Practices
- Update analysis quarterly
- Track competitor changes
- Use data to inform decisions
- Involve faculty in analysis
- Document findings for accreditation
    `,
    category: 'Best Practices',
    views: 623,
    rating: 4.6,
    ratingCount: 35,
    readTime: 12,
    lastUpdated: '2026-01-05',
  },
  {
    id: '8',
    slug: 'financial-modeling-for-accreditation',
    title: 'Financial Modeling for Accreditation',
    excerpt: 'Create models that meet accreditor requirements.',
    content: `
# Financial Modeling for Accreditation

Last updated: Jan 4, 2026 • 15 min read • ⭐ 4.9/5 (52 ratings)

---

Accreditors require evidence of financial sustainability. Learn how to build models that meet their standards.

## Accreditor Requirements

### ACBSP Standards
- 2-year financial projections
- Break-even analysis
- Cash flow planning
- Contingency planning

### AACSB Standards
- 5-year strategic financial plan
- Sustainability assessment
- Resource allocation rationale

### HLC Standards
- Financial sustainability plan
- Resource management documentation

## Model Components

1. **Revenue Projections**
   - Enrollment forecasts
   - Tuition and fees
   - Other revenue sources

2. **Expense Categories**
   - Personnel costs
   - Instructional materials
   - Technology and infrastructure
   - Marketing and recruitment

3. **Analysis**
   - Break-even point
   - Profit margins
   - Cash flow timing
   - Sensitivity analysis

## Curimax Features for Accreditation
- Pre-built accreditor-specific templates
- Compliance checking
- Documentation export
- Version control for audits
    `,
    category: 'Best Practices',
    views: 412,
    rating: 4.9,
    ratingCount: 52,
    readTime: 15,
    lastUpdated: '2026-01-04',
  },
];

export const mockCategories: HelpCategory[] = [
    { id: '1', name: 'Projects & Analysis', icon: '📊', articleCount: 12 },
    { id: '2', name: 'Billing & Subscriptions', icon: '💰', articleCount: 8 },
    { id: '3', name: 'Collaboration & Sharing', icon: '👥', articleCount: 6 },
    { id: '4', name: 'Reports & Exports', icon: '📄', articleCount: 9 },
    { id: '5', name: 'Account Settings', icon: '⚙️', articleCount: 7 },
    { id: '6', name: 'Security & Privacy', icon: '🔐', articleCount: 5 },
    { id: '7', name: 'Integrations & API', icon: '🔗', articleCount: 4 },
    { id: '8', name: 'Best Practices', icon: '🎓', articleCount: 15 },
];

export const gettingStartedArticles = [
  {
    id: '1',
    slug: 'create-your-first-project',
    title: 'Create Your First Project',
    excerpt: 'Step-by-step guide to using the intake wizard.',
    readTime: 5,
  },
  {
    id: '2',
    slug: 'understanding-demand-scores',
    title: 'Understanding Demand Scores',
    excerpt: 'How we calculate program viability.',
    readTime: 3,
  },
  {
    id: '3',
    slug: 'interpreting-evidence-results',
    title: 'Interpreting Evidence Results',
    excerpt: 'Make sense of job postings and labor data.',
    readTime: 7,
  },
  {
    id: '4',
    slug: 'building-financial-models',
    title: 'Building Financial Models',
    excerpt: 'Create accurate revenue and cost projections.',
    readTime: 10,
  },
  {
    id: '5',
    slug: 'generating-reports',
    title: 'Generating Reports',
    excerpt: 'Export your analysis as PDF, PowerPoint, or Excel.',
    readTime: 4,
  },
];