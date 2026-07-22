# CourseTracker Team Workflow

## Project Overview

CourseTracker is an analytics project that helps identify learning behaviors that predict course completion and student drop-offs. The project analyzes course completion records, quiz performance, and student session activity to provide actionable insights for improving learner retention.

## Python Workflow Script

The repository now includes a modular command-line workflow script at [scripts/data_workflow.py](scripts/data_workflow.py). It separates the pipeline into three concerns:

- ingest_data(filepath): Reads a CSV or JSON file and returns a Pandas DataFrame.
- process_data(df): Removes duplicates, fills missing values, and adds a derived performance label.
- output_results(df, output_path): Writes the processed data to disk and prints a success summary.

### Run the workflow

From the repository root:

```bash
python scripts/data_workflow.py
```

From the scripts directory:

```bash
python data_workflow.py
```

### Modify the workflow for a new dataset

1. Place the new input file in data/raw.
2. Update the file name in the main block if needed.
3. Adjust the processing rules inside process_data when new columns or business logic are required.
4. Re-run the script to generate an updated CSV in output/processed.csv.

---

# Branching Strategy

To maintain a clean and stable repository, our team follows a feature-branch workflow.

## Rules

- The `main` branch always contains stable, production-ready code.
- Every new feature, documentation update, or bug fix is developed in its own branch.
- Branches follow the naming convention:

```
feature/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
chore/<short-description>
```

### Examples

```
feature/course-completion-analysis
feature/student-dropoff-analysis
docs/project-documentation
fix/session-tracking-bug
```

- Feature branches are deleted after being successfully merged into `main`.

---

# Commit Message Convention

We follow the Conventional Commits specification.

## Format

```
[type]: short description
```

### Types

| Type | Purpose |
|------|---------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation updates |
| refactor | Code restructuring without changing functionality |
| chore | Maintenance tasks |
| test | Testing-related changes |

### Examples

```
feat: add student engagement analysis

docs: update project README

fix: correct quiz score calculation

chore: update project dependencies

refactor: simplify session preprocessing logic
```

Using this convention keeps the Git history readable and supports automated changelog generation.

---

# Pull Request (PR) Process

Every code change must be reviewed before merging.

## PR Checklist

- Create a Pull Request from your feature branch to `main`.
- Provide a meaningful PR title.
- Describe the purpose of the changes.
- Link related GitHub Issues using:

```
Closes #IssueNumber
```

### Example

```
Closes #2
```

### Code Review Focus

Reviewers check for:

- Correct implementation
- Readable code
- Proper documentation
- Data integrity
- No unnecessary files
- Successful testing

At least one approval is required before merging.

---

# GitHub Issue Tracking

Every task begins with a GitHub Issue.

Each issue must include:

- Clear title
- Description
- Label
- Assignee
- Acceptance criteria

Example issues for CourseTracker:

- Analyze course completion patterns
- Create student drop-off analysis
- Document course engagement dataset

Issues remain open until their related Pull Request is merged.

---

# Repository Structure

```
CourseTracker/
│
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
│
├── scripts/
│
├── output/
│
├── README.md
├── WORKFLOW.md
├── requirements.txt
├── .gitignore
└── .env.example
```

---

# Team Collaboration Guidelines

- Pull the latest changes before starting work.

```
git pull origin main
```

- Create a new feature branch.

```
git checkout -b feature/your-feature-name
```

- Commit changes frequently using Conventional Commits.

```
git add .
git commit -m "feat: add course completion analysis"
```

- Push your branch.

```
git push origin feature/your-feature-name
```

- Open a Pull Request.

- Wait for review and approval before merging.

---

# Best Practices

- Never commit the `venv/` folder.
- Never commit the `.env` file.
- Keep `requirements.txt` updated.
- Write meaningful commit messages.
- Link every Pull Request to a GitHub Issue.
- Keep the `main` branch deployable at all times.

---

# Workflow Summary

1. Create a GitHub Issue.
2. Create a feature branch.
3. Develop the feature.
4. Commit using Conventional Commits.
5. Push the branch.
6. Open a Pull Request.
7. Link the related issue.
8. Request review.
9. Merge after approval.
10. Delete the feature branch.