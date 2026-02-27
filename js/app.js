/* ================================================================
   Cloudability Training – Application Logic
   Navigation, Section Tracking, Tabs, Accordions, Quiz Engine
   ================================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------------
     1. NAVIGATION – section switching & sidebar active state
  ---------------------------------------------------------------- */
  const NAV_ITEMS = document.querySelectorAll(".sidebar__item[data-section]");
  const SECTIONS  = document.querySelectorAll(".section[data-section]");
  const completedSections = new Set();

  function showSection(id) {
    SECTIONS.forEach(s => {
      s.classList.toggle("active", s.dataset.section === id);
    });
    NAV_ITEMS.forEach(item => {
      const active = item.dataset.section === id;
      item.classList.toggle("active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateTopbarProgress();
  }

  NAV_ITEMS.forEach(item => {
    item.addEventListener("click", () => {
      showSection(item.dataset.section);
      // close mobile sidebar
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".sidebar-overlay").classList.remove("active");
    });
  });

  // Path cards on the home / intro section
  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      showSection(el.dataset.goto);
    });
  });

  /* ----------------------------------------------------------------
     2. SECTION NAV BUTTONS (prev / next)
  ---------------------------------------------------------------- */
  document.querySelectorAll(".nav-btn[data-section]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;
      markCompleted(btn.closest(".section").dataset.section);
      showSection(target);
    });
  });

  function markCompleted(sectionId) {
    completedSections.add(sectionId);
    const item = document.querySelector(`.sidebar__item[data-section="${sectionId}"]`);
    if (item) item.classList.add("completed");
    updateTopbarProgress();
  }

  /* ----------------------------------------------------------------
     3. TOPBAR PROGRESS BAR
  ---------------------------------------------------------------- */
  const totalSections = NAV_ITEMS.length - 1; // exclude quiz from count

  function updateTopbarProgress() {
    const pct = Math.round((completedSections.size / totalSections) * 100);
    const fill  = document.querySelector(".topbar__progress-fill");
    const label = document.querySelector(".topbar__progress-label");
    if (fill)  fill.style.width = pct + "%";
    if (label) label.textContent = pct + "% complete";
  }

  /* ----------------------------------------------------------------
     4. MOBILE MENU TOGGLE
  ---------------------------------------------------------------- */
  const menuToggle   = document.querySelector(".menu-toggle");
  const sidebar      = document.querySelector(".sidebar");
  const sideOverlay  = document.querySelector(".sidebar-overlay");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      sideOverlay.classList.toggle("active");
    });
  }

  if (sideOverlay) {
    sideOverlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      sideOverlay.classList.remove("active");
    });
  }

  /* ----------------------------------------------------------------
     5. TABS
  ---------------------------------------------------------------- */
  document.querySelectorAll(".tabs").forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll(".tab-btn");
    const panels  = tabGroup.querySelectorAll(".tab-panel");

    buttons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        panels[idx] && panels[idx].classList.add("active");
      });
    });
  });

  /* ----------------------------------------------------------------
     6. ACCORDIONS
  ---------------------------------------------------------------- */
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      item.classList.toggle("open");
    });
  });

  /* ----------------------------------------------------------------
     7. QUIZ ENGINE
  ---------------------------------------------------------------- */
  const QUESTIONS = [
    // ── Section 1: Introduction ──────────────────────────────────────
    {
      category: "Introduction",
      question: "What does FinOps stand for?",
      options: [
        "Financial Operations",
        "Finance Optimization Solutions",
        "Final Operations System",
        "Fund Operations"
      ],
      answer: 0,
      explanation: "FinOps stands for <strong>Financial Operations</strong>. It is a cultural practice and discipline that helps organizations manage cloud financial management by bringing together finance, technology, and business teams."
    },
    {
      category: "Introduction",
      question: "Which company currently owns and develops Cloudability?",
      options: [
        "Amazon Web Services",
        "Apptio (an IBM company)",
        "Microsoft Azure",
        "Flexera"
      ],
      answer: 1,
      explanation: "Cloudability was originally founded as a standalone company and was acquired by <strong>Apptio</strong>, which was subsequently acquired by <strong>IBM</strong>. It is now part of the IBM Apptio portfolio of FinOps tools."
    },
    {
      category: "Introduction",
      question: "Which of the following best describes Cloudability's primary purpose?",
      options: [
        "Provisioning and deploying cloud infrastructure",
        "Managing cloud security and compliance",
        "Providing visibility and optimization of cloud spending",
        "Monitoring application performance"
      ],
      answer: 2,
      explanation: "Cloudability's primary purpose is <strong>cloud financial management</strong> — giving organizations visibility into their cloud spending, allocating costs to teams or projects, and providing optimization recommendations to reduce waste."
    },
    {
      category: "Introduction",
      question: "Which of the following cloud providers does Cloudability support for cost ingestion?",
      options: [
        "AWS only",
        "AWS and Azure only",
        "AWS, Azure, and Google Cloud",
        "Only private cloud providers"
      ],
      answer: 2,
      explanation: "Cloudability supports cost data ingestion from all three major public cloud providers: <strong>Amazon Web Services (AWS)</strong>, <strong>Microsoft Azure</strong>, and <strong>Google Cloud Platform (GCP)</strong>."
    },
    // ── Section 2: Getting Started ───────────────────────────────────
    {
      category: "Getting Started",
      question: "What is the recommended first step when setting up Cloudability for an AWS account?",
      options: [
        "Create a new IAM user with full administrator access",
        "Set up Cost and Usage Report (CUR) delivery to an S3 bucket and grant read access",
        "Enable all AWS Config rules",
        "Purchase Reserved Instances immediately"
      ],
      answer: 1,
      explanation: "The recommended first step for AWS is enabling the <strong>AWS Cost and Usage Report (CUR)</strong>, delivering it to an S3 bucket, and granting Cloudability read access to that bucket. The CUR provides the most detailed billing data available."
    },
    {
      category: "Getting Started",
      question: "What does the Cloudability 'True Cost' view represent?",
      options: [
        "The list price of cloud services before discounts",
        "Cost after applying all credits, discounts, and amortized Reserved Instances/Savings Plans",
        "The cost of only compute resources",
        "The projected future spend"
      ],
      answer: 1,
      explanation: "<strong>True Cost</strong> in Cloudability represents the actual effective cost after applying credits, Enterprise Discount Program (EDP) discounts, and amortizing Reserved Instances and Savings Plans over their commitment period. It gives the most accurate picture of what you're actually paying."
    },
    // ── Section 3: Cost Visibility & Reporting ────────────────────────
    {
      category: "Cost Visibility & Reporting",
      question: "In Cloudability, what is a 'Saved View'?",
      options: [
        "A backup copy of your cloud infrastructure",
        "A preset cost report configuration that can be reused and shared",
        "A snapshot of your EC2 instances",
        "An archived billing record"
      ],
      answer: 1,
      explanation: "A <strong>Saved View</strong> in Cloudability is a stored cost report configuration — including filters, groupings, date ranges, and chart types — that can be saved, reused, and shared with team members for consistent reporting."
    },
    {
      category: "Cost Visibility & Reporting",
      question: "Which Cloudability feature allows you to identify unexpected spikes in cloud spending?",
      options: [
        "Rightsizing Recommendations",
        "Business Mapping",
        "Anomaly Detection",
        "Reserved Instance Planner"
      ],
      answer: 2,
      explanation: "<strong>Anomaly Detection</strong> in Cloudability uses machine learning to automatically identify unusual spikes or drops in cloud spending that deviate from expected patterns, alerting teams to potential issues before they become major cost overruns."
    },
    {
      category: "Cost Visibility & Reporting",
      question: "When grouping costs in a Cloudability report, what does grouping by 'Service' show?",
      options: [
        "Cost per cloud region",
        "Cost broken down by AWS/Azure/GCP service type (e.g., EC2, S3, RDS)",
        "Cost by team or department",
        "Cost by individual resource ID"
      ],
      answer: 1,
      explanation: "Grouping by <strong>Service</strong> in Cloudability breaks down costs by the specific cloud service type — such as AWS EC2, S3, RDS, Azure Virtual Machines, etc. — allowing you to quickly see which services are driving your overall cloud bill."
    },
    // ── Section 4: Cost Allocation ────────────────────────────────────
    {
      category: "Cost Allocation & Tagging",
      question: "What is the primary purpose of tagging cloud resources?",
      options: [
        "To improve the security of resources",
        "To organize resources so costs can be allocated to specific teams, projects, or environments",
        "To enable auto-scaling of cloud services",
        "To track resource availability and uptime"
      ],
      answer: 1,
      explanation: "<strong>Resource tagging</strong> is fundamental to cloud cost allocation. By applying consistent tags (e.g., team, project, environment, cost-center), organizations can attribute cloud costs to the appropriate business units, enabling accurate showback and chargeback."
    },
    {
      category: "Cost Allocation & Tagging",
      question: "What is 'Business Mapping' in Cloudability?",
      options: [
        "A geographic map of your cloud regions",
        "A diagram of your network topology",
        "A feature that groups and allocates costs to custom business dimensions using rules",
        "An organization chart of your cloud accounts"
      ],
      answer: 2,
      explanation: "<strong>Business Mapping</strong> (also called Business Dimensions) in Cloudability allows organizations to create custom hierarchical cost views by writing rules that map cloud resources to business entities — even when tags are missing or inconsistent."
    },
    {
      category: "Cost Allocation & Tagging",
      question: "What is the difference between 'Showback' and 'Chargeback'?",
      options: [
        "Showback shows costs after the fact; Chargeback predicts future costs",
        "Showback reports costs to teams for awareness without financial transfers; Chargeback actually bills teams for their usage",
        "Showback is for cloud costs; Chargeback is for on-premises costs",
        "There is no difference between the two terms"
      ],
      answer: 1,
      explanation: "<strong>Showback</strong> provides cost visibility to teams so they can see their cloud spending, but no money actually changes hands. <strong>Chargeback</strong> goes further — it actually transfers or bills costs to the responsible team or business unit, creating financial accountability."
    },
    // ── Section 5: Rightsizing & Optimization ─────────────────────────
    {
      category: "Rightsizing & Optimization",
      question: "What does 'rightsizing' a cloud resource mean?",
      options: [
        "Moving a resource to a different geographic region",
        "Matching the size/type of a resource to its actual usage requirements to eliminate waste",
        "Increasing the size of all production resources for better performance",
        "Renaming resources to follow naming conventions"
      ],
      answer: 1,
      explanation: "<strong>Rightsizing</strong> means adjusting cloud resource configurations (size, type, tier) to match actual utilization. For example, if an EC2 instance is running at 5% CPU utilization, you might right-size it to a smaller instance type, reducing costs without impacting performance."
    },
    {
      category: "Rightsizing & Optimization",
      question: "What are Reserved Instances (RIs) in the context of cloud cost optimization?",
      options: [
        "Instances that are reserved for disaster recovery only",
        "Pre-purchased compute capacity commitments offering significant discounts vs. on-demand pricing",
        "Instances with guaranteed 100% uptime SLAs",
        "A type of auto-scaling policy"
      ],
      answer: 1,
      explanation: "<strong>Reserved Instances (RIs)</strong> are commitments to use a specific type of cloud resource for 1 or 3 years, in exchange for significant discounts (typically 30–72%) compared to on-demand pricing. Cloudability helps analyze RI coverage and provides recommendations for new purchases."
    },
    {
      category: "Rightsizing & Optimization",
      question: "AWS Savings Plans differ from Reserved Instances in that Savings Plans:",
      options: [
        "Cost more than on-demand instances",
        "Offer flexibility across instance types, sizes, and services within a committed spend level",
        "Only apply to databases",
        "Require paying the full cost upfront"
      ],
      answer: 1,
      explanation: "<strong>AWS Savings Plans</strong> offer the same or better discounts as RIs but with more flexibility — you commit to a specific dollar amount of spend per hour, and the discount applies automatically across eligible instance types, sizes, regions, and even services (Compute Savings Plans)."
    },
    // ── Section 6: Budgeting & Forecasting ────────────────────────────
    {
      category: "Budgeting & Forecasting",
      question: "When creating a budget in Cloudability, which type of budget allows you to set different spending limits for each month?",
      options: [
        "Fixed budget",
        "Seasonal / variable budget",
        "Recurring budget",
        "Alert-only budget"
      ],
      answer: 1,
      explanation: "A <strong>seasonal or variable budget</strong> allows you to define different monthly spending targets to account for known seasonal patterns (e.g., higher spending during product launch months or holiday seasons)."
    },
    {
      category: "Budgeting & Forecasting",
      question: "Cloudability's forecasting feature is primarily based on:",
      options: [
        "A simple average of the last 7 days of spending",
        "Historical spend trends and statistical modelling to project future costs",
        "The list price of provisioned resources multiplied by 30",
        "Manual user inputs only"
      ],
      answer: 1,
      explanation: "Cloudability's <strong>forecasting</strong> uses statistical models applied to historical spend data to project future costs. It analyzes trends over time to give you a statistically-informed projection of where your cloud spend is heading."
    },
    // ── Section 7: Advanced Features ──────────────────────────────────
    {
      category: "Advanced Features",
      question: "Cloudability's container cost allocation feature helps primarily with:",
      options: [
        "Managing Docker images in a registry",
        "Allocating Kubernetes cluster costs to the individual workloads or namespaces running on shared nodes",
        "Configuring container security policies",
        "Auto-scaling containerized workloads"
      ],
      answer: 1,
      explanation: "<strong>Container cost allocation</strong> in Cloudability (via the Kubernetes cost agent) distributes the cost of shared Kubernetes cluster infrastructure (compute, memory) down to individual namespaces, labels, and workloads, solving the challenge of shared resource cost attribution."
    },
    {
      category: "Advanced Features",
      question: "What is Cloudability's API primarily used for?",
      options: [
        "Provisioning cloud infrastructure programmatically",
        "Accessing Cloudability cost data and triggering actions programmatically for custom integrations",
        "Configuring security groups and firewalls",
        "Deploying containerized applications"
      ],
      answer: 1,
      explanation: "The <strong>Cloudability REST API</strong> allows teams to extract cost data, manage users, update budgets, and automate workflows programmatically — enabling custom dashboards, integrations with ticketing systems, and automated FinOps workflows."
    },
    {
      category: "Advanced Features",
      question: "Which FinOps lifecycle phase focuses on improving cloud usage efficiency after visibility has been established?",
      options: [
        "Inform",
        "Optimize",
        "Operate",
        "Provision"
      ],
      answer: 1,
      explanation: "In the <strong>FinOps Foundation's lifecycle</strong>, the three phases are Inform, Optimize, and Operate. The <strong>Optimize</strong> phase focuses on taking action to reduce waste — rightsizing, purchasing commitments, and eliminating idle resources — after visibility has been established in the Inform phase."
    },
    // ── Section 8: Best Practices ─────────────────────────────────────
    {
      category: "FinOps Best Practices",
      question: "Which of the following is a FinOps best practice for tag governance?",
      options: [
        "Allow every engineer to create their own tags without any standards",
        "Define a tagging taxonomy with required tags and enforce them via cloud policy (e.g., AWS Tag Policies, Azure Policy)",
        "Apply tags only to databases, not to compute resources",
        "Use tags only for security classification purposes"
      ],
      answer: 1,
      explanation: "A key FinOps best practice is <strong>tag governance</strong>: defining a company-wide tagging taxonomy with required tags (team, project, environment, cost-center), then enforcing those tags using cloud-native policy engines to ensure consistent and complete cost allocation data."
    },
    {
      category: "FinOps Best Practices",
      question: "In a FinOps culture, who is typically responsible for 'cloud cost optimization'?",
      options: [
        "The finance department alone",
        "Only the cloud operations team",
        "A cross-functional team including engineering, finance, and business stakeholders",
        "The CEO and executive team only"
      ],
      answer: 2,
      explanation: "FinOps is a <strong>cross-functional discipline</strong>. Effective cloud cost optimization requires collaboration between <strong>engineering</strong> (who control spending decisions), <strong>finance</strong> (who manage budgets and reporting), and <strong>business stakeholders</strong> (who drive priorities). No single team can do it alone."
    }
  ];

  let currentQ = 0;
  let score = 0;
  let answered = false;
  const userAnswers = [];

  const quizIntro    = document.getElementById("quiz-intro");
  const quizBody     = document.getElementById("quiz-body");
  const quizResults  = document.getElementById("quiz-results");

  const startBtn     = document.getElementById("start-quiz");
  const submitBtn    = document.getElementById("submit-answer");
  const nextBtn      = document.getElementById("next-question");
  const retryBtn     = document.getElementById("retry-quiz");

  const progressFill  = document.getElementById("quiz-progress-fill");
  const progressLabel = document.getElementById("quiz-progress-label");
  const questionNum   = document.getElementById("question-num");
  const questionTotal = document.getElementById("question-total");
  const categoryEl    = document.getElementById("question-category");
  const questionEl    = document.getElementById("question-text");
  const optionsEl     = document.getElementById("quiz-options");
  const feedbackEl    = document.getElementById("quiz-feedback");

  const resultScore   = document.getElementById("result-score");
  const resultTitle   = document.getElementById("result-title");
  const resultDesc    = document.getElementById("result-desc");
  const resultCorrect = document.getElementById("result-correct");
  const resultIncorrect = document.getElementById("result-incorrect");
  const resultPct     = document.getElementById("result-pct");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      quizIntro.classList.add("hidden");
      quizBody.classList.remove("hidden");
      currentQ = 0; score = 0; userAnswers.length = 0;
      if (questionTotal) questionTotal.textContent = QUESTIONS.length;
      renderQuestion();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", submitAnswer);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQ++;
      if (currentQ < QUESTIONS.length) {
        renderQuestion();
      } else {
        showResults();
      }
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      quizResults.classList.add("hidden");
      quizIntro.classList.remove("hidden");
    });
  }

  function renderQuestion() {
    answered = false;
    const q = QUESTIONS[currentQ];

    // Progress
    const pct = Math.round((currentQ / QUESTIONS.length) * 100);
    if (progressFill)  progressFill.style.width = pct + "%";
    if (progressLabel) progressLabel.textContent = `Question ${currentQ + 1} of ${QUESTIONS.length}`;
    if (questionNum)   questionNum.textContent = currentQ + 1;

    // Content
    if (categoryEl)  categoryEl.textContent = q.category;
    if (questionEl)  questionEl.textContent = q.question;

    // Options
    if (optionsEl) {
      optionsEl.innerHTML = "";
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span>${escHtml(opt)}`;
        btn.dataset.idx = idx;
        btn.addEventListener("click", () => selectOption(btn, idx));
        optionsEl.appendChild(btn);
      });
    }

    // Feedback
    if (feedbackEl) {
      feedbackEl.className = "quiz-feedback";
      feedbackEl.innerHTML = "";
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.remove("hidden"); }
    if (nextBtn)   { nextBtn.classList.add("hidden"); }
  }

  function selectOption(clickedBtn, idx) {
    if (answered) return;
    optionsEl.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
    clickedBtn.classList.add("selected");
    if (submitBtn) submitBtn.disabled = false;
  }

  function submitAnswer() {
    if (answered) return;
    const selected = optionsEl.querySelector(".quiz-option.selected");
    if (!selected) return;

    answered = true;
    const userIdx   = parseInt(selected.dataset.idx);
    const correctIdx = QUESTIONS[currentQ].answer;
    const isCorrect = userIdx === correctIdx;

    if (isCorrect) score++;
    userAnswers.push({ userIdx, correctIdx, isCorrect });

    // Style options
    optionsEl.querySelectorAll(".quiz-option").forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) btn.classList.add("correct");
      else if (idx === userIdx && !isCorrect) btn.classList.add("incorrect");
    });

    // Feedback
    if (feedbackEl) {
      feedbackEl.innerHTML = isCorrect
        ? `✅ <strong>Correct!</strong> ${QUESTIONS[currentQ].explanation}`
        : `❌ <strong>Incorrect.</strong> The correct answer is <strong>"${QUESTIONS[currentQ].options[correctIdx]}"</strong>. ${QUESTIONS[currentQ].explanation}`;
      feedbackEl.className = "quiz-feedback show " + (isCorrect ? "quiz-feedback--correct" : "quiz-feedback--incorrect");
    }

    if (submitBtn) submitBtn.classList.add("hidden");
    if (nextBtn)   nextBtn.classList.remove("hidden");
    if (nextBtn)   nextBtn.textContent = currentQ + 1 < QUESTIONS.length ? "Next Question →" : "See Results →";
  }

  function showResults() {
    quizBody.classList.add("hidden");
    quizResults.classList.remove("hidden");

    const total    = QUESTIONS.length;
    const pct      = Math.round((score / total) * 100);
    const incorrect = total - score;

    if (resultScore)    resultScore.textContent    = pct + "%";
    if (resultCorrect)  resultCorrect.textContent  = score;
    if (resultIncorrect) resultIncorrect.textContent = incorrect;
    if (resultPct)      resultPct.textContent      = pct + "%";

    let title, desc;
    if (pct >= 90)      { title = "🏆 Outstanding!";   desc = "Excellent work! You have a mastery-level understanding of Cloudability and FinOps principles."; }
    else if (pct >= 75) { title = "🥇 Great Job!";     desc = "Strong result! You have a solid understanding of Cloudability. Review the areas you missed to reach mastery."; }
    else if (pct >= 60) { title = "👍 Good Effort!";   desc = "You're on the right track! Revisit the sections where you had difficulty to strengthen your knowledge."; }
    else                { title = "📚 Keep Studying!"; desc = "Don't be discouraged — cloud financial management is complex. Re-read the training modules and try again."; }

    if (resultTitle) resultTitle.textContent = title;
    if (resultDesc)  resultDesc.textContent  = desc;
  }

  function escHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

})();
