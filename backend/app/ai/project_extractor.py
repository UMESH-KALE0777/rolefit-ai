import re
from loguru import logger


def extract_projects(resume_text: str) -> list:
    """
    Extract individual projects from resume text.
    Returns list of project dicts with title and description.
    """
    
    projects = []
    
    # Section headers that indicate projects
    PROJECT_HEADERS = [
        "projects", "personal projects", "academic projects",
        "key projects", "portfolio", "work samples",
        "project experience", "selected projects"
    ]
    
    # Find project section
    lines = resume_text.split('\n')
    in_project_section = False
    project_lines = []
    
    for line in lines:
        line_stripped = line.strip()
        line_lower = line_stripped.lower()
        
        # Check if we entered project section
        if any(header == line_lower or 
               header in line_lower 
               for header in PROJECT_HEADERS):
            in_project_section = True
            continue
        
        # Check if we left project section
        EXIT_HEADERS = [
            "experience", "education", "skills",
            "certifications", "achievements", "awards",
            "publications", "references", "languages",
            "interests", "hobbies", "volunteer"
        ]
        if in_project_section and any(
            h == line_lower or h in line_lower
            for h in EXIT_HEADERS
        ):
            in_project_section = False
            continue
        
        if in_project_section and line_stripped:
            project_lines.append(line_stripped)
    
    if not project_lines:
        logger.warning("No project section found in resume")
        return []
    
    # Parse individual projects from lines
    projects = parse_project_blocks(project_lines)
    
    logger.info(f"Extracted {len(projects)} projects")
    return projects


def parse_project_blocks(lines: list) -> list:
    """
    Parse project lines into individual project blocks.
    Each project has a title and description.
    """
    projects = []
    current_project = None
    
    # Common project title patterns
    TITLE_PATTERNS = [
        r'^[A-Z][A-Za-z\s\-\|]+(?:Python|Java|React|Django|ML|AI|Web|App|System|Platform|Tool|Bot|API)?',
        r'^\d+\.\s+(.+)',
        r'^[•\-\*]\s+(.+)',
        r'^([A-Z][^a-z]{0,3}[A-Za-z\s]+)\s*[\|\-]',
    ]
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        is_title = False
        
        # Detect if line is a project title
        # Titles are usually short (under 80 chars) and don't end with punctuation
        if (len(line) < 80 and 
            not line.endswith('.') and
            not line.startswith('http') and
            sum(1 for c in line if c.isupper()) >= 1):
            
            # Check if it looks like a title vs description
            word_count = len(line.split())
            if word_count <= 10:
                is_title = True
        
        if is_title:
            # Save previous project
            if current_project and current_project.get('description'):
                projects.append(current_project)
            
            # Start new project
            current_project = {
                'title': line.strip('•-* '),
                'description': ''
            }
        else:
            # Add to current project description
            if current_project is not None:
                current_project['description'] += ' ' + line
    
    # Add last project
    if current_project and current_project.get('description'):
        projects.append(current_project)
    
    # Fallback: if no projects parsed, treat whole section as one project
    if not projects and lines:
        projects.append({
            'title': 'Projects',
            'description': ' '.join(lines)
        })
    
    return projects[:6]  # Max 6 projects


def score_projects(
    projects: list,
    jd_text: str,
    embedder_func
) -> list:
    """
    Score each project against the job description.
    Uses the same semantic scorer as resume scoring.
    """
    
    if not projects:
        return []
    
    scored = []
    
    for project in projects:
        # Combine title and description for scoring
        project_text = f"{project['title']} {project['description']}"
        
        try:
            score = embedder_func(project_text, jd_text)
            score = round(score, 1)
            
            # Label
            if score >= 70:
                label = "Highly Relevant"
                color = "green"
            elif score >= 45:
                label = "Moderately Relevant"
                color = "yellow"
            else:
                label = "Low Relevance"
                color = "red"
            
            scored.append({
                'title': project['title'],
                'description': project['description'].strip(),
                'relevance_score': score,
                'relevance_label': label,
                'color': color
            })
            
        except Exception as e:
            logger.error(f"Error scoring project {project['title']}: {e}")
            continue
    
    # Sort by relevance score descending
    scored.sort(key=lambda x: x['relevance_score'], reverse=True)
    
    return scored