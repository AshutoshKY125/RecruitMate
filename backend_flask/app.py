from flask import Flask, request, jsonify, render_template
import os
import pdfplumber
import pandas as pd
import google.generativeai as genai
import re
from dotenv import load_dotenv

# Load API key
load_dotenv()
genai.configure(api_key="AIzaSyBvSMzCVBOzkFsXDzlhqStStcuiBEVr2go")

app = Flask(__name__)

# Define Gemini Model
model = genai.GenerativeModel('gemini-1.5-flash')

# Common resume section headings
FIXED_HEADINGS = ["Experience", "Education", "Skills", "Projects"]

def clean_text(text):
    """Removes Markdown, extra spaces, and newlines for better UI rendering."""
    return re.sub(r"[\#\*\_]+", "", text).strip()

def extract_sections_from_pdf(uploaded_file):
    """Extracts structured sections from a resume PDF."""
    sections = {}
    current_section = None

    with pdfplumber.open(uploaded_file) as pdf:
        for page in pdf.pages:
            words = page.extract_words(extra_attrs=["size", "fontname"])
            for word in words:
                text, size = word["text"].strip(), word["size"]
                if text in FIXED_HEADINGS or size > 10:
                    current_section = text
                    sections[current_section] = []
                elif current_section:
                    sections[current_section].append(text)

    for section in sections:
        sections[section] = " ".join(sections[section])

    return sections

def get_compatibility_score(section_name, section_content, job_description):
    """Generates a compatibility score for each resume section."""
    if not section_content:
        return 0  # Missing section = 0 score

    prompt = f"""
    You are an ATS evaluating a resume section against a job description.
    Score the '{section_name}' section from 0-10 based on relevance.

    Job Description: {job_description}
    Resume {section_name} Section: {section_content}

    Return only the integer score.
    """
    
    response = model.generate_content(prompt)
    
    try:
        return min(max(int(response.text.strip()), 0), 10)
    except ValueError:
        return 0  # Default if invalid response

def get_gemini_feedback(input, resume_text, prompt):
    """Generates HR feedback or ATS percentage using Gemini API."""
    response = model.generate_content([input, resume_text, prompt])
    return clean_text(response.text)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_resume():
    """Handles PDF upload, extracts sections, evaluates, and returns ATS & HR feedback."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    resume_sections = extract_sections_from_pdf(file)
    
    # Sample Job Description
    job_description = """
    Seeking a Data Analyst with expertise in SQL, Python, and Power BI/Tableau.
    Must have experience in data visualization, statistical analysis, and handling large datasets.
    """
    
    # ATS & HR Evaluation Prompts
    ats_prompt = f"You are a highly skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality. Your task is to evaluate the provided resume against the specified job description. only, provide the percentage match between the resume and the job description."
    hr_prompt = f"Provide a professional HR evaluation of this resume against the job description.keep it to 250 words"

    # Get HR Feedback & ATS Score
    ats_score = get_gemini_feedback(ats_prompt, str(resume_sections), job_description)
    hr_feedback = get_gemini_feedback(hr_prompt, str(resume_sections), job_description)

    # Get Section Scores
    scores = {section: get_compatibility_score(section, resume_sections.get(section, ""), job_description) for section in FIXED_HEADINGS}

    return jsonify({
        "ATS_Match_Percentage": ats_score,
        "HR_Feedback": hr_feedback,
        "Section_Scores": scores
    })

if __name__ == "__main__":
    app.run(debug=True)
