from flask import Flask, request, jsonify
from flask_cors import CORS
from invoice_generator_aws import InvoiceGenerator
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

generator = InvoiceGenerator("Newinvoice.pdf")

@app.route("/api/generate-invoice", methods=["POST"])
def generate_invoice():
    try:
        data = request.json
        link = generator.generate_invoice(data)
        return jsonify({"success": True, "link": link})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)