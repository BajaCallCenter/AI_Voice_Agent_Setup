from flask import Flask, request, jsonify, make_response, send_file
from flask_cors import CORS
from pdf_generator import generate_pdf
from dotenv import load_dotenv
from email.utils import formataddr
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
import os
import tempfile
import logging
import traceback
from typing import Union
from flask import Response

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_USERNAME = os.getenv('SMTP_EMAIL')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/generate-pdf', methods=['POST'])
def create_pdf() -> Union[Response, tuple[Response, int]]:
    if not request.is_json:
        error_msg = "Request content-type is not application/json"
        logger.error(error_msg)
        return jsonify({"error": error_msg}), 400
    
    try:
        form_data = request.json
        
        if not form_data:
            raise ValueError("Form data is empty")
            
        logger.info("Received form data, generating PDF...")
        
        # Create temporary file for the PDF
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temp_file:
            temp_path = temp_file.name
        
        # Generate PDF with the form data
        logger.info("Starting PDF generation...")
        generate_pdf(form_data, temp_path)
        logger.info("PDF generated successfully")
        
        # Send email with PDF attachment
        if form_data.get('sendEmail'):
            with open(temp_path, 'rb') as f:
                pdf_data = f.read()
            
            msg = MIMEMultipart()
            msg['Subject'] = 'AI Voice Agent Setup Form'
            msg['From'] = 'noreply@voicemedia.ai'
            msg['To'] = formataddr(('Ai VoiceMedia Agent', 'support@voicemedia.ai'))
            
            # Add body text
            body = f"""
Dear VoiceMedia Agent,

A new AI Voice Agent setup form has been submitted by {form_data.get('contactName')} from {form_data.get('businessName')}.

Please find the configuration details attached.

Best regards,
VoiceMedia AI Team
"""
            msg.attach(MIMEText(body, 'plain'))
            
            # Add PDF attachment
            pdf_attachment = MIMEApplication(pdf_data, _subtype='pdf')
            pdf_attachment.add_header('Content-Disposition', 'attachment', filename='ai_voice_agent_setup.pdf')
            msg.attach(pdf_attachment)
            
            # Send email
            with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as smtp:
                smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
                smtp.send_message(msg)
            
            logger.info(f"PDF sent via email to {form_data.get('email')}")
            
            response = jsonify({"message": "PDF sent successfully via email"})
        else:
            # Send the generated PDF file directly
            response = make_response(send_file(
                temp_path,
                mimetype='application/pdf',
                as_attachment=True,
                download_name='ai_voice_agent_setup.pdf'
            ))
        
        # Add headers to clean up the temp file after sending
        @response.call_on_close
        def cleanup():
            if os.path.exists(temp_path):
                os.remove(temp_path)
        
        return response
    
    except Exception as e:
        error_msg = f"Error generating PDF: {str(e)}"
        logger.error(error_msg)
        logger.error(traceback.format_exc())
        return jsonify({"error": error_msg}), 500
        logger.error(traceback.format_exc())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')