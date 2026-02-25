from flask import Flask, request, jsonify
from flask_cors import CORS
from invoice_generator_aws import InvoiceGenerator
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow React (Vercel) to call Flask (Render)

# Initialize invoice generator
generator = InvoiceGenerator("Newinvoice.pdf")


@app.route("/api/generate-invoice", methods=["POST"])
def generate_invoice():
    try:
        data = request.get_json()

        # Explicitly map fields (VERY IMPORTANT)
        form_data = {
            "number": data.get("number"),
            "customer_name": data.get("customer_name"),
            "amount": data.get("amount"),
            "mode_of_payment": data.get("mode_of_payment"),
            "purpose": data.get("purpose"),
            "bank_name": data.get("bank_name"),
            "amount_in_digit": data.get("amount_in_digit"),
            "email": data.get("email"),
        }

        # Validate required fields
        missing_fields = [k for k, v in form_data.items() if not v]
        if missing_fields:
            return jsonify({
                "success": False,
                "error": f"Missing fields: {', '.join(missing_fields)}"
            }), 400

        # Generate invoice
        link = generator.generate_invoice(form_data)

        return jsonify({
            "success": True,
            "link": link
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# Render uses gunicorn, but this helps local testing
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)