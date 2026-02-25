import os
import datetime
import boto3
import threading
from fillpdf import fillpdfs
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class InvoiceGenerator:
    def __init__(self, template_file):
        self.template_file = template_file

        self.S3_BUCKET = "clinic-invoices-bhavyas-2026"
        self.S3_REGION = os.getenv("AWS_REGION")

        self.s3 = boto3.client(
            "s3",
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=self.S3_REGION
        )

    def generate_invoice(self, data):
        fields = list(fillpdfs.get_form_fields(self.template_file).keys())
        filename = f"{data['customer_name']}_{datetime.date.today()}.pdf"

        # Fill PDF
        fillpdfs.write_fillable_pdf(self.template_file, filename, {
            fields[0]: data['number'],
            fields[1]: datetime.date.today().strftime('%Y-%m-%d'),
            fields[2]: data['customer_name'],
            fields[3]: data['amount'],
            fields[4]: data['mode_of_payment'],
            fields[5]: data['purpose'],
            fields[6]: data['bank_name'],
            fields[7]: data['amount_in_digit']
        })

        # Upload to S3
        link = self.upload_to_s3(filename, data['customer_name'])

        # 🔥 SEND EMAIL ASYNC (NON-BLOCKING)
        threading.Thread(
            target=self.send_email,
            args=(link, data['customer_name'], data['email']),
            daemon=True
        ).start()

        # ✅ RETURN IMMEDIATELY
        return link

    def upload_to_s3(self, file_path, customer):
        key = f"invoices/{customer}/{file_path}"

        self.s3.upload_file(
            file_path,
            self.S3_BUCKET,
            key,
            ExtraArgs={"ContentType": "application/pdf"}
        )

        return self.s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.S3_BUCKET, "Key": key},
            ExpiresIn=604800  # 7 days
        )

    def send_email(self, link, name, email):
        try:
            msg = MIMEMultipart()
            msg["From"] = os.getenv("EMAIL_USER")
            msg["To"] = email
            msg["Subject"] = "Your Invoice"

            msg.attach(MIMEText(
                f"Hello {name},\n\nYour invoice:\n{link}\n\nExpires in 7 days.",
                "plain"
            ))

            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(
                os.getenv("EMAIL_USER"),
                os.getenv("EMAIL_PASS")
            )
            server.send_message(msg)
            server.quit()

        except Exception as e:
            # Log but DO NOT crash API
            print("Email sending failed:", e)