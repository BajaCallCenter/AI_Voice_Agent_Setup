from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime
import logging, re

logger = logging.getLogger(__name__)

def sanitize_value(value):
    if value is None:
        return ""
    if isinstance(value, list):
        return ", ".join(str(item) for item in value if item)
    return str(value).strip()

def validate_data(data):
    if not isinstance(data, dict):
        raise ValueError("Form data must be a dictionary")
    
    required_sections = [
        "businessName",
        "contactName",
        "email"
    ]
    
    for field in required_sections:
        if not data.get(field):
            raise ValueError(f"Missing required field: {field}")

def generate_pdf(data, output_path):
    logger.info(f"Starting PDF generation to {output_path}")
    
    # Validate input data
    validate_data(data)
    
    # Initialize PDF document
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    elements = []
    # Get the base styles
    styles = getSampleStyleSheet()
    
    # Modify existing styles instead of adding new ones
    styles['Title'].fontSize = 16
    styles['Title'].alignment = TA_CENTER
    styles['Title'].spaceAfter = 12
    
    styles['Heading2'].fontSize = 14
    styles['Heading2'].spaceBefore = 12
    styles['Heading2'].spaceAfter = 6
    
    styles['Normal'].fontSize = 10
    styles['Normal'].spaceAfter = 6
    
    # Add title and date
    elements.append(Paragraph("AI Voice Agent Setup Configuration", styles['Title']))
    elements.append(Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y')}", styles['Normal']))
    elements.append(Spacer(1, 12))
    
    # Function to create a section in the PDF
    def add_section(title, fields):
        logger.debug(f"Adding section: {title}")
        elements.append(Paragraph(title, styles['Heading2']))
        
        # Create table for the section data
        section_data = []
        for field, value in fields.items():
            # Skip empty fields
            sanitized_value = sanitize_value(value)
            if not sanitized_value:
                continue
            
            # Wrap long text
            if len(sanitized_value) > 50:
                sanitized_value = Paragraph(sanitized_value, styles['Normal'])
            
            section_data.append([field, sanitized_value])
        
        if section_data:
            table = Table(section_data, colWidths=[200, 300])
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
                ('TEXTCOLOR', (0, 0), (0, -1), colors.black),
                ('ALIGN', (0, 0), (0, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (0, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ]))
            elements.append(table)
        else:
            elements.append(Paragraph("No data provided for this section.", styles['Normal']))
            
        elements.append(Spacer(1, 12))
        logger.debug(f"Completed section: {title}")
    
    # Add each section to the PDF
    add_section("Client Information", {
        "Business Name": data.get("businessName", ""),
        "Website": data.get("website", ""),
        "Date": data.get("date", ""),
        "Contact Name": data.get("contactName", ""),
        "Email": data.get("email", ""),
        "Phone": data.get("phone", "")
    })
    
    add_section("Call Volume & Hours", {
        "Call Volume": data.get("callVolume", ""),
        "Support Coverage": data.get("supportCoverage", ""),
        "Other Support Coverage": data.get("otherSupportCoverage", ""),
        "Seasonal Volume": data.get("seasonalVolume", "")
    })
    
    add_section("Call Types & Categories", {
        "Call Types": sanitize_value(data.get("callTypes", [])),
        "Other Call Type": data.get("otherCallType", ""),
        "Call Mix": data.get("callMix", "")
    })
    
    add_section("AI vs. Live Agent Handling", {
        "AI/Live Agent Mix": data.get("aiLiveAgentMix", ""),
        "Other AI/Live Agent Mix": data.get("otherAiLiveAgentMix", ""),
        "Live Agent Calls": sanitize_value(data.get("liveAgentCalls", [])),
        "Other Live Agent Calls": data.get("otherLiveAgentCalls", "")
    })
    
    add_section("Knowledge Requirements", {
        "System Access": data.get("systemAccess", ""),
        "Knowledge Base": data.get("knowledgeBase", ""),
        "Website FAQ": data.get("websiteFAQ", "")
    })
    
    add_section("Call Flow & Escalation", {
        "Escalation Action": data.get("escalationAction", ""),
        "Other Escalation Action": data.get("otherEscalationAction", ""),
        "Specific Teams": data.get("specificTeams", "")
    })
    
    add_section("Languages & Tone", {
        "Languages": data.get("languages", ""),
        "Other Languages": data.get("otherLanguages", ""),
        "Agent Tone": data.get("agentTone", ""),
        "Other Tone": data.get("otherTone", ""),
        "AI Voice Preference": data.get("aiVoicePreference", "")
    })
    
    add_section("Security & Compliance", {
        "Compliance Requirements": sanitize_value(data.get("compliance", []))
    })
    
    add_section("Call Systems & Tech Stack", {
        "Phone System": data.get("phoneSystem", ""),
        "Other Phone System": data.get("otherPhoneSystem", ""),
        "CRM Systems": sanitize_value(data.get("crm", [])),
        "Other CRM": data.get("otherCRM", "")
    })
    
    add_section("Timeline & Launch", {
        "Launch Timeline": data.get("launchTimeline", ""),
        "Current Provider": data.get("currentProvider", ""),
        "Switch Reason": data.get("switchReason", ""),
        "Other Switch Reason": data.get("otherSwitchReason", "")
    })
    
    add_section("Additional Notes", {
        "Additional Information": data.get("additionalNotes", "")
    })
    
    # Build the PDF
    try:
        doc.build(elements)
        logger.info("PDF generation completed successfully")
        return True
    except Exception as e:
        logger.error(f"Error building PDF: {str(e)}")
        raise