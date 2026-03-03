import os
import datetime
import boto3
from fillpdf import fillpdfs
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


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
        # 🔑 WRITE TO /tmp (REQUIRED ON RENDER)
        safe_name = data["customer_name"].replace(" ", "_")
        filename = f"/tmp/{safe_name}_{datetime.date.today()}.pdf"

        # Get PDF fields
        fields = list(fillpdfs.get_form_fields(self.template_file).keys())

        # Fill PDF
        fillpdfs.write_fillable_pdf(
            self.template_file,
            filename,
            {
                fields[0]: data["number"],
                fields[1]: datetime.date.today().strftime("%Y-%m-%d"),
                fields[2]: data["customer_name"],
                fields[3]: data["amount"],
                fields[4]: data["mode_of_payment"],
                fields[5]: data["purpose"],
                fields[6]: data["bank_name"],
                fields[7]: data["amount_in_digit"],
            }
        )

        # Upload to S3
        link = self.upload_to_s3(filename, safe_name)

        # Send Email
        self.send_email(link, data["customer_name"], data["email"])

        return link

    def upload_to_s3(self, file_path, customer):
        key = f"invoices/{customer}/{os.path.basename(file_path)}"

        self.s3.upload_file(
            file_path,
            self.S3_BUCKET,
            key,
            ExtraArgs={"ContentType": "application/pdf"}
        )

        return self.s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.S3_BUCKET, "Key": key},
            ExpiresIn=604800
        )

    def send_email(self, link, name, email):
        try:
            sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
            
            message = Mail(
                from_email=os.getenv("FROM_EMAIL"),
                to_emails=email,
                subject="Your Invoice",
                plain_text_content=f"Hello {name},\n\nYour invoice:\n{link}\n\nExpires in 7 days."
            )
            
            sg.send(message)
            print(f"[v0] Email sent successfully to {email}")
        except Exception as e:
            print(f"[v0] Email send failed: {str(e)}")
